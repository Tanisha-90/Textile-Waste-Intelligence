from pydantic import BaseModel

class WasteSourceCreate(BaseModel):
    batch_id: str
    source: str
    remarks: str

class WasteSourceResponse(BaseModel):
    id: int
    batch_id: str
    source: str
    remarks: str

    class Config:
        from_attributes = True