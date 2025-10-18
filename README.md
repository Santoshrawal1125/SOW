# Project Name — Mini App (SOW)

Short description
-----------------
This repository contains the mini app delivered for the SOW.  
It includes a separated frontend and backend:

- `/frontend` — Vite + React (vanilla JavaScript) + plain CSS  
- `/backend` — Django (Python) + PostgreSQL

This README documents the exact versions used, how to run locally. It also contains sample `.env` files.

---

Tech stack & versions 
-----------------------------------------------------------


### Frontend
- React: **19.2.0**
- react-dom: **19.2.0**
- react-router-dom: **7.9.4**
- Vite: **7.1.10**
- npm: **8.9.0**

- Styling: **Plain CSS**
- Language: **JavaScript (ES2022 recommended)**

### Backend
- Django: **5.0.3**
- Python: **3.11.3**
- Database: **PostgreSQL 17.5**


### 1) Install & run frontend(Windows Powershell example)
```powershell
# from repo root
cd frontend

# install dependencies
npm install

# run dev server (Vite)
npm run dev
```
### 2) Install & run backend(Windows Powershell example)
# create virtual env
```
python -m venv venv
\venv\Scripts\Activate (for windows)
\venv\bin\activate (for mac)
```
# 3)install requirements
pip install -r requirements.txt

# 4)run Django migrations
```
python manage.py makemigrations
python manage.py migrate
```
# 5)create a superuser for admin
```
python manage.py createsuperuser
```
# 6)run dev server
```
python manage.py runserver 0.0.0.0:8000
```
.env sample
```
DATABASE_NAME=sow_db
DATABASE_USER=sow_user
DATABASE_PASSWORD=YourDbPasswordHere
DATABASE_HOST=localhost
DATABASE_PORT=5432
