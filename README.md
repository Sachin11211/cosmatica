# Cosmatica

Jewelry, cosmetics, and gifting — Cosmatica, Suraj Complex, Bartand, Dhanbad.

Live site: https://cosmatica.onrender.com/api/ (backend) · [add your Netlify URL here]

## Stack

- **Frontend:** React + Craco, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** FastAPI + MongoDB (Motor)
- **Hosting:** Netlify (frontend) · Render (backend) · MongoDB Atlas (database)

## Local development

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python seed_data.py      # loads the product catalog into MongoDB, once
uvicorn server:app --reload --port 8001
```

### Frontend
```bash
cd frontend
yarn install
yarn start
```

Both need their own `.env` file (not committed — see `.env.example` conventions):

**backend/.env**
```
MONGO_URL="your-mongodb-connection-string"
DB_NAME="cosmatica"
CORS_ORIGINS="*"
EMAIL_ADDRESS="youraddress@gmail.com"
EMAIL_APP_PASSWORD="your-gmail-app-password"
```

**frontend/.env**
```
REACT_APP_BACKEND_URL=http://localhost:8001
```
