from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class FlashcardBase(BaseModel):
    front: str
    back: str
    category: Optional[str] = None

class FlashcardCreate(FlashcardBase):
    pass

class FlashcardUpdate(FlashcardBase):
    pass

class Flashcard(FlashcardBase):
    id: int
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class FlashcardGeneration(BaseModel):
    prompt: str
    category: Optional[str] = None
    context_file_ids: Optional[list[int]] = None
