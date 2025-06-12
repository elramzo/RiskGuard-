from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class InsuranceOfferBase(BaseModel):
    name: str
    price: float
    type: str
    coverage_amount: int
    currency: str = "EUR"
    duration: Optional[str] = None
    description: Optional[str] = None
    features: Optional[List[str]] = None

class InsuranceOfferCreate(InsuranceOfferBase):
    pass

class InsuranceOffer(InsuranceOfferBase):
    id: int
    created_at: datetime = datetime.now()

    class Config:
        from_attributes = True

# Модель для фильтрации
class InsuranceOfferFilter(BaseModel):
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    type: Optional[str] = None
    currency: Optional[str] = None
    min_coverage: Optional[int] = None 
