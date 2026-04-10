FROM python:3.10

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

# Azure App Service sets WEBSITES_PORT; Container Apps often set PORT. Listen on whichever is provided.
EXPOSE 8000
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${WEBSITES_PORT:-${PORT:-8000}}"]