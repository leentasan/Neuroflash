from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class TextRequest(BaseModel):
    """
    Model for handling text generation requests.
    
    Fields:
    - prompt (str): The text prompt sent to the LLM. (Required, min 1 character)
    - max_tokens (Optional[int]): Maximum tokens to generate. If None, the model’s default is used.
    - temperature (Optional[float]): Controls response randomness. 
      - 0.0 = deterministic (always similar output)
      - 1.0 = highly creative (varied responses)
    - system_prompt (Optional[str]): An optional instruction to guide the model's response.
    """
    prompt: str = Field(..., min_length=1, description="The text prompt to send to the LLM")
    max_tokens: Optional[int] = Field(None, description="Maximum tokens to generate (optional)")
    temperature: Optional[float] = Field(0.7, ge=0.0, le=1.0, description="Temperature for sampling")
    system_prompt: Optional[str] = Field(None, description="Optional system prompt")

class TextResponse(BaseModel):
    text: str = Field(..., description="Generated text response")
    model: str = Field(..., description="Model used for generation")
    processing_time: float = Field(..., description="Time taken to process the request in seconds")

class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error message")
    details: Optional[Dict[str, Any]] = Field(None, description="Additional error details")