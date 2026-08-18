from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from collections import Counter

from app.database import get_db

from app.models.waste_registration import WasteRegistration
from app.models.batch_management import BatchManagement
from app.models.collection_management import CollectionManagement
from app.models.sustainability import SustainabilityAnalysis

from app.utils.auth import get_current_user


router = APIRouter(
    prefix="/recycling-facility-dashboard",
    tags=["Recycling Facility Dashboard"],
    dependencies=[Depends(get_current_user)]
)


# =========================================================
# DASHBOARD SUMMARY
# =========================================================

@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db)):

    total_registrations = db.query(
        WasteRegistration
    ).count()

    total_batches = db.query(
        BatchManagement
    ).count()

    total_weight = db.query(
        func.sum(WasteRegistration.weight_kg)
    ).scalar() or 0

    total_quantity = db.query(
        func.sum(BatchManagement.total_quantity)
    ).scalar() or 0

    collected_batches = db.query(
        func.count(func.distinct(CollectionManagement.batch_id))
    ).scalar() or 0

    return {
        "total_registrations": total_registrations,
        "total_batches": total_batches,
        "total_weight": round(float(total_weight), 2),
        "total_quantity": round(float(total_quantity), 2),
        "collected_batches": collected_batches
    }


# =========================================================
# FABRIC-WISE INVENTORY
# =========================================================

@router.get("/inventory")
def inventory_data(db: Session = Depends(get_db)):

    data = db.query(
        WasteRegistration.fabric_type,
        func.sum(WasteRegistration.weight_kg)
    ).group_by(
        WasteRegistration.fabric_type
    ).all()

    return [
        {
            "fabric": fabric,
            "weight": round(float(weight or 0), 2)
        }
        for fabric, weight in data
    ]


# =========================================================
# RECYCLING OPPORTUNITIES
# =========================================================

@router.get("/opportunities")
def recycling_opportunities(db: Session = Depends(get_db)):

    waste = db.query(WasteRegistration).all()

    total = len(waste)

    recyclable = 0
    reusable = 0
    other = 0

    for item in waste:

        category = str(
            item.waste_category or ""
        ).lower()

        condition = str(
            item.condition or ""
        ).lower()

        # Recycling opportunity
        if (
            "recycl" in category
            or condition in ["good", "fair"]
        ):
            recyclable += 1

        # Reuse opportunity
        elif (
            "reuse" in category
            or condition == "good"
        ):
            reusable += 1

        else:
            other += 1

    return {
        "total": total,
        "recyclable": recyclable,
        "reusable": reusable,
        "other": other
    }


# =========================================================
# PROCESSING ANALYTICS
# =========================================================

@router.get("/processing")
def processing_analytics(db: Session = Depends(get_db)):

    waste = db.query(WasteRegistration).all()

    recyclable_weight = 0
    reusable_weight = 0
    other_weight = 0

    for item in waste:

        weight = float(item.weight_kg or 0)

        category = str(
            item.waste_category or ""
        ).lower()

        condition = str(
            item.condition or ""
        ).lower()

        if "recycl" in category:

            recyclable_weight += weight

        elif (
            "reuse" in category
            or condition == "good"
        ):

            reusable_weight += weight

        else:

            other_weight += weight

    return {
        "recyclable": round(recyclable_weight, 2),
        "reusable": round(reusable_weight, 2),
        "other": round(other_weight, 2)
    }
# =========================================================
# RECOVERY STATISTICS
# =========================================================

@router.get("/recovery")
def recovery_statistics(db: Session = Depends(get_db)):

    total_weight = db.query(
        func.sum(WasteRegistration.weight_kg)
    ).scalar() or 0

    recovered = db.query(
        func.sum(SustainabilityAnalysis.recovered_weight)
    ).scalar() or 0

    reused = db.query(
        func.sum(SustainabilityAnalysis.reused_weight)
    ).scalar() or 0

    total_weight = float(total_weight)
    recovered = float(recovered)
    reused = float(reused)

    # Recovery rate is based only on material recovered.
    # Reused material is reported separately.
    recovery_percentage = (
        (recovered / total_weight) * 100
        if total_weight > 0
        else 0
    )

    # Prevent impossible percentage caused by inconsistent
    # historical records.
    recovery_percentage = min(
        recovery_percentage,
        100
    )

    return {
        "total_weight": round(total_weight, 2),
        "recovered": round(recovered, 2),
        "reused": round(reused, 2),
        "recovery_percentage": round(
            recovery_percentage,
            2
        )
    }

