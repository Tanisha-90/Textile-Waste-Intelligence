from sqlalchemy import Column,Integer,Float,String,DateTime
from app.database import Base
from datetime import datetime



class SustainabilityAnalysis(Base):

    __tablename__="sustainability_analysis"


    id=Column(Integer,primary_key=True)


    material=Column(String)
    fabric_id = Column(Integer)
    weight=Column(Float)

    condition=Column(String)

    recovered_weight=Column(Float)

    reused_weight=Column(Float)



    carbon_footprint=Column(Float)

    waste_diversion=Column(Float)

    resource_recovery=Column(Float)

    circular_status=Column(String)

    benchmark=Column(String)



    co2_savings=Column(Float)

    water_savings=Column(Float)

    landfill_reduction=Column(Float)

    resource_conservation=Column(Float)

    environment_score=Column(Float)



    recyclability_score=Column(Float)

    recyclability_level=Column(String)

    reuse_score=Column(Float)

    reuse_level=Column(String)

    sustainability_score=Column(Float)

    sustainability_level=Column(String)

    material_recovery_score=Column(Float)

    circularity_score=Column(Float)

    circularity_category=Column(String)



    created_at=Column(
        DateTime,
        default=datetime.utcnow
    )