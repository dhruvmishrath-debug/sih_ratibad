import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.hospital import Prescription, PrescriptionItem
from app.services.prescription import PrescriptionService

router = APIRouter()

@router.get("/{prescription_id}")
async def get_prescription(prescription_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Prescription)
        .options(selectinload(Prescription.items))
        .where(Prescription.id == prescription_id)
    )
    prescription = result.scalar_one_or_none()
    if not prescription:
        raise HTTPException(status_code=404, detail="Prescription not found")
    return prescription

@router.post("/{prescription_id}/approve")
async def approve_prescription(
    prescription_id: uuid.UUID,
    # In a real app, doctor_id and patient_id come from JWT token and DB relationships
    doctor_id: uuid.UUID,
    patient_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    prescription = await PrescriptionService.approve_prescription(
        db=db,
        prescription_id=prescription_id,
        doctor_id=doctor_id,
        patient_id=patient_id
    )
    return {"message": "Approved", "qr_token": prescription.qr_token}
