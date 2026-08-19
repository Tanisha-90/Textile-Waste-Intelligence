from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch

model = None
processor = None

classes = [
    "Cotton fabric",
    "Polyester fabric",
    "Denim fabric",
    "Silk fabric",
    "Wool fabric",
    "Linen fabric",
    "Velvet fabric",
    "Nylon fabric",
    "Fleece fabric",
    "Terrycloth fabric"
]


def load_model():
    global model, processor

    if model is None or processor is None:
        print("Loading CLIP model...")

        processor = CLIPProcessor.from_pretrained(
            "openai/clip-vit-base-patch32"
        )

        model = CLIPModel.from_pretrained(
            "openai/clip-vit-base-patch32",
            low_cpu_mem_usage=True
        )

        model.eval()

        print("CLIP model loaded successfully.")


def predict_fabric(image_path):

    load_model()

    image = Image.open(image_path).convert("RGB")

    inputs = processor(
        text=classes,
        images=image,
        return_tensors="pt",
        padding=True
    )

    with torch.no_grad():
        output = model(**inputs)

    probs = output.logits_per_image.softmax(dim=1)[0]

    index = torch.argmax(probs)

    return {
        "fabric": classes[index].replace(
            " fabric",
            ""
        ),
        "confidence": round(
            float(probs[index]) * 100,
            2
        ),
        "model": "CLIP ViT"
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