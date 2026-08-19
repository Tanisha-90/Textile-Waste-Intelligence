from fastapi import APIRouter,UploadFile,File,HTTPException
from PIL import Image
from ai.material_classifier import analyze_material
from ai.waste_classification import classify_waste
from ai.recommendation_engine import generate_recommendation
from app.reports.report_generator import generate_report
from app.reports.pdf_generator import create_pdf
from app.reports.excel_generator import generate_excel
from fastapi.responses import FileResponse
# from ai.waste_classification import classify_waste
from fastapi import Depends
from sqlalchemy.orm import Session
from app.ai.clip_fabric_classifier import predict_fabric
from app.database import get_db
from app.utils.textile_analysis_db import save_analysis

import os
import shutil
import cv2
import numpy as np
def analyze_texture(image_path):

    img=cv2.imread(image_path)

    gray=cv2.cvtColor(
        img,
        cv2.COLOR_BGR2GRAY
    )

    texture_score=np.std(gray)

    if texture_score<30:
        return "Smooth"

    elif texture_score<60:
        return "Medium Texture"

    else:
        return "Rough"
def analyze_pattern(image_path):

    img=cv2.imread(image_path)

    gray=cv2.cvtColor(
        img,
        cv2.COLOR_BGR2GRAY
    )

    edges=cv2.Canny(
        gray,
        100,
        200
    )

    edge_density=np.mean(edges)

    if edge_density<10:
        return "Plain"

    elif edge_density<25:
        return "Striped"

    else:
        return "Printed/Textured"  
def analyze_damage(image_path):

    img=cv2.imread(image_path)

    gray=cv2.cvtColor(
        img,
        cv2.COLOR_BGR2GRAY
    )

    blur=cv2.GaussianBlur(
        gray,
        (5,5),
        0
    )

    edges=cv2.Canny(
        blur,
        100,
        200
    )

    contours,_=cv2.findContours(
        edges,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    damage_area=0

    for contour in contours:
        area=cv2.contourArea(contour)

        if area>1500:
            damage_area+=area


    image_area=gray.shape[0]*gray.shape[1]

    damage_percentage=(damage_area/image_area)*100


    if damage_percentage<1:
        return "No Damage"

    elif damage_percentage<5:
        return "Minor Tear"

    else:
        return "Heavy Damage"  
    
def analyze_contamination(image_path):

    img = cv2.imread(image_path)

    hsv = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2HSV
    )


    # Calculate color consistency
    pixels = hsv.reshape(-1,3)


    mean_color = np.mean(
        pixels,
        axis=0
    )


    difference = np.linalg.norm(
        pixels - mean_color,
        axis=1
    )


    abnormal_pixels = np.sum(
        difference > 45
    )


    total_pixels = len(pixels)


    abnormal_percentage = (
        abnormal_pixels / total_pixels
    ) * 100



    # Detect stain-like regions

    gray = cv2.cvtColor(
        img,
        cv2.COLOR_BGR2GRAY
    )


    blur = cv2.GaussianBlur(
        gray,
        (5,5),
        0
    )


    edges = cv2.Canny(
        blur,
        50,
        150
    )


    edge_density = np.mean(edges)



    # Decision rules

    if abnormal_percentage > 35 and edge_density > 20:

        return "Heavy Contamination"


    elif abnormal_percentage > 18:

        return "Minor Contamination"


    else:

        return "None"   
    
    
 





def analyze_fabric(image_path):

    img=cv2.imread(image_path)

    gray=cv2.cvtColor(
        img,
        cv2.COLOR_BGR2GRAY
    )

    texture_score=np.std(gray)

    avg_color=np.mean(
        img,
        axis=(0,1)
    )

    b,g,r=avg_color
    if texture_score > 70 and b < 120:

        fabric="Denim"
        material="Cotton Blend"


    # Smooth shiny fabrics
    elif texture_score < 25:

        fabric="Silk"
        material="Natural Fiber"


    # Synthetic fabrics
    elif texture_score > 45:

        fabric="Polyester"
        material="Synthetic Fiber"


    # Cotton default
    else:

        fabric="Cotton"
        material="Natural Fiber"


    return fabric,material
     

router=APIRouter()

UPLOAD_FOLDER="uploads"

os.makedirs(UPLOAD_FOLDER,exist_ok=True)

@router.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Please upload image file"
        )

    file_path=os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path,"wb") as buffer:
        shutil.copyfileobj(file.file,buffer)

    image=Image.open(file_path)

    width,height=image.size
    fabric_prediction = predict_fabric(file_path)
   
    fabric = fabric_prediction["fabric"]

    # Assign material based on AI fabric
    if fabric in ["Cotton", "Denim", "Linen", "Silk", "Wool"]:
        material = "Natural Fiber"

    elif fabric in ["Polyester", "Nylon", "Acrylic"]:
        material = "Synthetic Fiber"

    else:
        material = "Blended Fiber"
   
    material_info=analyze_material(fabric)
    
    texture = analyze_texture(file_path)

    pattern = analyze_pattern(file_path)

    damage = analyze_damage(file_path)

    contamination = analyze_contamination(file_path)


    img=cv2.imread(file_path)

    img=cv2.cvtColor(
        img,
        cv2.COLOR_BGR2RGB
    )

    pixels=img.reshape(-1,3)

    avg_color=np.mean(
        pixels,
        axis=0
    )

    r,g,b=avg_color

    if r>150 and g<120 and b<120:
        color="Red"

    elif r>150 and g>120 and b<100:
        color="Orange"

    elif r>120 and g>120 and b<120:
        color="Yellow"

    elif r<100 and g<100 and b<100:
        color="Black"

    elif r>180 and g>180 and b>180:
        color="White"

    elif b>r and b>g:
        color="Blue"

    elif g>r and g>b:
        color="Green"

    else:
        color="Mixed Color"
     
    waste = classify_waste(

    fabric,

    material,

    texture,

    pattern,

    color,

    damage,

    contamination,

    material_info["category"],

    material_info["quality"],

    material_info["blend"]
 )
    recommendation = generate_recommendation(

    waste["waste_category"],

    material,

    waste["recyclability"],

    waste["reuse_potential"]

)
    report = generate_report(
    fabric,
    fabric_prediction["confidence"],
    material_info["quality"],
    texture,
    pattern,
    color,
    damage,
    contamination,
    material_info["fiber_composition"],
    material_info["blend"],
    material_info["quality"],
    material_info["category"],
    waste["waste_category"],
    waste["recyclability"],
    waste["reuse_potential"],
    waste["disposal_recommendation"],
    waste["sustainability_status"],
    recommendation
)
    excel_path = generate_excel(report) 
    
    


    analysis_data = {

    "user_id": None,

    "image_name": file.filename,
    "image_path": file_path,
    "fabric":fabric_prediction["fabric"],
    "confidence":fabric_prediction["confidence"],

    "fabric_type": fabric,
    "material": material,

    "texture": texture,
    "pattern": pattern,
    "color": color,

    "damage": damage,
    "contamination": contamination,

    "fiber_composition": material_info["fiber_composition"],
    "blend": material_info["blend"],
    "quality": material_info["quality"],
    "category": material_info["category"],

    "waste_category": waste["waste_category"],
    "recyclability": waste["recyclability"],
    "reuse_potential": waste["reuse_potential"],
    "disposal_recommendation": waste["disposal_recommendation"],
    "sustainability_status": waste["sustainability_status"],

    "primary_action": recommendation["primary_action"],

    "recycling_methods": ", ".join(
        recommendation["recycling_methods"]
    ),

    "reuse_options": ", ".join(
        recommendation["reuse_options"]
    ),

    "recovery_method": recommendation["recovery_method"],

    "reduction_strategy": recommendation["reduction_strategy"]

}

    save_analysis(
        db,
        analysis_data
    )

    return {
        "message":"Analysis Completed",
        "filename":file.filename,
        "width":width,
        "height":height,
        "ai_fabric_prediction": {
            "fabric": fabric_prediction["fabric"],
            "confidence": fabric_prediction["confidence"],
            "model": "Computer Vision Fabric Classifier"
        },
        "fabric_detection":fabric,
        "material":material,
        "texture":analyze_texture(file_path),
        "pattern":analyze_pattern(file_path),
        "color":color,
       
        "damage": damage,
        "contamination": contamination,
        "fiber_composition":material_info["fiber_composition"],
        "blend":material_info["blend"],
        "quality":material_info["quality"],
        "category":material_info["category"],
        "waste_category": waste["waste_category"],
        "recyclability": waste["recyclability"],
        "reuse_potential": waste["reuse_potential"],
        "disposal_recommendation": waste["disposal_recommendation"],
        "sustainability_status": waste["sustainability_status"],
        "primary_action": recommendation["primary_action"],

        "recycling_methods": recommendation["recycling_methods"],

        "reuse_options": recommendation["reuse_options"],

        "reduction_strategy": recommendation["reduction_strategy"],

        "recovery_method": recommendation["recovery_method"],
        "report":report
       
    }
    
    
@router.post("/generate-report")
async def generate_report_pdf(data:dict):

    try:

        report=data.get("report")


        if report is None:

            raise HTTPException(
                status_code=400,
                detail="Report data missing"
            )


        file_path=create_pdf(report)


        return FileResponse(

            path=file_path,

            media_type="application/pdf",

            filename="textile_waste_report.pdf"

        )


    except Exception as e:

        print("PDF ERROR:",e)


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )
@router.post("/generate-excel")
async def generate_report_excel(data: dict):
    try:
        report = data.get("report")

        if report is None:
            raise HTTPException(
                status_code=400,
                detail="Report data missing"
            )

        # file_path = generate_excel(report)

        return FileResponse(
            path=file_path,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            filename="textile_waste_report.xlsx"
        )

    except Exception as e:
        print("EXCEL ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )        
