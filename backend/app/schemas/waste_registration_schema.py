from pydantic import BaseModel
from datetime import date

class WasteRegistrationCreate(BaseModel):
    fabric_type: str
    waste_category: str
    color: str
    condition: str
    quantity: int
    weight_kg: float
    # status: str

class WasteRegistrationResponse(BaseModel):
    id: int
    waste_registration_id: str
    fabric_type: str
    waste_category: str
    color: str
    condition: str
    quantity: int
    weight_kg: float
    image: str | None
    registration_date: date
    # status: str

    class Config:
        from_attributes = True