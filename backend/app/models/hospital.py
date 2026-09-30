"""
Hospital & Clinical models.

Covers: Hospital, HospitalStaff, Patient Profile, Visits, Prescriptions,
Lab Management, Appointments, Documents, and the append-only Ledger.
"""

import enum
import hashlib
import json
import uuid
from datetime import date, datetime, timezone
from decimal import Decimal
from typing import Any, Dict, List, Optional

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Date,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


# ─── Enums ───────────────────────────────────────────────────────────────────


class VisitType(str, enum.Enum):
    CONSULTATION = "consultation"
    FOLLOW_UP = "follow_up"
    EMERGENCY = "emergency"
    PROCEDURE = "procedure"
    WELLNESS_CHECK = "wellness_check"
    TELECONSULTATION = "teleconsultation"


class VisitStatus(str, enum.Enum):
    SCHEDULED = "scheduled"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"


class FieldStatus(str, enum.Enum):
    """Status of an AI-extracted field — non-negotiable rule #2."""
    AI_EXTRACTED = "ai_extracted"
    NEEDS_VERIFICATION = "needs_verification"
    ILLEGIBLE = "illegible"
    CLINICIAN_CONFIRMED = "clinician_confirmed"


class DocumentType(str, enum.Enum):
    PRESCRIPTION = "prescription"
    OPD_CARD = "opd_card"
    CASE_SHEET = "case_sheet"
    DISCHARGE_SUMMARY = "discharge_summary"
    LAB_REPORT = "lab_report"
    INVESTIGATION = "investigation"
    OTHER = "other"


class AppointmentStatus(str, enum.Enum):
    SCHEDULED = "scheduled"
    CONFIRMED = "confirmed"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"
    EMERGENCY = "emergency"


class SampleStatus(str, enum.Enum):
    COLLECTED = "collected"
    TO_SEND = "to_send"
    SENT = "sent"
    REPORT_RECEIVED = "report_received"
    REPORT_PENDING = "report_pending"


class PrescriptionStatus(str, enum.Enum):
    DRAFT = "draft"
    AI_GENERATED = "ai_generated"
    DOCTOR_REVIEWED = "doctor_reviewed"
    APPROVED = "approved"
    DISPENSED = "dispensed"
    PARTIALLY_DISPENSED = "partially_dispensed"


class EmergencyStatus(str, enum.Enum):
    REQUESTED = "requested"
    ACKNOWLEDGED = "acknowledged"
    AMBULANCE_DISPATCHED = "ambulance_dispatched"
    AMBULANCE_EN_ROUTE = "ambulance_en_route"
    AMBULANCE_ARRIVED = "ambulance_arrived"
    PATIENT_EN_ROUTE = "patient_en_route"
    ARRIVED_AT_HOSPITAL = "arrived_at_hospital"
    RESOLVED = "resolved"
    CANCELLED = "cancelled"


# ─── Hospital ────────────────────────────────────────────────────────────────


class Hospital(Base):
    __tablename__ = "hospitals"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255))
    address: Mapped[str] = mapped_column(Text)
    city: Mapped[str] = mapped_column(String(100))
    state: Mapped[str] = mapped_column(String(100))
    pincode: Mapped[str] = mapped_column(String(10))
    phone: Mapped[str] = mapped_column(String(20))
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    registration_number: Mapped[str | None] = mapped_column(String(100), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    staff = relationship("HospitalStaff", back_populates="hospital")
    visits = relationship("Visit", back_populates="hospital")
    appointments = relationship("Appointment", back_populates="hospital")


class HospitalStaff(Base):
    __tablename__ = "hospital_staff"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True
    )
    hospital_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("hospitals.id", ondelete="CASCADE")
    )
    department: Mapped[str | None] = mapped_column(String(100), nullable=True)
    specialization: Mapped[str | None] = mapped_column(String(255), nullable=True)
    license_number: Mapped[str | None] = mapped_column(String(100), nullable=True)

    user = relationship("User", back_populates="hospital_staff")
    hospital = relationship("Hospital", back_populates="staff")


# ─── Patient Profile ────────────────────────────────────────────────────────


class PatientProfile(Base):
    __tablename__ = "patient_profiles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True
    )
    # Matching identifiers — rule #8
    abha_id: Mapped[str | None] = mapped_column(String(50), unique=True, nullable=True, index=True)
    date_of_birth: Mapped[date | None] = mapped_column(Date, nullable=True)
    gender: Mapped[str | None] = mapped_column(String(20), nullable=True)
    blood_group: Mapped[str | None] = mapped_column(String(10), nullable=True)
    address: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Emergency & caregiver contacts
    emergency_contacts: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    caregiver_contacts: Mapped[dict | None] = mapped_column(JSONB, nullable=True)

    # Insurance / Ayushman
    ayushman_card_number: Mapped[str | None] = mapped_column(String(50), nullable=True)
    insurance_company: Mapped[str | None] = mapped_column(String(255), nullable=True)
    insurance_coverage: Mapped[Decimal | None] = mapped_column(Numeric(12, 2), nullable=True)
    insurance_expiry: Mapped[date | None] = mapped_column(Date, nullable=True)
    verification_documents: Mapped[dict | None] = mapped_column(JSONB, nullable=True)

    # Personal Health QR token
    health_qr_token: Mapped[str | None] = mapped_column(String(255), unique=True, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    user = relationship("User", back_populates="patient_profile")
    visits = relationship("Visit", back_populates="patient")
    prescriptions = relationship("Prescription", back_populates="patient")
    lab_samples = relationship("LabSample", back_populates="patient")
    appointments = relationship("Appointment", back_populates="patient")
    medicine_history = relationship("MedicineHistory", back_populates="patient")
    documents = relationship("MedicalDocument", back_populates="patient")


# ─── Visit / Encounter ──────────────────────────────────────────────────────


class Visit(Base):
    __tablename__ = "visits"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="CASCADE"), index=True
    )
    hospital_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("hospitals.id", ondelete="CASCADE"), index=True
    )
    doctor_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    visit_type: Mapped[VisitType] = mapped_column(Enum(VisitType), default=VisitType.CONSULTATION)
    status: Mapped[VisitStatus] = mapped_column(Enum(VisitStatus), default=VisitStatus.SCHEDULED)
    chief_complaint: Mapped[str | None] = mapped_column(Text, nullable=True)
    diagnosis: Mapped[str | None] = mapped_column(Text, nullable=True)
    observations: Mapped[str | None] = mapped_column(Text, nullable=True)
    follow_up_instructions: Mapped[str | None] = mapped_column(Text, nullable=True)
    follow_up_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    visit_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True
    )
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    billing_amount: Mapped[Decimal | None] = mapped_column(Numeric(12, 2), nullable=True)
    payment_status: Mapped[str | None] = mapped_column(String(20), nullable=True)

    patient = relationship("PatientProfile", back_populates="visits")
    hospital = relationship("Hospital", back_populates="visits")
    prescriptions = relationship("Prescription", back_populates="visit")


# ─── Medical Document (original uploads — rule #6) ──────────────────────────


class MedicalDocument(Base):
    """
    Original uploaded document — preserved unchanged, content-addressed, encrypted at rest.
    Links to every record derived from it (rule #6).
    """

    __tablename__ = "medical_documents"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="SET NULL"),
        nullable=True, index=True,
    )
    uploaded_by: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    document_type: Mapped[DocumentType] = mapped_column(
        Enum(DocumentType), default=DocumentType.OTHER
    )
    original_filename: Mapped[str] = mapped_column(String(500))
    # Content-addressed storage key (SHA-256 of file content)
    content_hash: Mapped[str] = mapped_column(String(64), unique=True)
    s3_key: Mapped[str] = mapped_column(String(500))
    file_size_bytes: Mapped[int] = mapped_column(Integer)
    mime_type: Mapped[str] = mapped_column(String(100))
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    patient = relationship("PatientProfile", back_populates="documents")
    extraction_results = relationship("ExtractionResult", back_populates="document")


# ─── AI Extraction Result ───────────────────────────────────────────────────


class ExtractionResult(Base):
    """
    Structured extraction from an uploaded document.
    Each field carries: value, confidence, status, source_region, reason (rule #2).
    AI-extracted data is structurally distinct from clinician-approved (rule #3).
    """

    __tablename__ = "extraction_results"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("medical_documents.id", ondelete="CASCADE"), index=True
    )
    # The full structured extraction as JSON
    # Each field: {value, confidence, status, source_region, reason}
    extracted_data: Mapped[dict] = mapped_column(JSONB, default=dict)
    model_used: Mapped[str | None] = mapped_column(String(100), nullable=True)
    extraction_time_ms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    overall_confidence: Mapped[float | None] = mapped_column(Float, nullable=True)
    status: Mapped[str] = mapped_column(
        String(30), default="pending"
    )  # pending, reviewed, approved, rejected
    reviewed_by: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    document = relationship("MedicalDocument", back_populates="extraction_results")


# ─── Prescription ────────────────────────────────────────────────────────────


class Prescription(Base):
    __tablename__ = "prescriptions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="CASCADE"), index=True
    )
    visit_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("visits.id", ondelete="SET NULL"), nullable=True
    )
    doctor_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE")
    )
    extraction_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("extraction_results.id", ondelete="SET NULL"), nullable=True
    )
    status: Mapped[PrescriptionStatus] = mapped_column(
        Enum(PrescriptionStatus), default=PrescriptionStatus.DRAFT
    )
    # QR token for pharmacy scanning (rule #7 — reveals only medicines)
    qr_token: Mapped[str | None] = mapped_column(String(255), unique=True, nullable=True)
    prescription_date: Mapped[date] = mapped_column(Date, default=date.today)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    approved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    patient = relationship("PatientProfile", back_populates="prescriptions")
    visit = relationship("Visit", back_populates="prescriptions")
    items = relationship("PrescriptionItem", back_populates="prescription")


class PrescriptionItem(Base):
    __tablename__ = "prescription_items"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    prescription_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("prescriptions.id", ondelete="CASCADE"), index=True
    )
    medicine_name: Mapped[str] = mapped_column(String(255))
    strength: Mapped[str | None] = mapped_column(String(100), nullable=True)
    dosage: Mapped[str | None] = mapped_column(String(100), nullable=True)
    frequency: Mapped[str | None] = mapped_column(String(100), nullable=True)  # e.g. 1-0-1, BD
    duration: Mapped[str | None] = mapped_column(String(100), nullable=True)
    quantity: Mapped[int | None] = mapped_column(Integer, nullable=True)
    before_after_food: Mapped[str | None] = mapped_column(String(20), nullable=True)  # BF / AF
    instructions: Mapped[str | None] = mapped_column(Text, nullable=True)
    # Per-field confidence from AI (rule #2)
    field_metadata: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    dispensed_quantity: Mapped[int | None] = mapped_column(Integer, default=0)
    pending_quantity: Mapped[int | None] = mapped_column(Integer, default=0)

    prescription = relationship("Prescription", back_populates="items")


# ─── Lab Management ──────────────────────────────────────────────────────────


class LabSample(Base):
    __tablename__ = "lab_samples"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="CASCADE"), index=True
    )
    visit_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("visits.id", ondelete="SET NULL"), nullable=True
    )
    test_name: Mapped[str] = mapped_column(String(255))
    test_category: Mapped[str | None] = mapped_column(String(100), nullable=True)  # blood, ct, xray
    status: Mapped[SampleStatus] = mapped_column(Enum(SampleStatus), default=SampleStatus.COLLECTED)
    external_lab: Mapped[str | None] = mapped_column(String(255), nullable=True)
    cost: Mapped[Decimal | None] = mapped_column(Numeric(10, 2), nullable=True)
    payment_status: Mapped[str | None] = mapped_column(String(20), nullable=True)
    result_data: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    report_qr_token: Mapped[str | None] = mapped_column(String(255), unique=True, nullable=True)
    collected_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    result_received_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    patient = relationship("PatientProfile", back_populates="lab_samples")


# ─── Appointment ─────────────────────────────────────────────────────────────


class Appointment(Base):
    __tablename__ = "appointments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="CASCADE"), index=True
    )
    hospital_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("hospitals.id", ondelete="CASCADE")
    )
    doctor_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    appointment_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)
    token_number: Mapped[int | None] = mapped_column(Integer, nullable=True)
    status: Mapped[AppointmentStatus] = mapped_column(
        Enum(AppointmentStatus), default=AppointmentStatus.SCHEDULED
    )
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    patient = relationship("PatientProfile", back_populates="appointments")
    hospital = relationship("Hospital", back_populates="appointments")


# ─── Medicine History (Patient-side tracking) ────────────────────────────────


class MedicineStatus(str, enum.Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    REMAINING = "remaining"
    EXPIRED = "expired"


class MedicineHistory(Base):
    __tablename__ = "medicine_history"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="CASCADE"), index=True
    )
    prescription_item_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("prescription_items.id", ondelete="SET NULL"), nullable=True
    )
    medicine_name: Mapped[str] = mapped_column(String(255))
    dosage: Mapped[str | None] = mapped_column(String(100), nullable=True)
    quantity: Mapped[int | None] = mapped_column(Integer, nullable=True)
    purchase_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    expiry_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    pharmacy_name: Mapped[str | None] = mapped_column(String(255), nullable=True)
    status: Mapped[MedicineStatus] = mapped_column(
        Enum(MedicineStatus), default=MedicineStatus.ACTIVE
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    patient = relationship("PatientProfile", back_populates="medicine_history")


# ─── Emergency ───────────────────────────────────────────────────────────────


class EmergencyEvent(Base):
    __tablename__ = "emergency_events"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="CASCADE"), index=True
    )
    hospital_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("hospitals.id", ondelete="SET NULL"), nullable=True
    )
    status: Mapped[EmergencyStatus] = mapped_column(
        Enum(EmergencyStatus), default=EmergencyStatus.REQUESTED
    )
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    ambulance_id: Mapped[str | None] = mapped_column(String(100), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    requested_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    resolved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


# ─── Append-Only Hash-Chained Ledger (rules #4 & #5) ────────────────────────


class LedgerEntry(Base):
    """
    Tamper-evident, append-only clinical record ledger.
    - prev_hash + hash (SHA-256 over canonical JSON) — rule #5
    - Entries are IMMUTABLE — corrections are new entries referencing the superseded one — rule #4
    - DB triggers enforce no UPDATE/DELETE (created in migration).
    """

    __tablename__ = "ledger_entries"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sequence: Mapped[int] = mapped_column(Integer, unique=True, index=True)
    entry_type: Mapped[str] = mapped_column(String(50))  # prescription, lab_result, visit, amendment
    resource_id: Mapped[str] = mapped_column(String(255))  # FK-ish ref to the resource
    patient_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="CASCADE"), index=True
    )
    actor_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE")
    )
    # The canonical JSON payload that was hashed
    payload: Mapped[dict] = mapped_column(JSONB)
    prev_hash: Mapped[str] = mapped_column(String(64))  # SHA-256 hex
    hash: Mapped[str] = mapped_column(String(64), unique=True)  # SHA-256 hex
    # Amendment reference — points to the entry this supersedes
    supersedes_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("ledger_entries.id", ondelete="SET NULL"), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    @staticmethod
    def compute_hash(prev_hash: str, payload: dict) -> str:
        """SHA-256 over canonical JSON (sorted keys, no whitespace)."""
        canonical = json.dumps(payload, sort_keys=True, separators=(",", ":"), default=str)
        data = f"{prev_hash}{canonical}"
        return hashlib.sha256(data.encode("utf-8")).hexdigest()
