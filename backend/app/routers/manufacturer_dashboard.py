from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from collections import Counter

from app.database import get_db

from app.models.waste_registration import WasteRegistration
from app.models.sustainability import SustainabilityAnalysis

from app.utils.auth import get_current_user


router = APIRouter(
    prefix="/manufacturer-dashboard",
    tags=["Manufacturer Dashboard"],
    dependencies=[Depends(get_current_user)]
)


# =========================================================
# SUMMARY
# =========================================================

@router.get("/summary")
def manufacturer_summary(
    db: Session = Depends(get_db)
):

    total_records = db.query(
        WasteRegistration
    ).count()

    total_weight = db.query(
        func.sum(WasteRegistration.weight_kg)
    ).scalar() or 0

    total_carbon = db.query(
        func.sum(
            SustainabilityAnalysis.carbon_footprint
        )
    ).scalar() or 0

    total_co2_saved = db.query(
        func.sum(
            SustainabilityAnalysis.co2_savings
        )
    ).scalar() or 0

    total_water_saved = db.query(
        func.sum(
            SustainabilityAnalysis.water_savings
        )
    ).scalar() or 0

    average_circularity = db.query(
        func.avg(
            SustainabilityAnalysis.circularity_score
        )
    ).scalar() or 0

    average_sustainability = db.query(
        func.avg(
            SustainabilityAnalysis.sustainability_score
        )
    ).scalar() or 0

    return {

        "total_records": total_records,

        "total_weight": round(
            float(total_weight),
            2
        ),

        "total_carbon": round(
            float(total_carbon),
            2
        ),

        "total_co2_saved": round(
            float(total_co2_saved),
            2
        ),

        "total_water_saved": round(
            float(total_water_saved),
            2
        ),

        "average_circularity": round(
            float(average_circularity),
            2
        ),

        "average_sustainability": round(
            float(average_sustainability),
            2
        )
    }


# =========================================================
# PRODUCTION WASTE ANALYSIS
# =========================================================

@router.get("/production-waste")
def production_waste(
    db: Session = Depends(get_db)
):

    data = db.query(
        WasteRegistration.fabric_type,
        func.sum(
            WasteRegistration.weight_kg
        )
    ).group_by(
        WasteRegistration.fabric_type
    ).all()

    return [

        {
            "fabric": fabric,
            "weight": round(
                float(weight or 0),
                2
            )
        }

        for fabric, weight in data
    ]


# =========================================================
# WASTE CATEGORY
# =========================================================

@router.get("/waste-category")
def waste_category(
    db: Session = Depends(get_db)
):

    data = db.query(
        WasteRegistration.waste_category,
        func.count(WasteRegistration.id)
    ).group_by(
        WasteRegistration.waste_category
    ).all()

    return [

        {
            "category": category,
            "count": count
        }

        for category, count in data
    ]


# =========================================================
# CIRCULAR ECONOMY
# =========================================================

@router.get("/circular-economy")
def circular_economy(
    db: Session = Depends(get_db)
):

    recovered = db.query(
        func.sum(
            SustainabilityAnalysis.recovered_weight
        )
    ).scalar() or 0

    reused = db.query(
        func.sum(
            SustainabilityAnalysis.reused_weight
        )
    ).scalar() or 0

    waste_diversion = db.query(
        func.avg(
            SustainabilityAnalysis.waste_diversion
        )
    ).scalar() or 0

    return {

        "recovered": round(
            float(recovered),
            2
        ),

        "reused": round(
            float(reused),
            2
        ),

        "waste_diversion": round(
            float(waste_diversion),
            2
        )
    }


# =========================================================
# RECYCLE / REUSE / RECOVER SCORES
# =========================================================

@router.get("/scores")
def material_scores(
    db: Session = Depends(get_db)
):

    recyclability = db.query(
        func.avg(
            SustainabilityAnalysis.recyclability_score
        )
    ).scalar() or 0

    reuse = db.query(
        func.avg(
            SustainabilityAnalysis.reuse_score
        )
    ).scalar() or 0

    recovery = db.query(
        func.avg(
            SustainabilityAnalysis.material_recovery_score
        )
    ).scalar() or 0

    sustainability = db.query(
        func.avg(
            SustainabilityAnalysis.sustainability_score
        )
    ).scalar() or 0

    circularity = db.query(
        func.avg(
            SustainabilityAnalysis.circularity_score
        )
    ).scalar() or 0

    return {

        "recyclability": round(
            float(recyclability),
            2
        ),

        "reuse": round(
            float(reuse),
            2
        ),

        "recovery": round(
            float(recovery),
            2
        ),

        "sustainability": round(
            float(sustainability),
            2
        ),

        "circularity": round(
            float(circularity),
            2
        )
    }


# =========================================================
# FABRIC PERFORMANCE
# =========================================================

@router.get("/fabric-performance")
def fabric_performance(
    db: Session = Depends(get_db)
):

    data = db.query(
        SustainabilityAnalysis.material,

        func.sum(
            SustainabilityAnalysis.carbon_footprint
        ),

        func.sum(
            SustainabilityAnalysis.co2_savings
        ),

        func.sum(
            SustainabilityAnalysis.water_savings
        ),

        func.avg(
            SustainabilityAnalysis.circularity_score
        )

    ).group_by(
        SustainabilityAnalysis.material
    ).all()

    result = []

    for (
        material,
        carbon,
        co2_saved,
        water_saved,
        circularity
    ) in data:

        result.append({

            "material": material,

            "carbon": round(
                float(carbon or 0),
                2
            ),

            "co2_saved": round(
                float(co2_saved or 0),
                2
            ),

            "water_saved": round(
                float(water_saved or 0),
                2
            ),

            "circularity": round(
                float(circularity or 0),
                2
            )

        })

    return result