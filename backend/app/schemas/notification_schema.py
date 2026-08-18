from pydantic import BaseModel


class NotificationCreate(BaseModel):

    title: str

    message: str

    notification_type: str


class NotificationResponse(BaseModel):

    id: int

    title: str

    message: str

    notification_type: str

    is_read: bool

    created_at: object

    class Config:
        from_attributes = True