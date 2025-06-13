from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import InsuranceOffer, InsuranceOfferCreate, InsuranceOfferFilter
from db import Database

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL фронтенда
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Корень
@app.get("/")
def root():
    return {"message": "API работает ✅"}

# Получить все предложения
@app.get("/offers", response_model=list[InsuranceOffer])
def get_offers():
    try:
        return Database.get_all_offers()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Получить конкретное предложение
@app.get("/offers/{offer_id}", response_model=InsuranceOffer)
def get_offer(offer_id: int):
    try:
        offer = Database.get_offer_by_id(offer_id)
        if not offer:
            raise HTTPException(status_code=404, detail="Предложение не найдено")
        return offer
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Добавить новое предложение
@app.post("/offers", response_model=InsuranceOffer)
def add_offer(offer: InsuranceOfferCreate):
    try:
        return Database.create_offer(offer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Фильтрация предложений
@app.get("/offers/filter", response_model=list[InsuranceOffer])
def filter_offers(filter_params: InsuranceOfferFilter):
    try:
        return Database.filter_offers(filter_params)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Обновить предложение
@app.put("/offers/{offer_id}", response_model=InsuranceOffer)
def update_offer(offer_id: int, offer: InsuranceOfferCreate):
    try:
        updated_offer = Database.update_offer(offer_id, offer)
        if not updated_offer:
            raise HTTPException(status_code=404, detail="Предложение не найдено")
        return updated_offer
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Удалить предложение
@app.delete("/offers/{offer_id}")
def delete_offer(offer_id: int):
    try:
        if Database.delete_offer(offer_id):
            return {"message": "Предложение удалено"}
        raise HTTPException(status_code=404, detail="Предложение не найдено")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
