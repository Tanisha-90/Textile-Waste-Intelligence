from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch


model = CLIPModel.from_pretrained(
    "openai/clip-vit-base-patch32"
)

processor = CLIPProcessor.from_pretrained(
    "openai/clip-vit-base-patch32"
)


classes=[
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


def predict_fabric(image_path):

    image=Image.open(image_path)


    inputs=processor(
        text=classes,
        images=image,
        return_tensors="pt",
        padding=True
    )


    with torch.no_grad():

        output=model(**inputs)


    probs=output.logits_per_image.softmax(dim=1)[0]


    index=torch.argmax(probs)


    return {

        "fabric":
        classes[index].replace(
            " fabric",
            ""
        ),

        "confidence":
        round(
            float(probs[index])*100,
            2
        ),

        "model":
        "CLIP ViT"

    }