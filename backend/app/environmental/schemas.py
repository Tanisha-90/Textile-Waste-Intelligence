from pydantic import BaseModel


class EnvironmentalRequest(BaseModel):

    material: str
    weight: float

    recovered_weight: float = 0
    reused_weight: float = 0