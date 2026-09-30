from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.documents import router as doc_router
from app.api.v1.prescriptions import router as prescription_router
from app.api.v1.pharmacy import router as pharmacy_router
from app.api.v1.inventory import router as inventory_router
from app.api.v1.patient import router as patient_router

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(doc_router, prefix="/documents", tags=["documents"])
api_router.include_router(prescription_router, prefix="/prescriptions", tags=["prescriptions"])
api_router.include_router(pharmacy_router, prefix="/pharmacy", tags=["pharmacy"])
api_router.include_router(inventory_router, prefix="/inventory", tags=["inventory"])
api_router.include_router(patient_router, prefix="/patient", tags=["patient"])
