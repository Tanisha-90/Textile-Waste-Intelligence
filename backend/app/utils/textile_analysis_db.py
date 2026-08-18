from sqlalchemy.orm import Session
from app.models.textile_analysis import TextileAnalysis


def save_analysis(db: Session, analysis):

    record = TextileAnalysis(

        user_id=analysis["user_id"],

        image_name=analysis["image_name"],
        image_path=analysis["image_path"],

        fabric_type=analysis["fabric_type"],
        material=analysis["material"],
        texture=analysis["texture"],
        pattern=analysis["pattern"],
        color=analysis["color"],

        damage=analysis["damage"],
        contamination=analysis["contamination"],

        fiber_composition=analysis["fiber_composition"],
        blend=analysis["blend"],
        quality=analysis["quality"],
        category=analysis["category"],

        waste_category=analysis["waste_category"],
        recyclability=analysis["recyclability"],
        reuse_potential=analysis["reuse_potential"],
        disposal_recommendation=analysis["disposal_recommendation"],
        sustainability_status=analysis["sustainability_status"],

        primary_action=analysis["primary_action"],
        recycling_methods=analysis["recycling_methods"],
        reuse_options=analysis["reuse_options"],
        recovery_method=analysis["recovery_method"],
        reduction_strategy=analysis["reduction_strategy"]

    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return record