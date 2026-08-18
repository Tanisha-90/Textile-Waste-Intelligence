from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from collections import Counter


from app.models.waste_registration import WasteRegistration
from app.models.batch_management import BatchManagement
from app.models.collection_management import CollectionManagement
from app.models.waste_source_tracking import WasteSourceTracking
from app.utils.auth import get_current_user

router = APIRouter(
    prefix="/inventory",
    tags=["Inventory Monitoring"],
    dependencies=[Depends(get_current_user)]
)


# ---------------------------------------------------------
# Dashboard Summary
# ---------------------------------------------------------

@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):

    total_registrations = db.query(
        WasteRegistration
    ).count()

    total_batches = db.query(
        BatchManagement
    ).count()

    total_quantity = db.query(
        func.sum(BatchManagement.total_quantity)
    ).scalar() or 0

    total_weight = db.query(
        func.sum(WasteRegistration.weight_kg)
    ).scalar() or 0

    total_locations = db.query(
        func.count(
            func.distinct(
                CollectionManagement.collection_location
            )
        )
    ).scalar() or 0

    return {
        "total_registrations": total_registrations,
        "total_batches": total_batches,
        "total_quantity": total_quantity,
        "total_weight": total_weight,
        "total_locations": total_locations
    }


# ---------------------------------------------------------
# Fabric Wise Summary
# ---------------------------------------------------------

@router.get("/fabric-summary")
def fabric_summary(db: Session = Depends(get_db)):

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
            "quantity": quantity
        })

    return result


# ---------------------------------------------------------
# Collection Location Summary
# ---------------------------------------------------------

@router.get("/location-summary")
def location_summary(db: Session = Depends(get_db)):

    data = db.query(
        CollectionManagement.collection_location,
        func.count(CollectionManagement.id)
    ).group_by(
        CollectionManagement.collection_location
    ).all()

    result = []

    for location, total in data:

        result.append({
            "location": location,
            "collections": total
        })

    return result


# ---------------------------------------------------------
# Waste Source Summary
# ---------------------------------------------------------

@router.get("/source-summary")
def source_summary(db: Session = Depends(get_db)):

    data = db.query(
        WasteSourceTracking.source,
        func.count(WasteSourceTracking.id)
    ).group_by(
        WasteSourceTracking.source
    ).all()

    result = []

    for source, total in data:

        result.append({
            "source": source,
            "count": total
        })

    return result
#chart
@router.get("/chart-data")
def get_chart_data(
    db: Session = Depends(get_db)
):

    waste = db.query(WasteRegistration).all()

    collections = db.query(CollectionManagement).all()

    fabric_counter = Counter(
        item.fabric_type for item in waste
    )

    category_counter = Counter(
        item.waste_category for item in waste
    )

    location_counter = Counter(
        item.collection_location for item in collections
    )

    fabric_data = [
        {
            "name": k,
            "value": v
        }
        for k, v in fabric_counter.items()
    ]

    waste_data = [
        {
            "category": k,
            "quantity": v
        }
        for k, v in category_counter.items()
    ]

    location_data = [
        {
            "location": k,
            "count": v
        }
        for k, v in location_counter.items()
    ]

    return {

        "fabricData": fabric_data,

        "wasteData": waste_data,

        "locationData": location_data

    }

# ---------------------------------------------------------
# Recent Waste Registrations
# ---------------------------------------------------------

@router.get("/recent-registrations")
def recent_registrations(db: Session = Depends(get_db)):

    return db.query(
        WasteRegistration
    ).order_by(
        WasteRegistration.id.desc()
    ).limit(5).all()


# ---------------------------------------------------------
# Recent Collections
# ---------------------------------------------------------

@router.get("/recent-collections")
def recent_collections(db: Session = Depends(get_db)):

    return db.query(
        CollectionManagement
    ).order_by(
        CollectionManagement.id.desc()
    ).limit(5).all()


# ---------------------------------------------------------
# Recent Waste Sources
# ---------------------------------------------------------

@router.get("/recent-sources")
def recent_sources(db: Session = Depends(get_db)):

    return db.query(
        WasteSourceTracking
    ).order_by(
        WasteSourceTracking.id.desc()
    ).limit(5).all()


# ---------------------------------------------------------
# Batch Activity
# ---------------------------------------------------------

@router.get("/batch-activity")
def batch_activity(db: Session = Depends(get_db)):

    data = db.query(
        BatchManagement.batch_id,
        BatchManagement.batch_fabric,
        BatchManagement.total_quantity
    ).order_by(
        BatchManagement.id.desc()
    ).all()

    result = []

    for batch_id, fabric, quantity in data:

        result.append({
            "batch_id": batch_id,
            "fabric": fabric,
            "quantity": quantity
        })

    return result