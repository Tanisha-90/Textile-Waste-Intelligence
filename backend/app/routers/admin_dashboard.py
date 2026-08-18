from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from collections import Counter

from app.database import get_db
from app.models.waste_registration import WasteRegistration
from app.models.batch_management import BatchManagement
from app.models.collection_management import CollectionManagement
from app.models.waste_source_tracking import WasteSourceTracking

from app.utils.auth import get_current_user


router = APIRouter(
    prefix="/admin",
    tags=["Admin Dashboard"],
    dependencies=[Depends(get_current_user)]
)


# =========================================================
# ADMIN OVERVIEW
# =========================================================

@router.get("/dashboard")
def admin_dashboard(db: Session = Depends(get_db)):

    total_waste_records = db.query(
        WasteRegistration
    ).count()

    total_batches = db.query(
        BatchManagement
    ).count()

    total_collections = db.query(
        CollectionManagement
    ).count()

    total_sources = db.query(
        WasteSourceTracking
    ).count()

    total_weight = db.query(
        func.sum(WasteRegistration.weight_kg)
    ).scalar() or 0

    total_quantity = db.query(
        func.sum(WasteRegistration.quantity)
    ).scalar() or 0

    return {
        "total_waste_records": total_waste_records,
        "total_batches": total_batches,
        "total_collections": total_collections,
        "total_sources": total_sources,
        "total_weight": round(float(total_weight), 2),
        "total_quantity": total_quantity
    }


# =========================================================
# FABRIC ANALYSIS
# =========================================================

@router.get("/fabric-analysis")
def fabric_analysis(db: Session = Depends(get_db)):

    data = db.query(
        WasteRegistration.fabric_type,
        func.sum(WasteRegistration.weight_kg)
    ).group_by(
        WasteRegistration.fabric_type
    ).all()

    result = []

    for fabric, weight in data:

        result.append({
            "fabric": fabric,
            "weight": round(float(weight or 0), 2)
        })

    return result


# =========================================================
# WASTE CATEGORY ANALYSIS
# =========================================================

@router.get("/waste-category")
def waste_category(db: Session = Depends(get_db)):

    data = db.query(
        WasteRegistration.waste_category,
        func.count(WasteRegistration.id)
    ).group_by(
        WasteRegistration.waste_category
    ).all()

    result = []

    for category, count in data:

        result.append({
            "category": category,
            "count": count
        })

    return result


# =========================================================
# COLLECTION LOCATION ANALYSIS
# =========================================================

@router.get("/collection-locations")
def collection_locations(db: Session = Depends(get_db)):

    data = db.query(
        CollectionManagement.collection_location,
        func.count(CollectionManagement.id)
    ).group_by(
        CollectionManagement.collection_location
    ).all()

    result = []

    for location, count in data:

        result.append({
            "location": location,
            "count": count
        })

    return result


# =========================================================
# WASTE SOURCE ANALYSIS
# =========================================================

@router.get("/waste-sources")
def waste_sources(db: Session = Depends(get_db)):

    data = db.query(
        WasteSourceTracking.source,
        func.count(WasteSourceTracking.id)
    ).group_by(
        WasteSourceTracking.source
    ).all()

    result = []

    for source, count in data:

        result.append({
            "source": source,
            "count": count
        })

    return result


# =========================================================
# BATCH ANALYSIS
# =========================================================

@router.get("/batch-analysis")
def batch_analysis(db: Session = Depends(get_db)):

    data = db.query(
        BatchManagement.batch_fabric,
        func.sum(BatchManagement.total_quantity)
    ).group_by(
        BatchManagement.batch_fabric
    ).all()

    result = []

    for fabric, quantity in data:

        result.append({
            "fabric": fabric,
            "quantity": round(float(quantity or 0), 2)
        })

    return result