from .factors import MATERIAL_FACTORS



def carbon_footprint(material, weight):

    factor = MATERIAL_FACTORS.get(material)

    if not factor:
        return 0


    return round(
        weight * factor["carbon_factor"],
        2
    )



def waste_diversion(weight, recovered_weight):

    if weight == 0:
        return 0


    return round(
        (recovered_weight / weight) * 100,
        2
    )



def resource_recovery(weight, recovered_weight):

    if weight == 0:
        return 0


    return round(
        (recovered_weight / weight) * 100,
        2
    )



def circularity(condition, recovered, reused):


    if recovered > 0 or reused > 0:

        return "Active Circular Economy"


    elif condition.lower() == "good":

        return "Reuse Potential Available"


    else:

        return "Low Circularity"



def benchmark(material, recovery):

    target = MATERIAL_FACTORS[material]["recovery_target"]


    if recovery >= target:

        return "Above Standard"


    elif recovery >= target*0.8:

        return "Meeting Standard"


    else:

        return "Needs Improvement"