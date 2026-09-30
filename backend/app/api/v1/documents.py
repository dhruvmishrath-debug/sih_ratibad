import hashlib
import uuid
import boto3
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timezone

from app.core.database import get_db
from app.core.config import get_settings
from app.models.hospital import MedicalDocument, DocumentType

router = APIRouter()
settings = get_settings()

s3_client = boto3.client(
    "s3",
    endpoint_url=settings.S3_ENDPOINT_URL,
    aws_access_key_id=settings.S3_ACCESS_KEY,
    aws_secret_access_key=settings.S3_SECRET_KEY,
    region_name=settings.S3_REGION
)

async def ensure_bucket_exists():
    try:
        s3_client.head_bucket(Bucket=settings.S3_BUCKET_NAME)
    except Exception:
        s3_client.create_bucket(Bucket=settings.S3_BUCKET_NAME)

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    document_type: DocumentType = DocumentType.OTHER,
    patient_id: uuid.UUID | None = None,
    db: AsyncSession = Depends(get_db)
):
    await ensure_bucket_exists()
    
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Empty file")

    # Tamper-evidence: content-addressed storage
    content_hash = hashlib.sha256(content).hexdigest()
    
    # Check if already exists
    result = await db.execute(select(MedicalDocument).where(MedicalDocument.content_hash == content_hash))
    existing = result.scalar_one_or_none()
    if existing:
        return {"message": "File already exists", "id": str(existing.id), "hash": content_hash}

    s3_key = f"{datetime.now(timezone.utc).strftime('%Y/%m/%d')}/{content_hash}_{file.filename}"
    
    try:
        s3_client.put_object(
            Bucket=settings.S3_BUCKET_NAME,
            Key=s3_key,
            Body=content,
            ContentType=file.content_type
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"S3 upload failed: {str(e)}")

    doc = MedicalDocument(
        patient_id=patient_id,
        document_type=document_type,
        original_filename=file.filename,
        content_hash=content_hash,
        s3_key=s3_key,
        file_size_bytes=len(content),
        mime_type=file.content_type
    )
    
    db.add(doc)
    await db.commit()
    await db.refresh(doc)
    
    return {
        "message": "Document uploaded successfully",
        "id": str(doc.id),
        "hash": content_hash,
        "s3_key": s3_key
    }
