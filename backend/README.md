# TrackFlow Backend

FastAPI + TinyDB backend for authentication and candidate CRUD.

## Setup

```bash
cd backend
cp .env.example .env   # then edit JWT_SECRET_KEY
pip install -r requirements.txt
uvicorn main:app --reload
```

## API

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/health` | GET | — | Health check |
| `/auth/login` | POST | — | Returns JWT Bearer token |
| `/auth/me` | GET | 🔒 | Current user profile |
| `/candidates/` | GET | 🔒 | List candidates |
| `/candidates/` | POST | 🔒 | Create candidate |
| `/candidates/{id}` | GET | 🔒 | Get candidate |
| `/candidates/{id}` | PATCH | 🔒 | Update candidate |
| `/candidates/{id}` | DELETE | 🔒 | Delete candidate |
| `/candidates/{id}/notes` | GET | 🔒 | List notes |
| `/candidates/{id}/notes` | POST | 🔒 | Add note |
| `/candidates/{id}/notes/{noteId}` | DELETE | 🔒 | Delete note |

🔒 = requires `Authorization: Bearer <token>`