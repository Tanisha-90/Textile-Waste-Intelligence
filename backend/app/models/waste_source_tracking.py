from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Date
from datetime import date
from app.database import Base

class WasteSourceTracking(Base):
    __tablename__ = "waste_source_tracking"
    id = Column(Integer, primary_key=True, index=True)
    batch_id = Column(String)
    source = Column(String)
    remarks = Column(String)
    created_at = Column(Date, default=date.today)