from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db

from app.models.notification import Notification
from app.models.waste_registration import WasteRegistration
from app.models.batch_management import BatchManagement
from app.models.collection_management import CollectionManagement


router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


# =========================================================
# GET ALL NOTIFICATIONS
# =========================================================

@router.get("/")
def get_notifications(
    db: Session = Depends(get_db)
):

    return (
        db.query(Notification)
        .order_by(Notification.id.desc())
        .all()
    )


# =========================================================
# GET UNREAD NOTIFICATIONS
# =========================================================

@router.get("/unread")
def get_unread_notifications(
    db: Session = Depends(get_db)
):

    return (
        db.query(Notification)
        .filter(
            Notification.is_read == False
        )
        .order_by(Notification.id.desc())
        .all()
    )


# =========================================================
# MARK ONE AS READ
# =========================================================

@router.put("/{notification_id}/read")
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db)
):

    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id
        )
        .first()
    )

    if not notification:

        return {
            "message": "Notification not found"
        }

    notification.is_read = True

    db.commit()

    return {
        "message": "Notification marked as read"
    }

@router.put("/{notification_id}/unread")
def mark_as_unread(
    notification_id: int,
    db: Session = Depends(get_db)
):
    notification = (
        db.query(Notification)
        .filter(Notification.id == notification_id)
        .first()
    )

    if not notification:
        return {
            "message": "Notification not found"
        }

    notification.is_read = False

    db.commit()

    return {
        "message": "Notification marked as unread"
    }
# =========================================================
# MARK ALL AS READ
# =========================================================

@router.put("/read-all")
def mark_all_as_read(
    db: Session = Depends(get_db)
):

    db.query(Notification).filter(
        Notification.is_read == False
    ).update(
        {
            Notification.is_read: True
        },
        synchronize_session=False
    )

    db.commit()

    return {
        "message": "All notifications marked as read"
    }


# =========================================================
# GENERATE NOTIFICATIONS
# =========================================================

@router.post("/generate")
def generate_notifications(
    db: Session = Depends(get_db)
):

    generated = []


    # =====================================================
    # 1. WASTE COLLECTION ALERTS
    # =====================================================

    registrations = (
        db.query(WasteRegistration)
        .order_by(
            WasteRegistration.id.desc()
        )
        .limit(5)
        .all()
    )


    for waste in registrations:

        message = (
            f"Waste record #{waste.id} "
            f"contains {waste.weight_kg} Kg "
            f"of {waste.fabric_type} waste "
            f"and is ready for collection."
        )


        existing = (
            db.query(Notification)
            .filter(
                Notification.message == message
            )
            .first()
        )


        if not existing:

            notification = Notification(

                title="Waste Collection Alert",

                message=message,

                is_read=False

            )

            db.add(notification)

            generated.append(
                "Waste Collection Alert"
            )


    # =====================================================
    # 2. RECYCLING OPPORTUNITIES
    # =====================================================

    batches = (
        db.query(BatchManagement)
        .order_by(
            BatchManagement.id.desc()
        )
        .all()
    )


    recycling_count = 0


    for batch in batches:

        quantity = batch.total_quantity or 0


        # 20 Kg or more = good recycling opportunity

        if quantity < 20:
            continue


        message = (
            f"Batch {batch.batch_id} "
            f"contains {quantity} Kg of "
            f"{batch.batch_fabric} waste. "
            f"This batch is suitable for "
            f"recycling or recovery."
        )


        existing = (
            db.query(Notification)
            .filter(
                Notification.message == message
            )
            .first()
        )


        if not existing:

            notification = Notification(

                title="Recycling Opportunity",

                message=message,

                is_read=False

            )

            db.add(notification)

            generated.append(
                "Recycling Opportunity"
            )

            recycling_count += 1


        if recycling_count >= 3:
            break


    # =====================================================
    # 3. INVENTORY WARNING
    # =====================================================

    # We do NOT use created_at because your
    # WasteRegistration model doesn't contain it.
    #
    # Instead, notify about the largest/current
    # waste records that need collection.

    large_waste = (
        db.query(WasteRegistration)
        .order_by(
            WasteRegistration.weight_kg.desc()
        )
        .limit(2)
        .all()
    )


    for waste in large_waste:

        message = (
            f"Waste record #{waste.id} "
            f"contains {waste.weight_kg} Kg "
            f"of {waste.fabric_type} waste. "
            f"This inventory should be reviewed "
            f"for collection or processing."
        )


        existing = (
            db.query(Notification)
            .filter(
                Notification.message == message
            )
            .first()
        )


        if not existing:

            notification = Notification(

                title="Inventory Warning",

                message=message,

                is_read=False

            )

            db.add(notification)

            generated.append(
                "Inventory Warning"
            )


    # =====================================================
    # 4. SUSTAINABILITY MILESTONE
    # =====================================================

    total_waste = (
        db.query(
            func.sum(
                WasteRegistration.weight_kg
            )
        ).scalar()
        or 0
    )


    # Milestones based on actual database quantity

    milestones = [
        100,
        250,
        500,
        1000
    ]


    for milestone in milestones:

        if total_waste >= milestone:

            message = (
                f"The platform has processed "
                f"{round(total_waste, 2)} Kg "
                f"of textile waste and crossed "
                f"the {milestone} Kg milestone."
            )


            existing = (
                db.query(Notification)
                .filter(
                    Notification.message == message
                )
                .first()
            )


            if not existing:

                notification = Notification(

                    title="Sustainability Milestone",

                    message=message,

                    is_read=False

                )

                db.add(notification)

                generated.append(
                    "Sustainability Milestone"
                )


    # =====================================================
    # 5. COLLECTION ACTIVITY
    # =====================================================

    total_collections = (
        db.query(
            CollectionManagement
        ).count()
    )


    if total_collections > 0:

        message = (
            f"The platform currently has "
            f"{total_collections} collection "
            f"records available for monitoring."
        )


        existing = (
            db.query(Notification)
            .filter(
                Notification.message == message
            )
            .first()
        )


        if not existing:

            notification = Notification(

                title="Collection Activity",

                message=message,

                is_read=False

            )

            db.add(notification)

            generated.append(
                "Collection Activity"
            )


    # =====================================================
    # SAVE
    # =====================================================

    db.commit()


    return {

        "message":
            "Notifications generated successfully",

        "generated":
            len(generated),

        "notifications":
            generated

    }