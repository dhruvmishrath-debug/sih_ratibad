"""
Export all models for Alembic autogenerate to detect them.
"""

from app.core.database import Base
from app.models.hospital import (
    Appointment,
    EmergencyEvent,
    ExtractionResult,
    Hospital,
    HospitalStaff,
    LabSample,
    LedgerEntry,
    MedicalDocument,
    MedicineHistory,
    PatientProfile,
    Prescription,
    PrescriptionItem,
    Visit,
)
from app.models.pharmacy import (
    AvailabilityNotification,
    DispensingRecord,
    InventoryItem,
    Pharmacy,
    PharmacyReview,
    PharmacyStaff,
    Reorder,
)
from app.models.user import AuditLog, RefreshToken, User

__all__ = [
    "Base",
    "User",
    "RefreshToken",
    "AuditLog",
    "Hospital",
    "HospitalStaff",
    "PatientProfile",
    "Visit",
    "MedicalDocument",
    "ExtractionResult",
    "Prescription",
    "PrescriptionItem",
    "LabSample",
    "Appointment",
    "MedicineHistory",
    "EmergencyEvent",
    "LedgerEntry",
    "Pharmacy",
    "PharmacyStaff",
    "PharmacyReview",
    "InventoryItem",
    "Reorder",
    "DispensingRecord",
    "AvailabilityNotification",
]
