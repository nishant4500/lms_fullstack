import os

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError
from app.database import engine
from app import models
from app.routes import auth
from app.routes import courses


# CREATE TABLES
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Browser calls from Static Web Apps / another origin need CORS. Set CORS_ORIGINS="https://your-app.azurestaticapps.net,https://localhost:5173"
_cors_raw = os.getenv("CORS_ORIGINS", "*").strip()
if not _cors_raw or _cors_raw == "*":
    _origins = ["*"]
else:
    _origins = [o.strip() for o in _cors_raw.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(IntegrityError)
async def integrity_exception_handler(request: Request, exc: IntegrityError):
    return JSONResponse(
        status_code=400,
        content={"detail": f"Database integrity error: {str(exc.orig)}"}
    )


@app.get("/")
def root():
    return {"message": "LMS running"}

from app.routes import modules, enrollments, assignments, progress

app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(modules.router)
app.include_router(enrollments.router)
app.include_router(assignments.router)
app.include_router(progress.router)