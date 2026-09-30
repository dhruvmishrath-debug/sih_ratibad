import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc

from app.models.hospital import LedgerEntry

class LedgerService:
    @staticmethod
    async def append_record(
        db: AsyncSession,
        patient_id: uuid.UUID,
        actor_id: uuid.UUID,
        entry_type: str,
        resource_id: str,
        payload: dict,
        supersedes_id: uuid.UUID | None = None
    ) -> LedgerEntry:
        """
        Appends a new record to the tamper-evident ledger.
        Computes the hash chaining (prev_hash + payload).
        """
        # Lock the table for writing to prevent race conditions on sequence/hash
        # In Postgres: LOCK TABLE ledger_entries IN EXCLUSIVE MODE
        # For simplicity in asyncpg we just get the latest record in the transaction
        
        # Get the latest entry
        result = await db.execute(
            select(LedgerEntry).order_by(desc(LedgerEntry.sequence)).limit(1)
        )
        latest_entry = result.scalar_one_or_none()
        
        if latest_entry:
            next_seq = latest_entry.sequence + 1
            prev_hash = latest_entry.hash
        else:
            # Genesis block
            next_seq = 1
            prev_hash = "0" * 64

        # Compute hash
        current_hash = LedgerEntry.compute_hash(prev_hash, payload)

        new_entry = LedgerEntry(
            sequence=next_seq,
            entry_type=entry_type,
            resource_id=resource_id,
            patient_id=patient_id,
            actor_id=actor_id,
            payload=payload,
            prev_hash=prev_hash,
            hash=current_hash,
            supersedes_id=supersedes_id
        )

        db.add(new_entry)
        await db.commit()
        await db.refresh(new_entry)
        return new_entry

    @staticmethod
    async def verify_ledger(db: AsyncSession) -> bool:
        """
        Recomputes all hashes in the ledger to ensure no tampering occurred.
        """
        result = await db.execute(select(LedgerEntry).order_by(LedgerEntry.sequence))
        entries = result.scalars().all()
        
        expected_prev_hash = "0" * 64
        for entry in entries:
            if entry.prev_hash != expected_prev_hash:
                return False
            computed_hash = LedgerEntry.compute_hash(expected_prev_hash, entry.payload)
            if entry.hash != computed_hash:
                return False
            expected_prev_hash = entry.hash
            
        return True
