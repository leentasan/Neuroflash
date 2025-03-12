# neuroflash_api/app/config.py
from pydantic_settings import BaseSettings  # Changed from pydantic import BaseSettings
from dotenv import load_dotenv 
import os

# pydantic_settings.BaseSettings:
# Used to create a settings class that automatically reads values from environment variables.

load_dotenv()
# Loads environment variables from a .env file into os.environ, making them accessible via os.getenv()
class Settings(BaseSettings):
    app_name: str = "Neuroflash API" #name of the API
    description: str = "AI-enhanced flashcard system API using Ollama LLM" #brief description of the API
    debug: bool = os.getenv("DEBUG", "False").lower() == "true" 
            #     debug:
            # Retrieves the DEBUG environment variable.
            # Converts it to lowercase ("False".lower() → "false").
            # Compares it to "true" to determine whether debug mode is enabled.
            # Default: False.
    ollama_host: str = os.getenv("OLLAMA_HOST", "http://localhost:11434")
            #     ollama_host:
            # Retrieves OLLAMA_HOST from the environment.
            # Default: "http://localhost:11434" (Ollama’s default local server).
    ollama_model: str = os.getenv("OLLAMA_MODEL", "llama2")
            #     ollama_model:
            # Retrieves OLLAMA_MODEL from the environment.
            # Default: "llama2" (the default Ollama model).
    max_tokens: int = int(os.getenv("MAX_TOKENS", "1024"))
            #             max_tokens:
            # Retrieves MAX_TOKENS from the environment.
            # Converts it to an integer (int(os.getenv("MAX_TOKENS", "1024"))).
            # Default: 1024 tokens (limits LLM response length)
    timeout: int = int(os.getenv("TIMEOUT", "120"))
            #     timeout:
            # Retrieves TIMEOUT from the environment.
            # Converts it to an integer.
            # Default: 120 seconds (2 minutes timeout)

# os:
# A standard Python module for interacting with the operating system, mainly used here to retrieve environment variables
settings = Settings()
# This creates a single instance of Settings that can be imported throughout the application (settings.debug, settings.ollama_host, etc.).
# Using BaseSettings ensures that it automatically reads values from environment variables.

# What You Want to Change	Which Part to Modify?
# App name (Neuroflash API)	Change app_name in Settings class
# API description	Modify description in Settings class
# Enable/Disable Debug Mode	Change DEBUG in .env (true or false)
# Change Ollama Host (LLM Server URL)	Modify OLLAMA_HOST in .env (e.g., "http://example.com:1234")
# Change Ollama Model	Modify OLLAMA_MODEL in .env (e.g., "mistral" or "gemma")
# Increase/Decrease Token Limit	Modify MAX_TOKENS in .env (e.g., "2048")
# Change Request Timeout	Modify TIMEOUT in .env (e.g., "60")