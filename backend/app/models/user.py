"""
User, Role & Authentication models.

Roles: admin, doctor, nurse, lab, front_desk, pharmacist, patient, emergency
Each user belongs to one module (hospital / pharmacy / patient) determined by role.
"""

import enum
import uuid
from datetime import datetime, timezone

from sqlalchemy import (
    Boolean,
    DateTime,
    Enum,
    ForeignKey,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    DOCTOR = "doctor"
    NURSE = "nurse"
    LAB = "lab"
    FRONT_DESK = "front_desk"
    PHARMACIST = "pharmacist"
    PATIENT = "patient"
    EMERGENCY = "emergency"


# Which module each role belongs to
ROLE_MODULE_MAP = {
    UserRole.ADMIN: "hospital",
    UserRole.DOCTOR: "hospital",
    UserRole.NURSE: "hospital",
    UserRole.LAB: "hospital",
    UserRole.FRONT_DESK: "hospital",
    UserRole.PHARMACIST: "pharmacy",
    UserRole.PATIENT: "patient",
    UserRole.EMERGENCY: "hospital",
}


class User(Base):
    """Core user account — shared across all three modules."""

    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    phone: Mapped[str | None] = mapped_column(String(20), index=True, nullable=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    full_name: Mapped[str] = mapped_column(String(255))
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    hospital_staff = relationship("HospitalStaff", back_populates="user", uselist=False)
    patient_profile = relationship("PatientProfile", back_populates="user", uselist=False)
    pharmacy_staff = relationship("PharmacyStaff", back_populates="user", uselist=False)
    audit_logs = relationship("AuditLog", back_populates="user")

    @property
    def module(self) -> str:
        return ROLE_MODULE_MAP.get(self.role, "unknown")


class RefreshToken(Base):
    """Stored refresh tokens for revocation support."""

    __tablename__ = "refresh_tokens"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    token_hash: Mapped[str] = mapped_column(String(255), unique=True)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    is_revoked: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class AuditLog(Base):
    """
    Immutable audit trail — every read/write of patient data is logged.
    Privacy: DPDP Act alignment, consent tracking.
    """

    __tablename__ = "audit_logs"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    action: Mapped[str] = mapped_column(String(50))  # e.g. "read", "create", "approve"
    resource_type: Mapped[str] = mapped_column(String(100))  # e.g. "patient_record"
    resource_id: Mapped[str | None] = mapped_column(String(255), nullable=True)
    details: Mapped[str | None] = mapped_column(Text, nullable=True)  # JSON details
    ip_address: Mapped[str | None] = mapped_column(String(45), nullable=True)
    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True
    )

    user = relationship("User", back_populates="audit_logs")
