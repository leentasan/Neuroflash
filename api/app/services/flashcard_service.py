from sqlalchemy.orm import Session
from fastapi import UploadFile
import os
import magic
from app.models.flashcard import Flashcard, UploadedFile
from app.schemas.flashcard import FlashcardCreate, FlashcardUpdate
from PyPDF2 import PdfReader
import shutil

def create_flashcard(
    db: Session, flashcard: FlashcardCreate, user_id: str
) -> Flashcard:
    db_flashcard = Flashcard(
        **flashcard.dict(),
        user_id=user_id
    )
    db.add(db_flashcard)
    db.commit()
    db.refresh(db_flashcard)
    return db_flashcard

def get_flashcards(
    db: Session, user_id: str, skip: int = 0, limit: int = 100
) -> list[Flashcard]:
    return (
        db.query(Flashcard)
        .filter(Flashcard.user_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_flashcard(
    db: Session, flashcard_id: int, user_id: str
) -> Flashcard:
    return (
        db.query(Flashcard)
        .filter(Flashcard.id == flashcard_id)
        .filter(Flashcard.user_id == user_id)
        .first()
    )

def update_flashcard(
    db: Session, flashcard_id: int, flashcard: FlashcardUpdate, user_id: str
) -> Flashcard:
    db_flashcard = get_flashcard(db, flashcard_id, user_id)
    if db_flashcard is None:
        return None
    
    for key, value in flashcard.dict(exclude_unset=True).items():
        setattr(db_flashcard, key, value)
    
    db.commit()
    db.refresh(db_flashcard)
    return db_flashcard

def delete_flashcard(
    db: Session, flashcard_id: int, user_id: str
) -> bool:
    db_flashcard = get_flashcard(db, flashcard_id, user_id)
    if db_flashcard is None:
        return False
    
    db.delete(db_flashcard)
    db.commit()
    return True

async def process_uploaded_file(
    db: Session, file: UploadFile, user_id: str
) -> dict:
    # Create uploads directory if it doesn't exist
    upload_dir = os.path.join("uploads", user_id)
    os.makedirs(upload_dir, exist_ok=True)
    
    file_path = os.path.join(upload_dir, file.filename)
    
    # Save the file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Detect file type
    mime_type = magic.from_file(file_path, mime=True)
    
    # Extract text based on file type
    extracted_text = ""
    if mime_type == "application/pdf":
        with open(file_path, "rb") as pdf_file:
            pdf_reader = PdfReader(pdf_file)
            for page in pdf_reader.pages:
                extracted_text += page.extract_text()
    elif mime_type.startswith("text/"):
        with open(file_path, "r", encoding="utf-8") as text_file:
            extracted_text = text_file.read()
    
    # Save file information to database
    db_file = UploadedFile(
        filename=file.filename,
        file_path=file_path,
        content_type=mime_type,
        user_id=user_id,
        extracted_text=extracted_text,
        processed=True
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    
    return {
        "id": db_file.id,
        "filename": db_file.filename,
        "content_type": db_file.content_type,
        "processed": db_file.processed
    }
