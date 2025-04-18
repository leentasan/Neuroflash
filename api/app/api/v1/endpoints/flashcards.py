from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import httpx
from app.db.session import get_db
from app.schemas.flashcard import (
    Flashcard,
    FlashcardCreate,
    FlashcardUpdate,
    FlashcardGeneration
)
from app.core.config import settings
from app.api.deps import get_current_user
from app.services import flashcard_service, llm_service

router = APIRouter()

@router.post("/", response_model=Flashcard)
async def create_flashcard(
    flashcard: FlashcardCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    return flashcard_service.create_flashcard(db, flashcard, current_user)

@router.get("/", response_model=List[Flashcard])
async def read_flashcards(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    return flashcard_service.get_flashcards(db, current_user, skip, limit)

@router.get("/{flashcard_id}", response_model=Flashcard)
async def read_flashcard(
    flashcard_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    flashcard = flashcard_service.get_flashcard(db, flashcard_id, current_user)
    if flashcard is None:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    return flashcard

@router.put("/{flashcard_id}", response_model=Flashcard)
async def update_flashcard(
    flashcard_id: int,
    flashcard: FlashcardUpdate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    updated = flashcard_service.update_flashcard(
        db, flashcard_id, flashcard, current_user
    )
    if updated is None:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    return updated

@router.delete("/{flashcard_id}")
async def delete_flashcard(
    flashcard_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    success = flashcard_service.delete_flashcard(db, flashcard_id, current_user)
    if not success:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    return {"status": "success"}

@router.post("/generate", response_model=List[Flashcard])
async def generate_flashcards(
    generation: FlashcardGeneration,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    try:
        return await llm_service.generate_flashcards(
            db, generation, current_user
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    return await flashcard_service.process_uploaded_file(db, file, current_user)
