
from sqlalchemy.orm import Session

from app.models.sustainability import SustainabilityAnalysis
from .calculations import (
    carbon_footprint,
    waste_diversion,
    resource_recovery,
    circularity,
    benchmark
)
from .fabric_mapping import get_fabric_id


def analyze_sustainability(data):


    carbon = carbon_footprint(
        data.material,
        data.weight
    )


    diversion = waste_diversion(
        data.weight,
        data.recovered_weight
    )


    recovery = resource_recovery(
        data.weight,
        data.recovered_weight
    )


    circular = circularity(
        data.condition,
        data.recovered_weight,
        data.reused_weight
    )


    bench = benchmark(
        data.material,
        recovery
    )
    return {

    "material": data.material,

    "weight": data.weight,

    "condition": data.condition,

    "recovered_weight": data.recovered_weight,

    "reused_weight": data.reused_weight,

    "carbon_footprint": carbon,

    "waste_diversion": diversion,

    "resource_recovery": recovery,
    
 
        
    "circular_status": circular,

    "benchmark": bench

}

  
def save_analysis_service(
        data,
        db: Session
):


    record = SustainabilityAnalysis(
        
        

        material=data.material,
        fabric_id=get_fabric_id(data.material),

        weight=data.weight,

        condition=data.condition,

        recovered_weight=data.recovered_weight,

        reused_weight=data.reused_weight,


        carbon_footprint=data.carbon_footprint,

        waste_diversion=data.waste_diversion,

        resource_recovery=data.resource_recovery,

        circular_status=data.circular_status,

        benchmark=data.benchmark,


        co2_savings=data.co2_savings,

        water_savings=data.water_savings,

        landfill_reduction=data.landfill_reduction,

        resource_conservation=data.resource_conservation,

        environment_score=data.environment_score,


        recyclability_score=data.recyclability_score,

        recyclability_level=data.recyclability_level,

        reuse_score=data.reuse_score,

        reuse_level=data.reuse_level,

        sustainability_score=data.sustainability_score,

        sustainability_level=data.sustainability_level,

        material_recovery_score=data.material_recovery_score,

        circularity_score=data.circularity_score,

        circularity_category=data.circularity_category

    )


    db.add(record)

    db.commit()

    db.refresh(record)


    return record    
    