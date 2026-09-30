import uuid
import secrets
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi_cache.decorator import cache

from app.core.database import get_db
from app.models.hospital import PatientProfile, Prescription, LabSample, MedicalDocument
from app.models.pharmacy import MedicineHistory

router = APIRouter()

@router.get("/{patient_id}")
@cache(expire=300)
async def get_patient_profile(patient_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PatientProfile).where(PatientProfile.id == patient_id))
    profile = result.scalar_one_or_none()
    if not profile:
        raise HTTPException(status_code=404, detail="Patient profile not found")
    return profile

@router.post("/{patient_id}/generate-health-qr")
async def generate_health_qr(patient_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    """
    Generates a token to share health records with a new hospital/doctor.
    """
    result = await db.execute(select(PatientProfile).where(PatientProfile.id == patient_id))
    profile = result.scalar_one_or_none()
    if not profile:
        raise HTTPException(status_code=404, detail="Patient profile not found")
        
    profile.health_qr_token = secrets.token_urlsafe(32)
    await db.commit()
    return {"health_qr_token": profile.health_qr_token}

@router.get("/{patient_id}/prescriptions")
@cache(expire=300)
async def get_patient_prescriptions(patient_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Prescription)
        .options(selectinload(Prescription.items))
        .where(Prescription.patient_id == patient_id)
        .order_by(Prescription.created_at.desc())
    )
    return result.scalars().all()

@router.get("/{patient_id}/medicine-history")
@cache(expire=300)
async def get_medicine_history(patient_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(MedicineHistory)
        .where(MedicineHistory.patient_id == patient_id)
        .order_by(MedicineHistory.created_at.desc())
    )
    return result.scalars().all()

@router.get("/{patient_id}/documents")
@cache(expire=300)
async def get_patient_documents(patient_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(MedicalDocument)
        .where(MedicalDocument.patient_id == patient_id)
        .order_by(MedicalDocument.uploaded_at.desc())
    )
    return result.scalars().all()
