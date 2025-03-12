# Modified run.py
import uvicorn
import asyncio
from app.main import app

if __name__ == "__main__":
    # Instead of using uvicorn.run directly, configure the server manually
    config = uvicorn.Config(app, host="0.0.0.0", port=8000, log_level="info")
    server = uvicorn.Server(config)
    
    # Run the server using an explicit event loop
    asyncio.run(server.serve())