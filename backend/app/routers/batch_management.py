from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.utils.auth import get_current_user

from app.database import get_db
from app.models.batch_management import BatchManagement
from app.schemas.batch_management_schema import BatchCreate

router = APIRouter(
    prefix="/batch-management",
    tags=["Batch Management"],
    dependencies=[Depends(get_current_user)]
)

# ---------------------------------------------------
# Generate Batch ID
# ---------------------------------------------------

def generate_batch_id(db: Session):

    last_batch = db.query(
        BatchManagement
    ).order_by(
        BatchManagement.id.desc()
    ).first()

    if last_batch:

        number = int(
            last_batch.batch_id.replace(
                "WB",
                ""
            )
        ) + 1

    else:

        number = 1

    return f"WB{number:04d}"

# ---------------------------------------------------
# Add Batch
# ---------------------------------------------------
@router.post("/add")
def add_batch(batch: BatchCreate, db: Session = Depends(get_db)):

    # check if SAME fabric already has a batch_id
    existing = db.query(BatchManagement)\
        .filter(BatchManagement.batch_fabric == batch.batch_fabric)\
        .first()

    if existing:
        batch_id = existing.batch_id
    else:
        batch_id = generate_batch_id(db)

    new_batch = BatchManagement(
        batch_id=batch_id,
        batch_type=batch.batch_type,
        batch_fabric=batch.batch_fabric,
        total_quantity=batch.total_quantity
    )

    db.add(new_batch)
    db.commit()
    db.refresh(new_batch)

    return {
        "message": "Batch Added Successfully",
        "batch_id": batch_id
    }

# ---------------------------------------------------
# Get All Batches
# ---------------------------------------------------

@router.get("/all")
def get_all_batches(
    db: Session = Depends(get_db)
):

    return db.query(
        BatchManagement
    ).all()

# ---------------------------------------------------
# Get Single Batch
# ---------------------------------------------------

@router.get("/{batch_id}")
def get_batch(
    batch_id: str,
    db: Session = Depends(get_db)
):

    batch = db.query(
        BatchManagement
    ).filter(
        BatchManagement.batch_id == batch_id
    ).first()

    if batch is None:

        raise HTTPException(
            status_code=404,
            detail="Batch Not Found"
        )

    return batch

# ---------------------------------------------------
# Delete Batch
# ---------------------------------------------------


@router.delete("/delete/{id}")
def delete_batch(
    id: int,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if current_user["role"] != "Admin":
        raise HTTPException(
            status_code=403,
            detail="Only Admin can delete records."
        )

    batch = db.query(
        BatchManagement
    ).filter(
        BatchManagement.id == id
    ).first()

    if batch is None:

        raise HTTPException(
            status_code=404,
            detail="Batch Not Found"
        )

    db.delete(batch)

    db.commit()

    return {

        "message": "Batch Deleted Successfully"

    }