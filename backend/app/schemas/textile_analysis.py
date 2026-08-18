from pydantic import BaseModel


class TextileAnalysisCreate(BaseModel):

    user_id: int | None = None

    image_name: str

    image_path: str

    fabric_type: str

    material: str

    texture: str

    pattern: str

    color: str

    damage: str

    contamination: str

    fiber_composition: str

    blend: str

    quality: str

    category: str

    waste_category: str

    recyclability: str

    reuse_potential: str

    disposal_recommendation: str

    sustainability_status: str

    primary_action: str

    recycling_methods: str

    reuse_options: str

    recovery_method: str

    reduction_strategy: str