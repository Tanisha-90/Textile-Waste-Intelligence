# waste_registration.py

from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import File
from fastapi import Form
from fastapi import HTTPException
from sqlalchemy.orm import Session
import os
import shutil
from datetime import date
from app.database import get_db
from app.models.waste_registration import WasteRegistration
from app.utils.auth import get_current_user
router = APIRouter(
    prefix="/waste-registration",
    tags=["Waste Registration"],
    dependencies=[Depends(get_current_user)]
)

UPLOAD_FOLDER = "uploads/waste_images"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

def generate_registration_id(db: Session):
    last_record = db.query(
        WasteRegistration
    ).order_by(
        WasteRegistration.id.desc()
    ).first()

    if last_record:
        last_number = int(
            last_record.waste_registration_id.replace(
                "WR",
                ""
            )
        )
        new_number = last_number + 1
    else:
        new_number = 1

    return f"WR{new_number:04d}"
   

@router.post("/add")
def add_waste(
    fabric_type: str = Form(...),
    waste_category: str = Form(...),
    color: str = Form(...),
    condition: str = Form(...),
    quantity: int = Form(...),
    weight_kg: float = Form(...),
    status: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    registration_id = generate_registration_id(db)

   

    image_path = os.path.join(
        UPLOAD_FOLDER,
        image.filename
    )

    with open(
        image_path,
        "wb"
    ) as buffer:
        shutil.copyfileobj(
            image.file,
            buffer
        )

    new_waste = WasteRegistration(
        waste_registration_id=registration_id,
        fabric_type=fabric_type,
        waste_category=waste_category,
        color=color,
        condition=condition,
        quantity=quantity,
        weight_kg=weight_kg,
        image=image.filename,
        registration_date=date.today(),
        status=status
    )

    db.add(new_waste)
    db.commit()
    db.refresh(new_waste)

    return {
        "message": "Waste Registered Successfully",
        "registration_id": registration_id,
    }

@router.get("/all")
def get_all_waste(
    db: Session = Depends(get_db)
):
    return db.query(
        WasteRegistration
    ).all()

# @router.delete("/delete/{id}")
# def delete_waste(
#     id: int,
#     db: Session = Depends(get_db)
# ):
@router.delete("/delete/{id}")
def delete_waste(
    id: int,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if current_user["role"] != "Admin":
        raise HTTPException(
            status_code=403,
            detail="Only Admin can delete records."
        )
    waste = db.query(
        WasteRegistration
    ).filter(
        WasteRegistration.id == id
    ).first()

    if waste is None:
        raise HTTPException(
            status_code=404,
            detail="Waste Record Not Found"
        )

    image_path = os.path.join(
        UPLOAD_FOLDER,
        waste.image
    )

    if os.path.exists(image_path):
        os.remove(image_path)

    db.delete(waste)
    db.commit()

    return {
        "message": "Waste Deleted Successfully"
    }
