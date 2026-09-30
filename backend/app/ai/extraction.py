import json
import base64
import httpx
from pydantic import ValidationError

from app.core.config import get_settings
from app.schemas.clinical import ExtractedPrescription

settings = get_settings()

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent"

SYSTEM_PROMPT = """
You are a highly accurate clinical extraction AI. Your task is to extract information from the provided handwritten prescription or clinical document.
Follow these rules strictly:
1. NEVER hallucinate. If handwriting is illegible, ambiguous or missing, set the value to null, status to "illegible", and provide a reason.
2. For EVERY field, you MUST return:
   - value: the extracted text/number or null
   - confidence: a float between 0.0 and 1.0 (0.0 if missing/illegible)
   - status: "ai_extracted" if confident, "needs_verification" if confidence < 0.8, "illegible" if unreadable
   - source_region: an array of 4 floats [ymin, xmin, ymax, xmax] relative to the image (0.0 to 1.0) for where you found it (optional, you can approximate).
   - reason: explanation if illegible or needs verification.
3. Your output MUST perfectly match the JSON schema for ExtractedPrescription.
"""

async def extract_prescription_data(image_bytes: bytes, mime_type: str = "image/jpeg") -> ExtractedPrescription:
    """
    Calls the Gemini vision-language model to extract structured data from an image.
    """
    if not settings.GOOGLE_API_KEY:
        raise ValueError("GOOGLE_API_KEY is not set.")

    encoded_image = base64.b64encode(image_bytes).decode('utf-8')
    
    # We pass the schema of ExtractedPrescription to ensure valid JSON response
    # For Gemini API, structured outputs can be specified via JSON schema in the generationConfig
    schema = ExtractedPrescription.model_json_schema()
    
    payload = {
        "systemInstruction": {
            "parts": [{"text": SYSTEM_PROMPT}]
        },
        "contents": [
            {
                "parts": [
                    {"inlineData": {"mimeType": mime_type, "data": encoded_image}},
                    {"text": "Extract all data following the strict JSON schema provided."}
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseSchema": schema,
            "temperature": 0.0, # Deterministic
        }
    }
    
    headers = {"Content-Type": "application/json"}
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{GEMINI_API_URL}?key={settings.GOOGLE_API_KEY}",
            json=payload,
            headers=headers,
            timeout=30.0
        )
        
        response.raise_for_status()
        
        data = response.json()
        
        if "candidates" not in data or not data["candidates"]:
            raise RuntimeError("Model returned no candidates.")
            
        json_text = data["candidates"][0]["content"]["parts"][0]["text"]
        
        # Pydantic validation
        try:
            extracted_obj = ExtractedPrescription.model_validate_json(json_text)
            return extracted_obj
        except ValidationError as e:
            raise RuntimeError(f"Model returned invalid schema: {e}")
