from fastapi import APIRouter

from .schemas import EnvironmentalRequest

from .calculations import (
    calculate_co2_savings,
    calculate_water_savings,
    calculate_landfill_reduction,
    calculate_resource_conservation,
    sustainability_score
)


router = APIRouter(
    prefix="/environmental",
    tags=["Environmental Impact"]
)



@router.post("/analyze")
def analyze_environment(
        data: EnvironmentalRequest
):


   
    co2_saved = calculate_co2_savings(
        data.material,
        data.weight,
        data.recovered_weight
    )

    water_saved = calculate_water_savings(
        data.material,
        data.weight,
        data.recovered_weight
    )
    
    landfill = calculate_landfill_reduction(
        data.weight,
        data.recovered_weight
    )


    resource_saved = calculate_resource_conservation(
        data.recovered_weight
    )


    score = sustainability_score(
        co2_saved,
        water_saved,
        landfill
    )


    return {


        "material": data.material,

        "total_waste":
        data.weight,


        "co2_savings":
        round(co2_saved,2),


        "water_savings":
        round(water_saved,2),


        "landfill_reduction":
        landfill,


        "resource_conservation":
        resource_saved,


        "sustainability_score":
        score,


        "recommendation":
        "Reuse and Recycling recommended"

    }


