# CO2 emission factors (kg CO2 saved per kg textile reused)

CO2_FACTORS = {

    "cotton": 15,
    "polyester": 10,
    "denim": 18,
    "silk": 20,
    "wool": 25,
    "linen": 12,
    "velvet": 17,
    "nylon": 14,
    "fleece": 13,
    "terrycloth": 11
}



# Water saving factors (litres saved per kg textile)

WATER_FACTORS = {

    "cotton": 6000,
    "polyester": 100,
    "denim": 7000,
    "silk": 2000,
    "wool": 500,
    "linen": 3000,
    "velvet": 2500,
    "nylon": 800,
    "fleece": 600,
    "terrycloth": 4500
}

def get_reuse_percentage(weight, recovered_weight):

    if weight <= 0:
        return 0

    return recovered_weight / weight
def calculate_co2_savings(material, weight, recovered_weight):

    factor = CO2_FACTORS.get(
        material.lower(),
        10
    )

    if weight == 0:
        return 0

    reuse_percentage = recovered_weight / weight

    return round(
        weight * factor * reuse_percentage,
        2
    )

# def calculate_co2_savings(material, recovered_weight):

#     factor = CO2_FACTORS.get(
#         material.lower(),
#         10
#     )
#     reuse = get_reuse_percentage(
#         weight,
#         recovered_weight
#     )

#     return weight * factor * reuse

    # return recovered_weight * factor


def calculate_water_savings(material, weight, recovered_weight):

    factor = WATER_FACTORS.get(
        material.lower(),
        1000
    )

    if weight == 0:
        return 0

    reuse_percentage = recovered_weight / weight

    return round(
        weight * factor * reuse_percentage,
        2
    )
# def calculate_water_savings(material, recovered_weight):

#     factor = WATER_FACTORS.get(
#         material.lower(),
#         1000
#     )
#     reuse = get_reuse_percentage(
#         weight,
#         recovered_weight
#     )

#     return weight * factor * reuse
    # return recovered_weight * factor



def calculate_landfill_reduction(weight, recovered_weight):

    if weight == 0:
        return 0

    return round(
        (recovered_weight / weight) * 100,
        2
    )



def calculate_resource_conservation(recovered_weight):

    return recovered_weight


def sustainability_score(co2, water, landfill):

    score = (

        (co2 / 1500) * 30 +

        (water / 700000) * 30 +

        landfill * 0.4

    )

    if score > 100:
        score = 100

    return round(score, 2)
# def sustainability_score(
#         co2,
#         water,
#         landfill
# ):

#     score = (
#         (co2/1000)*30 +
#         (water/100000)*30 +
#         landfill*0.4
#     )


#     if score > 100:
#         score = 100


#     return round(score,2)

