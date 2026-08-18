import tensorflow as tf
from tensorflow.keras.applications.mobilenet_v2 import (
    MobileNetV2,
    preprocess_input
)
from tensorflow.keras.preprocessing import image
import numpy as np
import os


MODEL_PATH="ai/fabric_model.h5"


fabric_classes=[
    "Cotton",
    "Polyester",
    "Wool",
    "Silk",
    "Linen",
    "Denim",
    "Nylon",
    "Rayon",
    "Acrylic",
    "Mixed Fabric"
]


model=None


def load_model():

    global model

    if model is None:

        if not os.path.exists(MODEL_PATH):
            raise Exception(
                "Fabric model not found. Train model first."
            )

        model=tf.keras.models.load_model(
            MODEL_PATH
        )

    return model



def detect_fabric(image_path):

    model=load_model()


    img=image.load_img(
        image_path,
        target_size=(224,224)
    )


    img_array=image.img_to_array(
        img
    )


    img_array=np.expand_dims(
        img_array,
        axis=0
    )


    img_array=preprocess_input(
        img_array
    )


    prediction=model.predict(
        img_array
    )


    predicted_index=np.argmax(
        prediction
    )


    confidence=float(
        np.max(prediction)
    )


    fabric=fabric_classes[
        predicted_index
    ]


    return {
        "fabric":fabric,
        "confidence":round(
            confidence*100,
            2
        )
    }