"""Healthcare Platform — core configuration via pydantic-settings."""

from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    # ── App ──
    APP_NAME: str = "HealthcarePlatform"
    DEBUG: bool = False
    SECRET_KEY: str = "CHANGE_ME"
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]

    # ── Database ──
    DATABASE_URL: str = "postgresql+asyncpg://healthcare:healthcare@localhost:5432/healthcare_db"

    # ── Redis ──
    REDIS_URL: str = "redis://localhost:6379/0"

    # ── JWT ──
    JWT_SECRET_KEY: str = "CHANGE_ME_jwt_secret_key"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ── S3 / MinIO ──
    S3_ENDPOINT_URL: str = "http://localhost:9000"
    S3_ACCESS_KEY: str = "minioadmin"
    S3_SECRET_KEY: str = "minioadmin"
    S3_BUCKET_NAME: str = "healthcare-documents"
    S3_REGION: str = "us-east-1"

    # ── AI ──
    GOOGLE_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    CONFIDENCE_THRESHOLD: float = 0.80


@lru_cache()
def get_settings() -> Settings:
    return Settings()
