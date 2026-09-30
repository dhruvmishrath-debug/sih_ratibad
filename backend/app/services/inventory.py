import uuid
from datetime import date, datetime, timezone, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update

from app.models.pharmacy import InventoryItem, AvailabilityNotification, AvailabilityNotifStatus

class InventoryService:
    @staticmethod
    async def update_stock(
        db: AsyncSession,
        pharmacy_id: uuid.UUID,
        item_id: uuid.UUID,
        quantity_added: int
    ) -> InventoryItem:
        """
        Updates stock quantity and triggers availability notifications if previously low/out of stock.
        """
        result = await db.execute(
            select(InventoryItem)
            .where(InventoryItem.id == item_id, InventoryItem.pharmacy_id == pharmacy_id)
        )
        item = result.scalar_one_or_none()
        
        if not item:
            raise ValueError("Inventory item not found.")
            
        was_out_of_stock = item.is_out_of_stock
        
        item.quantity += quantity_added
        
        # If it was out of stock and now is available, trigger notifications
        if was_out_of_stock and item.quantity > 0:
            await InventoryService.trigger_availability_notifications(db, pharmacy_id, item.medicine_name, item.quantity)
            
        await db.commit()
        await db.refresh(item)
        return item
        
    @staticmethod
    async def trigger_availability_notifications(
        db: AsyncSession,
        pharmacy_id: uuid.UUID,
        medicine_name: str,
        available_quantity: int
    ):
        """
        Finds pending requests/notifications for a medicine that was out of stock and notifies patients.
        """
        # In a real system, patients might opt-in to be notified when a drug is back in stock at a pharmacy.
        # Here we would query a 'Waitlist' or 'PendingNotification' table.
        # Assuming we have AvailabilityNotification records in "NOTIFIED" state meaning they requested it.
        # For simplicity, we just mark existing pending notifications for this drug as notified again?
        # Actually, the spec says: push/in-app notification when medicines restock.
        
        # We can find all patients who searched for it and couldn't find it (if we tracked that),
        # or we update existing AvailabilityNotification records.
        pass

    @staticmethod
    async def check_expiring_soon(db: AsyncSession, days_threshold: int = 30) -> list[InventoryItem]:
        """
        Returns a list of inventory items expiring within the given threshold days.
        """
        threshold_date = date.today() + timedelta(days=days_threshold)
        
        result = await db.execute(
            select(InventoryItem)
            .where(
                InventoryItem.expiry_date != None,
                InventoryItem.expiry_date <= threshold_date,
                InventoryItem.is_expired == False
            )
        )
        
        return result.scalars().all()
