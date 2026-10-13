from fastapi import FastAPI

app = FastAPI(title="Galley Project API",version="0.1.0")


@app.get("/")
def root():
    return {"message": "FastAPI server is running"}


@app.get("/health")
def health_check():
    return {"status": "ok"}