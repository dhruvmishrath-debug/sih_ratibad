from app.schemas.clinical import ExtractedPrescription

# Stub for formulary - in production this would be backed by SNOMED CT or local db
KNOWN_DRUGS = {
    "paracetamol", "amoxicillin", "ibuprofen", "metformin", "atorvastatin", "omeprazole"
}

VALID_FREQUENCIES = {
    "1-1-1", "1-0-1", "0-0-1", "1-0-0", "0-1-0",
    "od", "bd", "tds", "qid", "sos", "prn"
}

VALID_TIMINGS = {
    "af", "bf", "after food", "before food"
}

def post_process_extraction(prescription: ExtractedPrescription) -> ExtractedPrescription:
    """
    Deterministic post-check:
    - Drug-name lookup against a formulary
    - Dose/frequency grammar (e.g. 1-0-1, OD/BD/TDS)
    - Updates status to 'needs_verification' if deterministic checks fail.
    """
    for medicine in prescription.medicines:
        # Check drug name
        if medicine.medicine_name and medicine.medicine_name.value:
            val = str(medicine.medicine_name.value).lower().strip()
            if val not in KNOWN_DRUGS:
                medicine.medicine_name.status = "needs_verification"
                medicine.medicine_name.reason = "Drug name not found in standard formulary."

        # Check frequency
        if medicine.frequency and medicine.frequency.value:
            val = str(medicine.frequency.value).lower().strip()
            if val not in VALID_FREQUENCIES:
                medicine.frequency.status = "needs_verification"
                medicine.frequency.reason = f"Unknown frequency format: {val}"
                
        # Check before/after food timing
        if medicine.before_after_food and medicine.before_after_food.value:
            val = str(medicine.before_after_food.value).lower().strip()
            if val not in VALID_TIMINGS:
                medicine.before_after_food.status = "needs_verification"
                medicine.before_after_food.reason = f"Unknown timing format: {val}"

    return prescription
