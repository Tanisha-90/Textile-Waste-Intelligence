
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from fastapi.responses import FileResponse
import uuid
import os
from app.models.sustainability import SustainabilityAnalysis

from app.pdf_generator.pdf_service import generate_pdf
from app.reports.excel_generator import generate_excel
from .schemas import (
    SustainabilityRequest,
    SaveAnalysisRequest
)

from .service import (
    analyze_sustainability,
    save_analysis_service
)
# from .schemas import SustainabilityRequest
# from .service import analyze_sustainability
from app.sustainability.waste_score_engine import calculate_waste_score
from app.models.sustainability import SustainabilityAnalysis




router = APIRouter(
    prefix="/sustainability",
    tags=["Sustainability"]
)



@router.post("/analyze")
def analyze(data:SustainabilityRequest):

    result = analyze_sustainability(data)

    return result

@router.post("/waste-score")
def generate_waste_score(data:dict):


    result = calculate_waste_score(

        material=data["material"],

        weight=data["weight"],

        condition=data["condition"],

        recovered_quantity=data["recovered_quantity"],

        reused_quantity=data["reused_quantity"]

    )


    return result
@router.post("/save-analysis")
def save_analysis(
    data:SaveAnalysisRequest,
    db:Session=Depends(get_db)
):


    record = save_analysis_service(
        data,
        db
    )


    return {

        "message":"Analysis saved successfully",

         "id":record.id

    }
   
@router.get("/analysis-history")
def get_history(
    db:Session=Depends(get_db)
):


    records = db.query(
        SustainabilityAnalysis
    ).all()


    return records
@router.get("/analysis/{analysis_id}")
def get_analysis_by_id(
    analysis_id:int,
    db:Session=Depends(get_db)
):


    record = db.query(
        SustainabilityAnalysis
    ).filter(
        SustainabilityAnalysis.id == analysis_id
    ).first()


    if record is None:

        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )


    return record
@router.post("/generate-pdf")
def generate_analysis_pdf(data:dict):


    filename = (
        f"sustainability_report_{uuid.uuid4()}.pdf"
    )


    path = os.path.join(
        "reports",
        filename
    )


    os.makedirs(
        "reports",
        exist_ok=True
    )


    generate_pdf(
        data,
        path
    )


    return FileResponse(

        path,

        media_type="application/pdf",

        filename=filename

    )

@router.delete("/delete-analysis/{analysis_id}")
def delete_analysis(
    analysis_id:int,
    db:Session=Depends(get_db)
):

    record=db.query(
        SustainabilityAnalysis
    ).filter(
        SustainabilityAnalysis.id==analysis_id
    ).first()

    if not record:

        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    db.delete(record)

    db.commit()

    return {
        "message":"Deleted Successfully"
    }    







@router.get("/dashboard-summary")
def sustainability_dashboard(
    db:Session = Depends(get_db)
):


    total_analysis = db.query(
        func.count(SustainabilityAnalysis.id)
    ).scalar() or 0



    total_carbon = db.query(
        func.sum(
            SustainabilityAnalysis.carbon_footprint
        )
    ).scalar() or 0



    total_co2_saved = db.query(
        func.sum(
            SustainabilityAnalysis.co2_savings
        )
    ).scalar() or 0



    total_water_saved = db.query(
        func.sum(
            SustainabilityAnalysis.water_savings
        )
    ).scalar() or 0



    avg_circularity = db.query(
        func.avg(
            SustainabilityAnalysis.circularity_score
        )
    ).scalar() or 0



    avg_sustainability = db.query(
        func.avg(
            SustainabilityAnalysis.sustainability_score
        )
    ).scalar() or 0



    return {

        "total_analysis": total_analysis,

        "total_carbon": round(total_carbon,2),

        "total_co2_saved": round(total_co2_saved,2),

        "total_water_saved": round(total_water_saved,2),

        "average_circularity": round(avg_circularity,2),

        "average_sustainability": round(avg_sustainability,2)

    }


@router.get("/fabric-analysis")
def fabric_analysis(
    db:Session = Depends(get_db)
):


    data = db.query(

        SustainabilityAnalysis.fabric_id,

        SustainabilityAnalysis.material,


        func.sum(
            SustainabilityAnalysis.weight
        ).label("total_weight"),


        func.sum(
            SustainabilityAnalysis.carbon_footprint
        ).label("carbon"),


        func.sum(
            SustainabilityAnalysis.co2_savings
        ).label("co2_saved"),


        func.sum(
            SustainabilityAnalysis.water_savings
        ).label("water_saved"),


        func.avg(
            SustainabilityAnalysis.circularity_score
        ).label("circularity")


    ).group_by(

        SustainabilityAnalysis.fabric_id,

        SustainabilityAnalysis.material

    ).all()



    result=[]


    for row in data:


        result.append({

            "fabric_id": row.fabric_id,

            "fabric": row.material,

            "weight": round(row.total_weight,2),

            "carbon": round(row.carbon,2),

            "co2_saved": round(row.co2_saved,2),

            "water_saved": round(row.water_saved,2),

            "circularity": round(row.circularity,2)

        })


    return result   
@router.get("/waste-diversion")
def waste_diversion_analysis(
    db:Session = Depends(get_db)
):


    data = db.query(

        SustainabilityAnalysis.material,


        func.sum(
            SustainabilityAnalysis.weight
        ).label("total_weight"),


        func.sum(
            SustainabilityAnalysis.recovered_weight
        ).label("recovered"),


        func.sum(
            SustainabilityAnalysis.reused_weight
        ).label("reused"),


        func.avg(
            SustainabilityAnalysis.waste_diversion
        ).label("diversion"),


        func.avg(
            SustainabilityAnalysis.landfill_reduction
        ).label("landfill_reduction")


    ).group_by(
        SustainabilityAnalysis.material
    ).all()



    result=[]


    for row in data:


        result.append({

            "fabric":row.material,

            "total_weight":
            round(row.total_weight or 0,2),


            "recovered":
            round(row.recovered or 0,2),


            "reused":
            round(row.reused or 0,2),


            "waste_diversion":
            round(row.diversion or 0,2),


            "landfill_reduction":
            round(row.landfill_reduction or 0,2)

        })


    return result
@router.get("/esg-report")
def esg_report(
    db:Session = Depends(get_db)
):


    total_records = db.query(
        func.count(SustainabilityAnalysis.id)
    ).scalar() or 0



    total_recovered = db.query(
        func.sum(
            SustainabilityAnalysis.recovered_weight
        )
    ).scalar() or 0



    avg_environment = db.query(
        func.avg(
            SustainabilityAnalysis.environment_score
        )
    ).scalar() or 0



    avg_waste = db.query(
        func.avg(
            SustainabilityAnalysis.waste_diversion
        )
    ).scalar() or 0



    avg_circularity = db.query(
        func.avg(
            SustainabilityAnalysis.circularity_score
        )
    ).scalar() or 0



    total_water = db.query(
        func.sum(
            SustainabilityAnalysis.water_savings
        )
    ).scalar() or 0



    total_co2 = db.query(
        func.sum(
            SustainabilityAnalysis.co2_savings
        )
    ).scalar() or 0



    return {


        "environment":{

            "co2_saved":
            round(total_co2,2),

            "water_saved":
            round(total_water,2),

            "waste_diversion":
            round(avg_waste,2),

            "circularity":
            round(avg_circularity,2)

        },


        "social":{

            "total_analysis":
            total_records,

            "material_recovered":
            round(total_recovered,2)

        },


        "governance":{

            "reports_generated":
            total_records,

            "monitoring":
            "Active"

        }

    }
@router.post("/generate-excel")
def generate_analysis_excel(data: dict):

    try:

        report = data.get("report")

        if report is None:
            raise HTTPException(
                status_code=400,
                detail="Report data missing"
            )

        file_path = generate_excel(report)

        return FileResponse(
            path=file_path,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            filename="Sustainability_Report.xlsx"
        )

    except Exception as e:

        print("EXCEL ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        ) 
