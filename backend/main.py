from fastapi import FastAPI
from backend.routes import router

app = FastAPI(
    title="RescueLens API",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
def home():
    return {"message": "RescueLens API running"}