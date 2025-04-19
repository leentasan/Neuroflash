# Neuroflash FastAPI Service

This service provides flashcard management, LLM-assisted flashcard generation, and file upload functionality for the Neuroflash application.

## Features

- Flashcard CRUD operations
- LLM-assisted flashcard generation using Llama 2
- File upload and text extraction (PDF and text files)
- Integration with existing authentication system

## Prerequisites

- Python 3.8+
- PostgreSQL
- Redis
- Ollama with Llama 2 model

## Setup

1. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables in `.env`:
```env
POSTGRES_SERVER=localhost
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=neuroflash
REDIS_HOST=localhost
REDIS_PORT=6379
OLLAMA_API_URL=http://localhost:11434
SECRET_KEY=your_secret_key
```

4. Initialize the database:
```bash
alembic upgrade head
```

5. Start the server:
```bash
uvicorn main:app --reload
```

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Integration with Existing Backend

The FastAPI service validates JWT tokens from the existing authentication system. Make sure to:

1. Set the correct `SECRET_KEY` in the environment variables
2. Include the JWT token in the Authorization header of requests:
   ```
   Authorization: Bearer <token>
   ```

## API Endpoints

### Flashcards
- `POST /api/v1/flashcards/` - Create a new flashcard
- `GET /api/v1/flashcards/` - List flashcards
- `GET /api/v1/flashcards/{id}` - Get a specific flashcard
- `PUT /api/v1/flashcards/{id}` - Update a flashcard
- `DELETE /api/v1/flashcards/{id}` - Delete a flashcard
- `POST /api/v1/flashcards/generate` - Generate flashcards using LLM
- `POST /api/v1/flashcards/upload` - Upload file for knowledge base
