from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Date
from datetime import date
from app.database import Base

class CollectionManagement(Base):
    __tablename__ = "collection_management"
    id = Column(Integer, primary_key=True, index=True)
    batch_id = Column(String)
    source_of_waste = Column(String)
    collection_location = Column(String)
    collection_date = Column(Date)
    created_at = Column(Date, default=date.today)