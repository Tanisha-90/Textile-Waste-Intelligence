from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Date
from datetime import date
from app.database import Base

class BatchManagement(Base):
    __tablename__ = "batch_management"
    id = Column(Integer, primary_key=True, index=True)
    batch_id = Column(String)
    batch_type = Column(String)
    batch_fabric = Column(String)
    total_quantity = Column(Integer)
    created_at = Column(Date, default=date.today)