from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.textile_analysis import TextileAnalysis


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)



@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db)
):


    total_analysis = db.query(
        func.count(TextileAnalysis.id)
    ).scalar()



    recyclable = db.query(
    func.count(TextileAnalysis.id)
).filter(
    TextileAnalysis.recyclability != "Low"
).scalar()



    reusable = db.query(
    func.count(TextileAnalysis.id)
).filter(
    TextileAnalysis.reuse_potential != "Low"
).scalar()



    waste_data = db.query(
        TextileAnalysis.waste_category,
        func.count(TextileAnalysis.id)
    ).group_by(
        TextileAnalysis.waste_category
    ).all()



    recent = db.query(
        TextileAnalysis
    ).order_by(
        TextileAnalysis.id.desc()
    ).limit(5).all()



    return {


        "total_analysis": total_analysis or 0,


        "recyclable": recyclable or 0,


        "reusable": reusable or 0,


        "waste_category":[

            {
                "category":row[0],
                "count":row[1]
            }

            for row in waste_data

        ],



        "recent":[

            {
                "id":item.id,
                "image":item.image_name,
                "material":item.material,
                "waste":item.waste_category,
                "status":item.sustainability_status
            }

            for item in recent

        ]

    }