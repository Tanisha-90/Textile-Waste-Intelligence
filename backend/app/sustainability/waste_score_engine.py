# waste_score_engine.py


MATERIAL_DATA = {


    "Cotton": {
        "recyclability":90,
        "sustainability":85,
        "processing":85
    },


    "Polyester": {
        "recyclability":80,
        "sustainability":60,
        "processing":90
    },


    "Denim": {
        "recyclability":85,
        "sustainability":75,
        "processing":80
    },


    "Silk": {
        "recyclability":60,
        "sustainability":75,
        "processing":60
    },


    "Wool": {
        "recyclability":75,
        "sustainability":85,
        "processing":70
    },


    "Linen": {
        "recyclability":90,
        "sustainability":95,
        "processing":85
    },


    "Velvet": {
        "recyclability":55,
        "sustainability":50,
        "processing":60
    },


    "Nylon": {
        "recyclability":70,
        "sustainability":50,
        "processing":80
    },


    "Fleece": {
        "recyclability":75,
        "sustainability":60,
        "processing":75
    },


    "Terrycloth": {
        "recyclability":85,
        "sustainability":80,
        "processing":80
    }

}



CONDITION_DATA = {


    "Good":90,

    "Medium":60,

    "Poor":30

}
def score_level(score):

    if score >= 80:
        return "High"

    elif score >= 50:
        return "Moderate"

    else:
        return "Low"





def calculate_waste_score(
        material,
        weight,
        condition,
        recovered_quantity,
        reused_quantity
):


    material_info = MATERIAL_DATA.get(
        material,
        MATERIAL_DATA["Cotton"]
    )



    # 3A Recyclability Score

    recyclability_score = (
        material_info["recyclability"]
    )



    # 3B Reuse Score


    condition_score = CONDITION_DATA.get(
        condition,
        50
    )


    if weight > 0:

        reuse_percentage = (
            reused_quantity / weight
        ) * 100

    else:

        reuse_percentage = 0



    reuse_score = (
        condition_score * reuse_percentage
    ) / 100





    # 3C Sustainability Score


    sustainability_score = (
        material_info["sustainability"]
    )





    # 3D Material Recovery Score


    if weight > 0:

        recovery_score = (
            recovered_quantity / weight
        ) * 100

    else:

        recovery_score = 0






    # 3E Overall Circularity Score


    circularity_score = (

        recyclability_score * 0.35

        +

        condition_score * 0.20

        +

        reuse_score * 0.20

        +

        sustainability_score * 0.15

        +

        material_info["processing"] * 0.10

    )





    # Category Decision


    if circularity_score >= 90:

        category = "Excellent Recovery Potential"


    elif circularity_score >=75:

        category = "High Recovery Potential"


    elif circularity_score >=50:

        category = "Moderate Recovery Potential"


    elif circularity_score >=30:

        category = "Limited Recovery Potential"


    else:

        category = "Disposal Recommended"
   

    return {


"recyclability_score":
round(recyclability_score,2),

"recyclability_level":
score_level(recyclability_score),



"reuse_score":
round(reuse_score,2),

"reuse_level":
score_level(reuse_score),



"sustainability_score":
round(sustainability_score,2),

"sustainability_level":
score_level(sustainability_score),



"material_recovery_score":
round(recovery_score,2),

"material_recovery_level":
score_level(recovery_score),



"circularity_score":
round(circularity_score,2),


"category":
category


}