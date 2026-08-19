from PIL import Image
import cv2
import numpy as np


# Fabric classes from the original CLIP classifier
FABRIC_CLASSES = [
    "Cotton",
    "Polyester",
    "Denim",
    "Silk",
    "Wool",
    "Linen",
    "Velvet",
    "Nylon",
    "Fleece"
]


def predict_fabric(image_path):

    img = cv2.imread(image_path)

    if img is None:
        raise ValueError("Unable to read image")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Texture analysis
    texture_score = np.std(gray)

    # Color analysis
    avg_color = np.mean(img, axis=(0, 1))
    b, g, r = avg_color

    # Edge analysis
    edges = cv2.Canny(gray, 100, 200)
    edge_density = np.mean(edges)

    # -------------------------------------------------
    # Lightweight fabric classification
    # -------------------------------------------------

    # Denim
    if (
        texture_score > 70
        and b < 150
        and edge_density > 15
    ):
        fabric = "Denim"
        confidence = 78.0

    # Velvet
    elif (
        texture_score > 55
        and edge_density < 15
    ):
        fabric = "Velvet"
        confidence = 70.0

    # Wool
    elif (
        texture_score > 50
        and edge_density > 20
    ):
        fabric = "Wool"
        confidence = 68.0

    # Fleece
    elif (
        texture_score > 40
        and edge_density < 12
    ):
        fabric = "Fleece"
        confidence = 67.0

    # Silk
    elif texture_score < 25:
        fabric = "Silk"
        confidence = 72.0

    # Linen
    elif (
        texture_score >= 25
        and texture_score < 40
        and edge_density > 15
    ):
        fabric = "Linen"
        confidence = 66.0

    # Nylon
    elif (
        texture_score < 35
        and edge_density < 10
        and r > 120
    ):
        fabric = "Nylon"
        confidence = 65.0

    # Polyester
    elif texture_score >= 40 and texture_score < 55:
        fabric = "Polyester"
        confidence = 70.0

    # Cotton as default
    else:
        fabric = "Cotton"
        confidence = 65.0

    return {
        "fabric": fabric,
        "confidence": confidence,
        "model": "Computer Vision Fabric Classifier",
        "supported_classes": FABRIC_CLASSES
    }
# from transformers import CLIPProcessor, CLIPModel
# from PIL import Image
# import torch

# # Load model only when it is actually needed
# model = None
# processor = None


# classes = [
#     "Cotton fabric",
#     "Polyester fabric",
#     "Denim fabric",
#     "Silk fabric",
#     "Wool fabric",
#     "Linen fabric",
#     "Velvet fabric",
#     "Nylon fabric",
#     "Fleece fabric",
#     "Terrycloth fabric"
# ]


# def load_model():
#     global model, processor

#     if model is None or processor is None:
#         print("Loading CLIP model...")

#         processor = CLIPProcessor.from_pretrained(
#             "openai/clip-vit-base-patch32"
#         )

#         model = CLIPModel.from_pretrained(
#             "openai/clip-vit-base-patch32"
#         )

#         model.eval()

#         print("CLIP model loaded successfully.")


# def predict_fabric(image_path):

#     load_model()

#     image = Image.open(image_path).convert("RGB")

#     inputs = processor(
#         text=classes,
#         images=image,
#         return_tensors="pt",
#         padding=True
#     )

#     with torch.no_grad():
#         output = model(**inputs)

#     probs = output.logits_per_image.softmax(dim=1)[0]

#     index = torch.argmax(probs)

#     return {
#         "fabric": classes[index].replace(
#             " fabric",
#             ""
#         ),
#         "confidence": round(
#             float(probs[index]) * 100,
#             2
#         ),
#         "model": "CLIP ViT"
#     }

# from transformers import CLIPProcessor, CLIPModel
# from PIL import Image
# import torch


# model = CLIPModel.from_pretrained(
#     "openai/clip-vit-base-patch32"
# )

# processor = CLIPProcessor.from_pretrained(
#     "openai/clip-vit-base-patch32"
# )


# classes=[
# "Cotton fabric",
# "Polyester fabric",
# "Denim fabric",
# "Silk fabric",
# "Wool fabric",
# "Linen fabric",
# "Velvet fabric",
# "Nylon fabric",
# "Fleece fabric",
# "Terrycloth fabric"
# ]


# def predict_fabric(image_path):

#     image=Image.open(image_path)


#     inputs=processor(
#         text=classes,
#         images=image,
#         return_tensors="pt",
#         padding=True
#     )


#     with torch.no_grad():

#         output=model(**inputs)


#     probs=output.logits_per_image.softmax(dim=1)[0]


#     index=torch.argmax(probs)


#     return {

#         "fabric":
#         classes[index].replace(
#             " fabric",
#             ""
#         ),

#         "confidence":
#         round(
#             float(probs[index])*100,
#             2
#         ),

#         "model":
#         "CLIP ViT"

#     }