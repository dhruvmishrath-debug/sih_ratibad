import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.pharmacy import InventoryItem
from app.services.inventory import InventoryService

router = APIRouter()

@router.get("/{pharmacy_id}/inventory")
async def get_inventory(pharmacy_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(InventoryItem)
        .where(InventoryItem.pharmacy_id == pharmacy_id)
    )
    return result.scalars().all()

@router.post("/{pharmacy_id}/inventory/{item_id}/restock")
async def restock_item(
    pharmacy_id: uuid.UUID,
    item_id: uuid.UUID,
    quantity_added: int,
    db: AsyncSession = Depends(get_db)
):
    if quantity_added <= 0:
        raise HTTPException(status_code=400, detail="Quantity added must be positive")
        
    try:
        item = await InventoryService.update_stock(db, pharmacy_id, item_id, quantity_added)
        return {"message": "Stock updated", "new_quantity": item.quantity}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/expiring")
async def get_expiring_items(days: int = 30, db: AsyncSession = Depends(get_db)):
    """
    Returns items across the platform (or filtered by pharmacy_id in real app) that are expiring soon.
    """
    items = await InventoryService.check_expiring_soon(db, days_threshold=days)
    return items
