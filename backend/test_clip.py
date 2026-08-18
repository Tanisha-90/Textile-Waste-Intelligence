from transformers import CLIPProcessor, CLIPModel

print("Loading CLIP model...")

model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

print("✅ CLIP loaded successfully!")