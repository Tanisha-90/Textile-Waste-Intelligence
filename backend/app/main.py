from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base
from app.database import engine
from app.routers import auth
from app.models.user import User
from app.routers import waste_registration
from app.routers import batch_management
from app.routers import collection_management
from app.routers import waste_source_tracking
from app.routers import inventory_monitoring
from app.routers import ai_classification
from app.models.textile_analysis import TextileAnalysis
from app.routers import dashboard
from app.routers import recycling
from app.sustainability.routes import router as sustainability_router
from app.environmental.routes import router as environmental_router
from app.routers.recycling_facility_dashboard import router as recycling_facility_dashboard_router
from app.routers.manufacturer_dashboard import router as manufacturer_dashboard_router
from app.routers.admin_dashboard import router as admin_dashboard_router
from app.routers.notification import router as notification_router

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="EcoWeave AI",
    version="1.0"
)
import os
FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "https://adaptable-nurturing-production-f09e.up.railway.app"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_URL,
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
# FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         FRONTEND_URL,
#         "http://localhost:5173",
#         "http://127.0.0.1:5173"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",
# 	"http://127.0.0.1:5173"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

app.include_router(auth.router)
app.include_router(waste_registration.router)
app.include_router(batch_management.router)
app.include_router(collection_management.router)
app.include_router(waste_source_tracking.router)
app.include_router(inventory_monitoring.router)
app.include_router(sustainability_router)
app.include_router(environmental_router)
app.include_router(
    recycling_facility_dashboard_router
)
app.include_router(
    manufacturer_dashboard_router
)
app.include_router(admin_dashboard_router)
app.include_router(notification_router)

@app.get("/")
def home():
    return {
        "message": "Backend Running Successfully"
    }
    
app.include_router(
    ai_classification.router,
    prefix="/ai",
    tags=["AI Classification"]
)   
app.include_router(
    dashboard.router
) 
app.include_router(recycling.router)

