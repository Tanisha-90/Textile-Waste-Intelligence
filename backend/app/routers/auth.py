from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User

from app.schemas.user_schema import UserCreate, UserLogin

from app.utils.security import hash_password, verify_password
from app.utils.jwt_handler import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ----------------------------
# Register User
# ----------------------------
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    # Check if email already exists
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Hash password
    encrypted_password = hash_password(user.password)

    # Create new user
    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=encrypted_password,
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Registration Successful",
        "user_id": new_user.id
    }


# ----------------------------
# Login User
# ----------------------------
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    # Find user
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Verify password
    password_correct = verify_password(
        user.password,
        existing_user.password
    )

    if not password_correct:
        raise HTTPException(
            status_code=401,
            detail="Incorrect Password"
        )

    # Create JWT token
    token = create_access_token(
        {
            "user_id": existing_user.id,
            "email": existing_user.email,
            "role": existing_user.role
        }
    )

    return {
        "message": "Login Successful",
        "token": token,
        "role": existing_user.role,
        "name": existing_user.full_name,
        "email": user.email,
    }