from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date
from decimal import Decimal

# Base model for extracted fields with confidence and bounding box
class ExtractedField(BaseModel):
    value: str | int | float | None = Field(default=None, description="The extracted value.")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence score from 0.0 to 1.0.")
    status: str = Field(
        default="ai_extracted",
        description="Must be 'ai_extracted', 'needs_verification', 'illegible', or 'clinician_confirmed'."
    )
    source_region: Optional[List[float]] = Field(
        default=None,
        description="Bounding box on the original image: [ymin, xmin, ymax, xmax] relative coordinates (0-1)."
    )
    reason: Optional[str] = Field(
        default=None,
        description="Reason if flagged or illegible."
    )


class ExtractedMedicine(BaseModel):
    medicine_name: ExtractedField
    strength: Optional[ExtractedField] = None
    dosage: Optional[ExtractedField] = None
    frequency: Optional[ExtractedField] = None
    duration: Optional[ExtractedField] = None
    quantity: Optional[ExtractedField] = None
    before_after_food: Optional[ExtractedField] = None
    instructions: Optional[ExtractedField] = None


class ExtractedPrescription(BaseModel):
    patient_name: Optional[ExtractedField] = None
    patient_age: Optional[ExtractedField] = None
    patient_gender: Optional[ExtractedField] = None
    
    doctor_name: Optional[ExtractedField] = None
    hospital_name: Optional[ExtractedField] = None
    date: Optional[ExtractedField] = None
    
    diagnosis: Optional[ExtractedField] = None
    chief_complaint: Optional[ExtractedField] = None
    observations: Optional[ExtractedField] = None
    investigations: Optional[ExtractedField] = None
    follow_up_instructions: Optional[ExtractedField] = None
    
    medicines: List[ExtractedMedicine] = Field(default_factory=list)
