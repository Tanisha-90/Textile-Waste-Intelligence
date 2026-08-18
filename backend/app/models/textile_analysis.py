from sqlalchemy import Column, Integer, String, Text, TIMESTAMP
from sqlalchemy.sql import func
from app.database import Base


class TextileAnalysis(Base):

    __tablename__ = "textile_analysis"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=True)

    image_name = Column(String(255))
    image_path = Column(String(255))

    fabric_type = Column(String(100))
    material = Column(String(100))
    texture = Column(String(100))
    pattern = Column(String(100))
    color = Column(String(100))

    damage = Column(String(100))
    contamination = Column(String(100))

    fiber_composition = Column(String(255))
    blend = Column(String(100))
    quality = Column(String(100))
    category = Column(String(100))

    waste_category = Column(String(100))
    recyclability = Column(String(100))
    reuse_potential = Column(String(100))
    disposal_recommendation = Column(Text)
    sustainability_status = Column(String(100))

    primary_action = Column(String(255))
    recycling_methods = Column(Text)
    reuse_options = Column(Text)
    recovery_method = Column(String(255))
    reduction_strategy = Column(Text)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )