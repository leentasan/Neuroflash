from fastapi import FastAPI
from pydantic import BaseModel
from ai_logic import generate_flashcards  # Import AI logic

app = FastAPI()

class FlashcardRequest(BaseModel):
    text: str

@app.post("/generate_flashcards/")
async def generate_flashcards_endpoint(request: FlashcardRequest):
    """ Generates flashcards from user text """
    flashcards = generate_flashcards(request.text)
    return {"flashcards": flashcards}

@app.get("/")
def root():
    return {"message": "AI Service is running"}