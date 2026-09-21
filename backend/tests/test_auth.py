import pytest
from uuid import uuid4
from passlib.hash import bcrypt
from backend.services import create_user, get_user_by_email, update_user, delete_user
from backend.models import UserCreate, UserUpdate


def test_create_user():
    email = f"test-{uuid4()}@example.com"
    user = create_user(UserCreate(email=email, password="secret1234"))
    assert user["email"] == email.lower()
    assert user["is_active"] is True
    assert bcrypt.verify("secret1234", user["hashed_password"])


def test_create_user_duplicate():
    email = f"dup-{uuid4()}@example.com"
    create_user(UserCreate(email=email, password="secret1234"))
    with pytest.raises(ValueError, match="Email is already registered"):
        create_user(UserCreate(email=email, password="otherpass"))


def test_get_user_by_email():
    email = f"get-{uuid4()}@example.com"
    create_user(UserCreate(email=email, password="secret1234"))
    user = get_user_by_email(email)
    assert user is not None
    assert user["email"] == email.lower()


def test_get_user_by_email_not_found():
    assert get_user_by_email("nobody@example.com") is None


def test_update_user_email():
    email = f"orig-{uuid4()}@example.com"
    user = create_user(UserCreate(email=email, password="secret1234"))
    new_email = f"upd-{uuid4()}@example.com"
    updated = update_user(user["id"], UserUpdate(email=new_email))
    assert updated is not None
    assert updated["email"] == new_email.lower()


def test_delete_user():
    email = f"del-{uuid4()}@example.com"
    user = create_user(UserCreate(email=email, password="secret1234"))
    assert delete_user(user["id"]) is True
    assert get_user_by_email(email) is None


def test_delete_user_not_found():
    assert delete_user("nonexistent-id") is False