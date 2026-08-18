from pydantic import BaseModel

class BatchCreate(BaseModel):
    batch_type: str
    batch_fabric: str
    total_quantity: int

class BatchResponse(BaseModel):
    id: int
    batch_id: str
    batch_type: str
    batch_fabric: str
    total_quantity: int

    class Config:
        from_attributes = True           