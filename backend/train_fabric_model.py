import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense,GlobalAveragePooling2D,Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
import os


DATASET_PATH="dataset"


IMAGE_SIZE=(224,224)

BATCH_SIZE=16


datagen=ImageDataGenerator(

    preprocessing_function=tf.keras.applications.mobilenet_v2.preprocess_input,

    validation_split=0.2

)



train_data=datagen.flow_from_directory(

    DATASET_PATH,

    target_size=IMAGE_SIZE,

    batch_size=BATCH_SIZE,

    class_mode="categorical",

    subset="training"

)



validation_data=datagen.flow_from_directory(

    DATASET_PATH,

    target_size=IMAGE_SIZE,

    batch_size=BATCH_SIZE,

    class_mode="categorical",

    subset="validation"

)



print(train_data.class_indices)



base_model=MobileNetV2(

    weights="imagenet",

    include_top=False,

    input_shape=(224,224,3)

)



base_model.trainable=False



x=base_model.output


x=GlobalAveragePooling2D()(x)


x=Dense(

    128,

    activation="relu"

)(x)


x=Dropout(0.3)(x)



output=Dense(

    len(train_data.class_indices),

    activation="softmax"

)(x)



model=Model(

    inputs=base_model.input,

    outputs=output

)



model.compile(

    optimizer=Adam(
        learning_rate=0.0001
    ),

    loss="categorical_crossentropy",

    metrics=["accuracy"]

)



model.fit(

    train_data,

    validation_data=validation_data,

    epochs=10

)



os.makedirs(

    "ai",

    exist_ok=True

)



model.save(

    "ai/fabric_model.h5"

)



print("MODEL SAVED SUCCESSFULLY")