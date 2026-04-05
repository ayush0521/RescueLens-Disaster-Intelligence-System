from fastapi import FastAPI
from backend.routes import router

app = FastAPI()

@app.get("/")
def home():
    return {"message": "API is running"}

app.include_router(router)
