from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import asyncio

# FastAPI: Framework for building APIs.
# HTTPException: Used to return HTTP error responses.
# Depends: Dependency injection (not used in this snippet but useful for authentication or database access).
# BackgroundTasks: Allows tasks to run in the background after a request completes.
# CORSMiddleware: Handles Cross-Origin Resource Sharing (CORS) for frontend communication.
# JSONResponse: Returns JSON-formatted HTTP responses.
# logging: Configures API logging.
# asyncio: For handling asynchronous tasks.

from .config import settings
from .models import TextRequest, TextResponse, ErrorResponse
from .services import ollama_service

# settings (from config.py): Configuration settings for the API.
# TextRequest, TextResponse, ErrorResponse (from models.py): Data models for handling request and response formats.
# ollama_service (from services.py): The service that interacts with the Ollama LLM.

# Configure logging
logging.basicConfig(
    level=logging.INFO if not settings.debug else logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)

# Sets log level:
# INFO (default).
# DEBUG (if DEBUG=true in .env).
# Log format includes:
# Timestamp.
# Logger name.
# Log level (INFO, DEBUG, ERROR).
# Message.

app = FastAPI(
    title=settings.app_name,
    description=settings.description,
    version="0.1.0",
)

# Explanation
# The API metadata (name, description) comes from settings.py.
# version="0.1.0" → API version.

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# allow_origins=["*"]:
# Allows any domain to call the API (for development).
# Change this to your frontend URL in production, e.g., ["https://neuroflash.com"].
# allow_credentials=True:
# Required for authentication cookies or headers.
# allow_methods=["*"]:
# Allows all HTTP methods (GET, POST, etc.).
# allow_headers=["*"]:
# Accepts all HTTP headers.

# Store for ongoing requests to manage concurrency
active_requests = {}
# Dictionary stores ongoing requests.
# Used to track concurrency and cleanup after processing.

@app.on_event("startup")
async def startup_event():
    """Validate Ollama connection and model availability on startup"""
    logger.info("Starting Neuroflash API...")
    available, error_message = await ollama_service.check_model_availability()
    if not available:
        logger.error(f"Ollama model check failed: {error_message}")
        logger.warning("API will start, but generation endpoints may fail!")
    else:
        logger.info(f"Successfully connected to Ollama. Model '{settings.ollama_model}' is available.")

# When the API starts:
# Checks if the Ollama model is available (check_model_availability()).
# Logs status (success or failure).

@app.get("/health", response_model=dict, summary="Health check endpoint")
async def health_check():
    """Check the health of the API and Ollama connection"""
    available, error_message = await ollama_service.check_model_availability()
    
    status = "healthy" if available else "unhealthy"
    status_code = 200 if available else 503
    
    response = {
        "status": status,
        "ollama_connection": available,
        "model": settings.ollama_model,
        "active_requests": len(active_requests)
    }
    
    if not available:
        response["error"] = error_message
    
    return JSONResponse(content=response, status_code=status_code)

# GET /health:
# Checks if Ollama is reachable.
# Returns:
# "healthy" → Ollama is working.
# "unhealthy" → Ollama is unavailable (503 error).
# Active request count.


@app.post("/generate", response_model=TextResponse, responses={500: {"model": ErrorResponse}})
async def generate_text(request: TextRequest, background_tasks: BackgroundTasks):
    """Generate text from the Ollama model based on the provided prompt"""
    request_id = id(request)
    active_requests[request_id] = request
    
    try:
        logger.info(f"Received generation request with prompt: {request.prompt[:50]}...")
        
        success, result = await ollama_service.generate_text(
            prompt=request.prompt,
            max_tokens=request.max_tokens,
            temperature=request.temperature,
            system_prompt=request.system_prompt
        )
        
        if not success:
            logger.error(f"Text generation failed: {result.get('error')}")
            raise HTTPException(
                status_code=500,
                detail=result
            )
        
        logger.info(f"Successfully generated response in {result['processing_time']:.2f} seconds")
        return result
    
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Unexpected error during text generation")
        raise HTTPException(
            status_code=500,
            detail={"error": "Failed to process request", "details": str(e)}
        )
    finally:
        # Clean up the active request
        background_tasks.add_task(lambda: active_requests.pop(request_id, None))

#         POST /generate
# Receives a TextRequest (user prompt).
# Calls Ollama service (generate_text).
# Handles errors:
# Logs failed requests.
# Returns HTTP 500 for internal errors.
# Background Cleanup:
# Removes request from active_requests after processing.

# What You Want to Modify	Which Part to Change?
# Change API Title or Description	Modify settings.app_name and settings.description in config.py
# Enable/Disable Debug Logging	Change DEBUG=true or DEBUG=false in .env
# Restrict CORS (Allow Only Your Frontend)	Modify allow_origins in app.add_middleware()
# Modify Ollama Model	Change OLLAMA_MODEL in .env (e.g., "mistral", "gemma")
# Change Token Limit	Modify MAX_TOKENS in .env
# Change Request Timeout	Modify TIMEOUT in .env
# Handle More Errors in /generate	Edit exception handling in generate_text()
# Improve Logging Format	Modify logging.basicConfig() format options
# Track More Request Details	Add fields to active_requests