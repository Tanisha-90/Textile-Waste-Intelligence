import cv2
import numpy as np

def analyze_image(image_path):

    image=cv2.imread(image_path)

    height,width=image.shape[:2]

    average_color=np.mean(image,axis=(0,1))

    blue=int(average_color[0])
    green=int(average_color[1])
    red=int(average_color[2])

    if red>green and red>blue:
        dominant_color="Red"

    elif green>red and green>blue:
        dominant_color="Green"

    elif blue>red and blue>green:
        dominant_color="Blue"

    else:
        dominant_color="Mixed"

    gray=cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)

    variance=np.var(gray)

    if variance<400:
        texture="Smooth"

    elif variance<1200:
        texture="Medium"

    else:
        texture="Rough"

    return{
        "width":width,
        "height":height,
        "dominant_color":dominant_color,
        "texture":texture
    }