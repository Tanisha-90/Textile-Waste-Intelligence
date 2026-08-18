from pydantic import BaseModel


class SustainabilityRequest(BaseModel):
   
    material: str

    weight: float

    recovered_weight: float = 0

    reused_weight: float = 0

    condition: str



class SustainabilityResponse(BaseModel):

    material: str

    weight: float

    carbon_footprint: float

    waste_diversion: float

    resource_recovery: float

    circularity_status: str

    benchmark_status: str


class SaveAnalysisRequest(BaseModel):

    # Waste Information
    material: str
    weight: float
    condition: str
    recovered_weight: float
    reused_weight: float

    # Module 1 - Sustainability Intelligence
    carbon_footprint: float
    waste_diversion: float
    resource_recovery: float
    circular_status: str
    benchmark: str

    # Module 2 - Environmental Impact
    co2_savings: float
    water_savings: float
    landfill_reduction: float
    resource_conservation: float
    environment_score: float

    # Module 3 - Waste Scoring
    recyclability_score: float
    recyclability_level: str
    reuse_score: float
    reuse_level: str
    sustainability_score: float
    sustainability_level: str
    material_recovery_score: float
    circularity_score: float
    circularity_category: str

    class Config:
        from_attributes = True

