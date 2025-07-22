# RiskGuard - Insurance Aggregator Platform

## 🚀 О проекте

RiskGuard - это инновационная агрегационная платформа для сравнения и покупки страховых продуктов. Система предоставляет:

- 📊 Единый интерфейс для сравнения предложений от ведущих страховых компаний
- ⚡ Мгновенный расчет стоимости полисов
- 🤖 AI-ассистент для подбора оптимального страхового покрытия
- 🔒 Безопасное оформление договоров онлайн

## 🌟 Ключевые особенности

### Backend (Python/Node.js)
- RESTful API для интеграции с партнерами
- Система скоринга рисков с ML-моделями
- Интеграция с платежными системами
- Админ-панель для управления контентом

### Frontend (React/TypeScript)
- Адаптивный интерфейс с Material UI
- Интерактивные калькуляторы страховых продуктов
- Персонализированные рекомендации
- OAuth2 аутентификация

## 🛠 Технологический стек

| Компонент       | Технологии                     |
|-----------------|--------------------------------|
| **Frontend**    | React 18, TypeScript, Redux Toolkit, Material UI, Chart.js |
| **Backend**     | Python FastAPI/Node.js Express, PostgreSQL, Redis, Celery |
| **AI модули**   | Python, TensorFlow, NLP обработка запросов |
| **DevOps**      | Docker, GitHub Actions, AWS ECS, Terraform |

## 📦 Установка и запуск

```bash
# Клонирование репозитория
git clone https://github.com/elramzo/RiskGuard-.git
cd RiskGuard-

# Установка зависимостей
npm install
pip install -r requirements.txt

# Запуск dev-сервера
npm run dev
python app/main.py
