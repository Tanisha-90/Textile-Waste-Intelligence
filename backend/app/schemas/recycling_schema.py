from pydantic import BaseModel



class RecyclingRequest(BaseModel):

    material: str

    condition: str

    quantity: str