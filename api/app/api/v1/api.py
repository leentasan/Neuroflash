from fastapi import APIRouter
from app.api.v1.endpoints import flashcards

api_router = APIRouter()
api_router.include_router(flashcards.router, prefix="/flashcards", tags=["flashcards"])
