import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from datetime import datetime, timezone

from app.core.database import get_db
from app.models.hospital import Prescription, PrescriptionStatus
from app.models.pharmacy import DispensingRecord

router = APIRouter()

@router.get("/scan-prescription/{qr_token}")
async def scan_prescription(qr_token: str, db: AsyncSession = Depends(get_db)):
    """
    Pharmacy scans the QR token.
    Rule #7: Patient privacy - pharmacy only sees medicines, no diagnosis.
    """
    result = await db.execute(
        select(Prescription)
        .options(selectinload(Prescription.items))
        .where(Prescription.qr_token == qr_token)
    )
    prescription = result.scalar_one_or_none()
    
    if not prescription:
        raise HTTPException(status_code=404, detail="Invalid or expired QR token")
        
    if prescription.status not in [PrescriptionStatus.APPROVED, PrescriptionStatus.PARTIALLY_DISPENSED]:
        raise HTTPException(status_code=400, detail=f"Prescription cannot be dispensed. Status: {prescription.status}")
        
    # Redact sensitive information, return only items
    response_data = {
        "prescription_id": str(prescription.id),
        "prescription_date": prescription.prescription_date.isoformat(),
        "status": prescription.status,
        "items": []
    }
    
    for item in prescription.items:
        response_data["items"].append({
            "item_id": str(item.id),
            "medicine_name": item.medicine_name,
            "strength": item.strength,
            "dosage": item.dosage,
            "frequency": item.frequency,
            "duration": item.duration,
            "quantity": item.quantity,
            "dispensed_quantity": item.dispensed_quantity,
            "pending_quantity": item.pending_quantity
        })
        
    return response_data

@router.post("/dispense")
async def dispense_medicine(
    pharmacy_id: uuid.UUID,
    prescription_id: uuid.UUID,
    item_id: uuid.UUID,
    quantity_to_dispense: int,
    pharmacist_id: uuid.UUID,
    db: AsyncSession = Depends(get_db)
):
    """
    Records a dispensing event (supports partial fulfillment).
    """
    result = await db.execute(
        select(Prescription)
        .options(selectinload(Prescription.items))
        .where(Prescription.id == prescription_id)
    )
    prescription = result.scalar_one_or_none()
    
    if not prescription:
        raise HTTPException(status_code=404, detail="Prescription not found")
        
    target_item = next((i for i in prescription.items if i.id == item_id), None)
    if not target_item:
        raise HTTPException(status_code=404, detail="Item not found in prescription")
        
    if not target_item.quantity:
        raise HTTPException(status_code=400, detail="Prescription item has no quantity specified")
        
    remaining = target_item.quantity - target_item.dispensed_quantity
    if quantity_to_dispense > remaining:
        raise HTTPException(status_code=400, detail=f"Cannot dispense more than remaining quantity: {remaining}")
        
    # Create dispensing record
    record = DispensingRecord(
        pharmacy_id=pharmacy_id,
        prescription_id=prescription_id,
        prescription_item_id=item_id,
        quantity_dispensed=quantity_to_dispense,
        quantity_pending=remaining - quantity_to_dispense,
        dispensed_by=pharmacist_id
    )
    db.add(record)
    
    # Update item
    target_item.dispensed_quantity += quantity_to_dispense
    target_item.pending_quantity = target_item.quantity - target_item.dispensed_quantity
    
    # Update overall prescription status
    all_dispensed = all((i.quantity or 0) == i.dispensed_quantity for i in prescription.items)
    if all_dispensed:
        prescription.status = PrescriptionStatus.DISPENSED
    else:
        prescription.status = PrescriptionStatus.PARTIALLY_DISPENSED
        
    await db.commit()
    return {"message": "Medicine dispensed successfully", "status": prescription.status}
