from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from .auth import create_access_token
from .candidates import router as candidates_router
from .models import LoginRequest, TokenResponse
from .services import get_user_by_email, public_user
from passlib.hash import bcrypt

app = FastAPI(title="TrackFlow API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(candidates_router)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/auth/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    user = get_user_by_email(str(payload.email))
    if not user or not bcrypt.verify(payload.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.get("is_active", False):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account is disabled")
    return TokenResponse(access_token=create_access_token(user["id"]))


@app.get("/auth/me")
def me(user: dict = Depends(__import__("backend.auth", fromlist=["get_current_user"]).get_current_user)):
    return public_user(user)