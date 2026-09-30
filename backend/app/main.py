import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.core.database import engine

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize Redis cache if available
    try:
        from redis import asyncio as aioredis
        from fastapi_cache import FastAPICache
        from fastapi_cache.backends.redis import RedisBackend
        redis = aioredis.from_url(settings.REDIS_URL, encoding="utf8", decode_responses=True)
        await redis.ping()
        FastAPICache.init(RedisBackend(redis), prefix="healthcare-cache")
        print("✅ Redis cache connected")
    except Exception as e:
        print(f"⚠️  Redis not available, running without cache: {e}")
    yield
    # Shutdown
    await engine.dispose()


app = FastAPI(
    title=settings.APP_NAME,
    description="AI-powered Healthcare Platform API",
    version="0.1.0",
    lifespan=lifespan,
)

# Set up CORS — include Vercel frontend URL
allowed_origins = list(settings.ALLOWED_ORIGINS)
vercel_url = os.getenv("FRONTEND_URL", "")
if vercel_url and vercel_url not in allowed_origins:
    allowed_origins.append(vercel_url)
# Also allow the Vercel deployment
allowed_origins.append("https://frontend-seven-pi-24.vercel.app")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from app.api.v1.router import api_router

@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "ok", "app": settings.APP_NAME}

app.include_router(api_router, prefix="/api/v1")

