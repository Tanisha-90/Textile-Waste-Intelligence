from pydantic import BaseModel
from datetime import date

class CollectionCreate(BaseModel):
    batch_id: str
    source_of_waste: str
    collection_location: str
    collection_date: date

class CollectionResponse(BaseModel):
    id: int
    batch_id: str
    source_of_waste: str
    collection_location: str
    collection_date: date

    class Config:
        from_attributes = True