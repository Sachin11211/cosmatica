import logging
import os
from pathlib import Path
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, BackgroundTasks, FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from starlette.middleware.cors import CORSMiddleware

from email_utils import send_contact_notification, send_newsletter_welcome, send_order_confirmation
from models import (
    Category,
    ContactMessage,
    ContactMessageCreate,
    NewsletterSubscribeCreate,
    NewsletterSubscriber,
    Order,
    OrderCreate,
    Product,
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Cosmatica API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Health
# ---------------------------------------------------------------------------

@api_router.get("/")
async def root():
    return {"message": "Cosmatica API is running"}


# ---------------------------------------------------------------------------
# Categories & Products
# (Falls back to seed_data.py's static list if the DB hasn't been seeded yet,
# so the site never shows an empty catalog by accident.)
# ---------------------------------------------------------------------------

@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    categories = await db.categories.find({}, {"_id": 0}).to_list(1000)
    if not categories:
        from seed_data import CATEGORIES
        return CATEGORIES
    return categories


@api_router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None):
    query = {"category": category} if category else {}
    products = await db.products.find(query, {"_id": 0}).to_list(1000)
    if not products:
        from seed_data import PRODUCTS
        products = PRODUCTS
        if category:
            products = [p for p in products if p["category"] == category]
    return products


@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: int):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        from seed_data import PRODUCTS
        product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


# ---------------------------------------------------------------------------
# Orders
# ---------------------------------------------------------------------------

@api_router.post("/orders", response_model=Order)
async def create_order(payload: OrderCreate, background_tasks: BackgroundTasks):
    order = Order(**payload.model_dump())
    doc = order.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.orders.insert_one(doc)
    logger.info(f"New order {order.id} from {order.customer_name} — ₹{order.subtotal}")
    if order.email:
        background_tasks.add_task(
            send_order_confirmation, order.email, order.customer_name, doc["items"], order.subtotal
        )
    return order


@api_router.get("/orders", response_model=List[Order])
async def list_orders():
    """Simple listing for the shop owner. No auth yet — see README notes before
    exposing this publicly."""
    orders = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return orders


# ---------------------------------------------------------------------------
# Newsletter
# ---------------------------------------------------------------------------

@api_router.post("/newsletter", response_model=NewsletterSubscriber)
async def subscribe_newsletter(payload: NewsletterSubscribeCreate, background_tasks: BackgroundTasks):
    existing = await db.newsletter_subscribers.find_one({"email": payload.email})
    if existing:
        existing.pop("_id", None)
        return existing
    sub = NewsletterSubscriber(**payload.model_dump())
    doc = sub.model_dump()
    doc["subscribed_at"] = doc["subscribed_at"].isoformat()
    await db.newsletter_subscribers.insert_one(doc)
    background_tasks.add_task(send_newsletter_welcome, sub.email)
    return sub


# ---------------------------------------------------------------------------
# Contact
# ---------------------------------------------------------------------------

@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact(payload: ContactMessageCreate, background_tasks: BackgroundTasks):
    msg = ContactMessage(**payload.model_dump())
    doc = msg.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.contact_messages.insert_one(doc)
    logger.info(f"New contact message from {msg.name}")
    background_tasks.add_task(send_contact_notification, msg.name, msg.phone, msg.email, msg.message)
    return msg


# ---------------------------------------------------------------------------

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
