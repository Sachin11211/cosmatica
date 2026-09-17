"""
Cosmatica backend data models.
"""
import uuid
from datetime import datetime, timezone
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


def _now() -> datetime:
    return datetime.now(timezone.utc)


# ---------- Products & Categories ----------

class Category(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    tagline: str
    image: str
    color: str


class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: int
    name: str
    category: str
    price: int
    originalPrice: Optional[int] = None
    badge: Optional[str] = None
    image: str
    description: str


# ---------- Orders ----------

class OrderItem(BaseModel):
    id: int
    name: str
    price: int
    qty: int
    image: Optional[str] = None


class OrderCreate(BaseModel):
    customer_name: str
    phone: str
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    notes: Optional[str] = None
    items: List[OrderItem]
    subtotal: int


class Order(OrderCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "new"
    created_at: datetime = Field(default_factory=_now)


# ---------- Newsletter ----------

class NewsletterSubscribeCreate(BaseModel):
    email: EmailStr


class NewsletterSubscriber(NewsletterSubscribeCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    subscribed_at: datetime = Field(default_factory=_now)


# ---------- Contact ----------

class ContactMessageCreate(BaseModel):
    name: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    message: str


class ContactMessage(ContactMessageCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=_now)
    read: bool = False
