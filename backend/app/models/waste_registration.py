from sqlalchemy import Column, Integer, String, Float, Date
from datetime import date
from app.database import Base

class WasteRegistration(Base):
    __tablename__ = "waste_registration"
    id = Column(Integer, primary_key=True, index=True)
    waste_registration_id = Column(String, unique=True, nullable=False)
    
    fabric_type = Column(String, nullable=False)
    waste_category = Column(String, nullable=False)
    color = Column(String, nullable=False)
    condition = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    weight_kg = Column(Float, nullable=False)
    image = Column(String)
    registration_date = Column(Date, default=date.today)
    status = Column(String, default="Pending")