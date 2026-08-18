from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.collection_management import CollectionManagement
from app.models.batch_management import BatchManagement
from app.schemas.collection_management_schema import CollectionCreate
from app.utils.auth import get_current_user


router = APIRouter(
    prefix="/collection-management",
    tags=["Collection Management"],
    dependencies=[Depends(get_current_user)]
)

@router.post("/add")
def add_collection(
    collection: CollectionCreate,
    db: Session = Depends(get_db)
):
    batch = db.query(
        BatchManagement
    ).filter(
        BatchManagement.batch_id == collection.batch_id
    ).first()


    if batch is None:
        raise HTTPException(
            status_code=404,
            detail="Batch Not Found"
        )

    new_collection = CollectionManagement(
        batch_id=collection.batch_id,
        source_of_waste=collection.source_of_waste,
        collection_location=collection.collection_location,
        collection_date=collection.collection_date
    )

    db.add(new_collection)
    db.commit()
    db.refresh(new_collection)

    return {
        "message": "Collection Added Successfully"
    }

@router.get("/all")
def get_all_collection(
    db: Session = Depends(get_db)
):
    return db.query(
        CollectionManagement
    ).all()

@router.delete("/delete/{id}")

def delete_collection(
    id: int,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if current_user["role"] != "Admin":
        raise HTTPException(
            status_code=403,
            detail="Only Admin can delete records."
        )
    collection = db.query(
        CollectionManagement
    ).filter(
        CollectionManagement.id == id
    ).first()

    if collection is None:
        raise HTTPException(
            status_code=404,
            detail="Collection Not Found"
        )

    db.delete(collection)
    db.commit()

    return {
        "message": "Collection Deleted Successfully"
    }