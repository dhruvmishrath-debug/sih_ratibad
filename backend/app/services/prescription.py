import secrets
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from fastapi import HTTPException
from datetime import datetime, timezone

from app.models.hospital import Prescription, PrescriptionStatus, PrescriptionItem
from app.services.ledger import LedgerService
from app.schemas.clinical import ExtractedPrescription

class PrescriptionService:
    @staticmethod
    def generate_qr_token() -> str:
        """Generates a secure, unguessable token for QR codes."""
        return secrets.token_urlsafe(32)

    @staticmethod
    async def create_from_extraction(
        db: AsyncSession,
        patient_id: uuid.UUID,
        doctor_id: uuid.UUID,
        extraction_id: uuid.UUID,
        extracted_data: ExtractedPrescription
    ) -> Prescription:
        """
        Creates a draft/ai-generated prescription from extraction results.
        """
        prescription = Prescription(
            patient_id=patient_id,
            doctor_id=doctor_id,
            extraction_id=extraction_id,
            status=PrescriptionStatus.AI_GENERATED
        )
        db.add(prescription)
        await db.commit()
        await db.refresh(prescription)

        # Add items
        for med in extracted_data.medicines:
            item = PrescriptionItem(
                prescription_id=prescription.id,
                medicine_name=str(med.medicine_name.value) if med.medicine_name.value else "Unknown",
                dosage=str(med.dosage.value) if med.dosage and med.dosage.value else None,
                frequency=str(med.frequency.value) if med.frequency and med.frequency.value else None,
                duration=str(med.duration.value) if med.duration and med.duration.value else None,
                quantity=int(med.quantity.value) if med.quantity and med.quantity.value else None,
                before_after_food=str(med.before_after_food.value) if med.before_after_food and med.before_after_food.value else None,
                instructions=str(med.instructions.value) if med.instructions and med.instructions.value else None,
                field_metadata={
                    "medicine_name": med.medicine_name.model_dump(),
                    "dosage": med.dosage.model_dump() if med.dosage else None,
                    "frequency": med.frequency.model_dump() if med.frequency else None
                }
            )
            db.add(item)
            
        await db.commit()
        return prescription

    @staticmethod
    async def approve_prescription(
        db: AsyncSession,
        prescription_id: uuid.UUID,
        doctor_id: uuid.UUID,
        patient_id: uuid.UUID
    ) -> Prescription:
        """
        Doctor approves the prescription. We generate the QR token and write to the ledger.
        """
        result = await db.execute(select(Prescription).where(Prescription.id == prescription_id))
        prescription = result.scalar_one_or_none()
        
        if not prescription:
            raise HTTPException(status_code=404, detail="Prescription not found")
            
        if prescription.doctor_id != doctor_id:
            raise HTTPException(status_code=403, detail="Unauthorized")

        prescription.status = PrescriptionStatus.APPROVED
        prescription.approved_at = datetime.now(timezone.utc)
        prescription.qr_token = PrescriptionService.generate_qr_token()
        
        # Write to Ledger
        # In a real scenario, we'd serialize the full prescription and items as payload
        payload = {
            "prescription_id": str(prescription.id),
            "status": "APPROVED",
            "approved_at": prescription.approved_at.isoformat()
        }
        
        await LedgerService.append_record(
            db=db,
            patient_id=patient_id,
            actor_id=doctor_id,
            entry_type="prescription_approval",
            resource_id=str(prescription.id),
            payload=payload
        )
        
        await db.commit()
        await db.refresh(prescription)
        return prescription
