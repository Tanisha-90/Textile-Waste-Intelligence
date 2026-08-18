from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.batch_management import BatchManagement
from app.models.waste_source_tracking import WasteSourceTracking
from app.schemas.waste_source_tracking_schema import WasteSourceCreate
from app.utils.auth import get_current_user
router = APIRouter(
    prefix="/waste-source",
    tags=["Waste Source Tracking"],
    dependencies=[Depends(get_current_user)]
)

@router.post("/add")
def add_source(
    source: WasteSourceCreate,
    db: Session = Depends(get_db)
):
    batch = db.query(
        BatchManagement
    ).filter(
        BatchManagement.batch_id == source.batch_id
    ).first()

    if batch is None:
        raise HTTPException(
            status_code=404,
            detail="Batch Not Found"
        )

    new_source = WasteSourceTracking(
        batch_id=source.batch_id,
        source=source.source,
        remarks=source.remarks
    )

    db.add(new_source)
    db.commit()
    db.refresh(new_source)

    return {
        "message": "Waste Source Saved Successfully"
    }

@router.get("/all")
def get_all_sources(
    db: Session = Depends(get_db)
):
    return db.query(
        WasteSourceTracking
    ).all()

@router.delete("/delete/{id}")
# def delete_source(
#     id: int,
#     db: Session = Depends(get_db)
# ):
def delete_source(
    id: int,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if current_user["role"] != "Admin":
        raise HTTPException(
            status_code=403,
            detail="Only Admin can delete records."
        )
    record = db.query(
        WasteSourceTracking
    ).filter(
        WasteSourceTracking.id == id
    ).first()

    if record is None:
        raise HTTPException(
            status_code=404,
            detail="Record Not Found"
        )

    db.delete(record)
    db.commit()

    return {
        "message": "Deleted Successfully"
    }