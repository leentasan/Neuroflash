import httpx
import time
import json
from typing import Dict, Any, Optional, Tuple
from .config import settings

class OllamaService:
    def __init__(self):
        self.base_url = settings.ollama_host
        self.model = settings.ollama_model
        self.timeout = settings.timeout

    async def check_model_availability(self) -> Tuple[bool, Optional[str]]:
        """Check if the specified Ollama model is available"""
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(f"{self.base_url}/api/tags")
                if response.status_code == 200:
                    models = response.json().get("models", [])
                    for model in models:
                        if model.get("name") == self.model:
                            return True, None
                    return False, f"Model '{self.model}' not found in Ollama. Please run 'ollama pull {self.model}'"
                return False, f"Failed to get models: {response.text}"
        except httpx.RequestError as e:
            return False, f"Connection error: {str(e)}"
        except Exception as e:
            return False, f"Unexpected error: {str(e)}"

    async def generate_text(self, 
                            prompt: str, 
                            max_tokens: Optional[int] = None,
                            temperature: float = 0.7,
                            system_prompt: Optional[str] = None) -> Tuple[bool, Dict[str, Any]]:
        """Generate text using the Ollama model"""
        start_time = time.time()
        
        try:
            request_data = {
                "model": self.model,
                "prompt": prompt,
                "temperature": temperature,
                "stream": False,
            }
            
            if max_tokens:
                request_data["max_tokens"] = max_tokens
            else:
                request_data["max_tokens"] = settings.max_tokens
                
            if system_prompt:
                request_data["system"] = system_prompt

            async with httpx.AsyncClient(timeout=float(self.timeout)) as client:
                response = await client.post(
                    f"{self.base_url}/api/generate",
                    json=request_data
                )
                
                if response.status_code != 200:
                    return False, {
                        "error": "Failed to generate text",
                        "details": response.text,
                        "processing_time": time.time() - start_time
                    }
                
                result = response.json()
                return True, {
                    "text": result.get("response", ""),
                    "model": self.model,
                    "processing_time": time.time() - start_time
                }
                
        except httpx.RequestError as e:
            return False, {
                "error": "Connection error",
                "details": str(e),
                "processing_time": time.time() - start_time
            }
        except Exception as e:
            return False, {
                "error": "Unexpected error",
                "details": str(e),
                "processing_time": time.time() - start_time
            }

ollama_service = OllamaService()