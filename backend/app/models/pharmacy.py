"""
Pharmacy module models.

Covers: Pharmacy profile, Inventory, Expiry tracking, Reorder, Incoming stock,
Dispensing, Partial fulfillment, Availability notifications.
"""

import enum
import uuid
from datetime import date, datetime, timezone
from decimal import Decimal

from sqlalchemy import (
    Boolean,
    Date,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class ReorderStatus(str, enum.Enum):
    NOT_ORDERED = "not_ordered"
    ORDER_PLACED = "order_placed"
    PROCESSING = "processing"
    IN_TRANSIT = "in_transit"
    RECEIVED = "received"


class AvailabilityNotifStatus(str, enum.Enum):
    NOTIFIED = "notified"
    ACCEPTED = "accepted"
    COLLECTED = "collected"
    EXPIRED = "expired"


# ─── Pharmacy ────────────────────────────────────────────────────────────────


class Pharmacy(Base):
    __tablename__ = "pharmacies"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255))
    address: Mapped[str] = mapped_column(Text)
    city: Mapped[str] = mapped_column(String(100))
    state: Mapped[str] = mapped_column(String(100))
    pincode: Mapped[str] = mapped_column(String(10))
    phone: Mapped[str] = mapped_column(String(20))
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    operating_hours: Mapped[str | None] = mapped_column(String(255), nullable=True)
    license_number: Mapped[str | None] = mapped_column(String(100), nullable=True)
    verification_documents: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    average_rating: Mapped[float | None] = mapped_column(Float, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    staff = relationship("PharmacyStaff", back_populates="pharmacy")
    inventory = relationship("InventoryItem", back_populates="pharmacy")
    reorders = relationship("Reorder", back_populates="pharmacy")
    reviews = relationship("PharmacyReview", back_populates="pharmacy")
    dispensing_records = relationship("DispensingRecord", back_populates="pharmacy")


class PharmacyStaff(Base):
    __tablename__ = "pharmacy_staff"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True
    )
    pharmacy_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("pharmacies.id", ondelete="CASCADE")
    )

    user = relationship("User", back_populates="pharmacy_staff")
    pharmacy = relationship("Pharmacy", back_populates="staff")


class PharmacyReview(Base):
    __tablename__ = "pharmacy_reviews"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pharmacy_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("pharmacies.id", ondelete="CASCADE"), index=True
    )
    patient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="CASCADE")
    )
    rating: Mapped[int] = mapped_column(Integer)  # 1-5
    review_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    pharmacy = relationship("Pharmacy", back_populates="reviews")


# ─── Inventory ───────────────────────────────────────────────────────────────


class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pharmacy_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("pharmacies.id", ondelete="CASCADE"), index=True
    )
    medicine_name: Mapped[str] = mapped_column(String(255), index=True)
    batch_number: Mapped[str | None] = mapped_column(String(100), nullable=True)
    expiry_date: Mapped[date | None] = mapped_column(Date, nullable=True, index=True)
    supplier: Mapped[str | None] = mapped_column(String(255), nullable=True)
    quantity: Mapped[int] = mapped_column(Integer, default=0)
    unit_price: Mapped[Decimal | None] = mapped_column(Numeric(10, 2), nullable=True)
    selling_price: Mapped[Decimal | None] = mapped_column(Numeric(10, 2), nullable=True)
    category: Mapped[str | None] = mapped_column(String(100), nullable=True)
    is_expired: Mapped[bool] = mapped_column(Boolean, default=False)
    low_stock_threshold: Mapped[int] = mapped_column(Integer, default=10)
    monthly_requirement: Mapped[int | None] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    pharmacy = relationship("Pharmacy", back_populates="inventory")

    @property
    def is_low_stock(self) -> bool:
        return self.quantity <= self.low_stock_threshold

    @property
    def is_out_of_stock(self) -> bool:
        return self.quantity <= 0

    @property
    def sufficiency_days(self) -> int | None:
        if self.monthly_requirement and self.monthly_requirement > 0:
            return int((self.quantity / self.monthly_requirement) * 30)
        return None


# ─── Reorder & Incoming Stock ────────────────────────────────────────────────


class Reorder(Base):
    __tablename__ = "reorders"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pharmacy_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("pharmacies.id", ondelete="CASCADE"), index=True
    )
    medicine_name: Mapped[str] = mapped_column(String(255))
    quantity_ordered: Mapped[int] = mapped_column(Integer)
    supplier: Mapped[str | None] = mapped_column(String(255), nullable=True)
    status: Mapped[ReorderStatus] = mapped_column(
        Enum(ReorderStatus), default=ReorderStatus.NOT_ORDERED
    )
    expected_arrival: Mapped[date | None] = mapped_column(Date, nullable=True)
    received_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    linked_inventory_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("inventory_items.id", ondelete="SET NULL"), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    pharmacy = relationship("Pharmacy", back_populates="reorders")


# ─── Dispensing ──────────────────────────────────────────────────────────────


class DispensingRecord(Base):
    """Records each dispensing event, including partial fulfillment."""

    __tablename__ = "dispensing_records"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pharmacy_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("pharmacies.id", ondelete="CASCADE"), index=True
    )
    prescription_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("prescriptions.id", ondelete="CASCADE"), index=True
    )
    prescription_item_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("prescription_items.id", ondelete="CASCADE")
    )
    quantity_dispensed: Mapped[int] = mapped_column(Integer)
    quantity_pending: Mapped[int] = mapped_column(Integer, default=0)
    batch_number: Mapped[str | None] = mapped_column(String(100), nullable=True)
    dispensed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    dispensed_by: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )

    pharmacy = relationship("Pharmacy", back_populates="dispensing_records")


# ─── Availability Notification ───────────────────────────────────────────────


class AvailabilityNotification(Base):
    """
    Normal push/in-app notification when a previously-unavailable medicine
    becomes available (NOT a voice call — per spec).
    """

    __tablename__ = "availability_notifications"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="CASCADE"), index=True
    )
    pharmacy_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("pharmacies.id", ondelete="CASCADE")
    )
    medicine_name: Mapped[str] = mapped_column(String(255))
    quantity_available: Mapped[int] = mapped_column(Integer)
    status: Mapped[AvailabilityNotifStatus] = mapped_column(
        Enum(AvailabilityNotifStatus), default=AvailabilityNotifStatus.NOTIFIED
    )
    notified_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    collected_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
