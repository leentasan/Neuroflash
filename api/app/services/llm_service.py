from sqlalchemy.orm import Session
import httpx
from app.core.config import settings
from app.schemas.flashcard import FlashcardGeneration, FlashcardCreate
from app.models.flashcard import UploadedFile
import json

async def generate_flashcards(
    db: Session,
    generation: FlashcardGeneration,
    user_id: str
) -> list:
    # Get context from uploaded files if provided
    context = ""
    if generation.context_file_ids:
        files = (
            db.query(UploadedFile)
            .filter(
                UploadedFile.id.in_(generation.context_file_ids),
                UploadedFile.user_id == user_id
            )
            .all()
        )
        context = "\n\n".join(
            f.extracted_text for f in files if f.extracted_text
        )

    # Prepare prompt for Llama 2
    system_prompt = """
    You are a helpful AI that creates flashcards. Generate 3-5 flashcards based on the given prompt.
    Each flashcard should have a front (question/concept) and back (answer/explanation).
    Return the flashcards in JSON format like this:
    {
        "flashcards": [
            {"front": "...", "back": "..."},
            {"front": "...", "back": "..."}
        ]
    }
    """
    
    user_prompt = generation.prompt
    if context:
        user_prompt = f"Context:\n{context}\n\nPrompt: {user_prompt}"

    # Call Llama 2 via Ollama
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{settings.OLLAMA_API_URL}/api/generate",
            json={
                "model": "llama2",
                "prompt": f"{system_prompt}\n\nUser: {user_prompt}",
                "stream": False
            }
        )
        response.raise_for_status()
        
        # Parse response and extract flashcards
        try:
            llm_response = response.json()
            response_text = llm_response["response"]
            # Find the JSON part in the response
            start = response_text.find("{")
            end = response_text.rfind("}") + 1
            flashcards_json = json.loads(response_text[start:end])
            
            # Create flashcards in database
            created_flashcards = []
            for fc in flashcards_json["flashcards"]:
                flashcard = FlashcardCreate(
                    front=fc["front"],
                    back=fc["back"],
                    category=generation.category
                )
                created = create_flashcard(db, flashcard, user_id)
                created_flashcards.append(created)
            
            return created_flashcards
        except Exception as e:
            raise Exception(f"Failed to parse LLM response: {str(e)}")

def create_flashcard(db: Session, flashcard: FlashcardCreate, user_id: str):
    from app.services.flashcard_service import create_flashcard
    return create_flashcard(db, flashcard, user_id)
