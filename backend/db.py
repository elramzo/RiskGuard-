from supabase import create_client, Client
from dotenv import load_dotenv
import os
from typing import List, Optional
from models import InsuranceOffer, InsuranceOfferCreate, InsuranceOfferFilter

# Загружаем переменные окружения
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("SUPABASE_URL или SUPABASE_KEY не заданы в .env")

# Инициализация клиента Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

class Database:
    @staticmethod
    def get_all_offers() -> List[InsuranceOffer]:
        """Получить все предложения страхования"""
        response = supabase.table("insurance_offers").select("*").execute()
        return [InsuranceOffer(**item) for item in response.data]

    @staticmethod
    def get_offer_by_id(offer_id: int) -> Optional[InsuranceOffer]:
        """Получить предложение по ID"""
        response = supabase.table("insurance_offers").select("*").eq("id", offer_id).execute()
        return InsuranceOffer(**response.data[0]) if response.data else None

    @staticmethod
    def create_offer(offer: InsuranceOfferCreate) -> InsuranceOffer:
        """Создать новое предложение"""
        response = supabase.table("insurance_offers").insert(offer.dict()).execute()
        return InsuranceOffer(**response.data[0])

    @staticmethod
    def filter_offers(filter_params: InsuranceOfferFilter) -> List[InsuranceOffer]:
        """Фильтрация предложений по параметрам"""
        query = supabase.table("insurance_offers").select("*")
        
        if filter_params.min_price is not None:
            query = query.gte("price", filter_params.min_price)
        if filter_params.max_price is not None:
            query = query.lte("price", filter_params.max_price)
        if filter_params.type is not None:
            query = query.eq("type", filter_params.type)
        if filter_params.currency is not None:
            query = query.eq("currency", filter_params.currency)
        if filter_params.min_coverage is not None:
            query = query.gte("coverage_amount", filter_params.min_coverage)
            
        response = query.execute()
        return [InsuranceOffer(**item) for item in response.data]

    @staticmethod
    def update_offer(offer_id: int, offer: InsuranceOfferCreate) -> Optional[InsuranceOffer]:
        """Обновить существующее предложение"""
        response = supabase.table("insurance_offers").update(offer.dict()).eq("id", offer_id).execute()
        return InsuranceOffer(**response.data[0]) if response.data else None

    @staticmethod
    def delete_offer(offer_id: int) -> bool:
        """Удалить предложение"""
        response = supabase.table("insurance_offers").delete().eq("id", offer_id).execute()
        return bool(response.data) 
