from fastapi import APIRouter

from app.schemas.recycling_schema import RecyclingRequest

from ai.recycling_engine import generate_recycling_recommendation



router = APIRouter(
    prefix="/recycling",
    tags=["Recycling Recommendation"]
)



@router.post("/recommend")
def recommend(data: RecyclingRequest):


    result = generate_recycling_recommendation(

        data.material,
        data.condition,
        data.quantity

    )


    return result