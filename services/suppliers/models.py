from pydantic import BaseModel, Field
from enum import Enum


class SupplierStatus(str, Enum):
    ACTIVE = "active"
    SUSPENDED = "suspended"


class SupplierInput(BaseModel):
    name: str = Field(min_length=2)
    country: str = Field(min_length=2)
    product_categories: list[str] = Field(min_length=1)
    rate: float = Field(gt=0)
    status: SupplierStatus = SupplierStatus.ACTIVE


class Supplier(SupplierInput):
    id: int
    updated_at: str


class RateUpdate(BaseModel):
    rate: float = Field(gt=0)


class StatusUpdate(BaseModel):
    status: SupplierStatus