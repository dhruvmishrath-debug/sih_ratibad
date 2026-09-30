import asyncio
import csv
import uuid
from datetime import datetime, timezone, timedelta
from typing import Dict

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

import os
import sys

# Add the project root to the python path so we can import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import async_session_factory, engine
from app.models.hospital import PatientProfile, Visit, VisitType, VisitStatus, Hospital
from app.models.user import User, UserRole

async def main():
    async with async_session_factory() as session:
        # Create a generic hospital if it doesn't exist
        hospital = await session.scalar(select(Hospital).where(Hospital.name == "General Hospital"))
        if not hospital:
            hospital = Hospital(
                name="General Hospital",
                address="123 Health Way",
                city="Metropolis",
                state="State",
                pincode="10001",
                phone="123-456-7890"
            )
            session.add(hospital)
            await session.commit()
            await session.refresh(hospital)

        csv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "hospital data analysis.csv")
        
        patients: Dict[str, PatientProfile] = {}
        
        with open(csv_path, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            
            for row in reader:
                patient_id_str = row["Patient_ID"]
                age = int(row["Age"])
                gender = row["Gender"]
                condition = row["Condition"]
                procedure = row["Procedure"]
                cost = float(row["Cost"])
                length_of_stay = int(row["Length_of_Stay"])
                
                # Check if patient exists in our local dictionary
                if patient_id_str not in patients:
                    # Create a dummy user
                    user = User(
                        email=f"patient_{patient_id_str}@example.com",
                        hashed_password="dummy",
                        full_name=f"Patient {patient_id_str}",
                        role=UserRole.PATIENT,
                        is_active=True,
                    )
                    session.add(user)
                    await session.flush()
                    
                    # Estimate DOB
                    dob = datetime.now(timezone.utc).date() - timedelta(days=age * 365)
                    
                    patient = PatientProfile(
                        user_id=user.id,
                        gender=gender,
                        date_of_birth=dob
                    )
                    session.add(patient)
                    await session.flush()
                    patients[patient_id_str] = patient
                
                patient = patients[patient_id_str]
                
                # Create a Visit for this record
                visit = Visit(
                    patient_id=patient.id,
                    hospital_id=hospital.id,
                    visit_type=VisitType.PROCEDURE,
                    status=VisitStatus.COMPLETED,
                    diagnosis=condition,
                    chief_complaint=condition,
                    observations=f"Procedure: {procedure}",
                    billing_amount=cost,
                    payment_status="paid"
                )
                session.add(visit)
        
        await session.commit()
        print(f"Successfully loaded {len(patients)} patients and their visits.")

if __name__ == "__main__":
    asyncio.run(main())
