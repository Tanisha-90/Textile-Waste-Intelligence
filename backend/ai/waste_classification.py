def classify_waste(
        fabric,
        material,
        texture,
        pattern,
        color,
        damage,
        contamination,
        category,
        quality,
        blend
):

    fabric = fabric.lower()
    material = material.lower()
    texture = texture.lower()
    damage = damage.lower()
    contamination = contamination.lower()
    category = category.lower()
    quality = quality.lower()


    result = {

        "waste_category": "",
        "recyclability": "",
        "reuse_potential": "",
        "disposal_recommendation": "",
        "sustainability_status": ""

    }


    # ---------------------------------
    # 1. Hazardous Textile Waste
    # ---------------------------------

    if (
        "heavy contamination" in contamination
        or
        "oil" in contamination
        or
        "ink" in contamination
    ):

        result["waste_category"] = "Hazardous Textile Waste"

        result["recyclability"] = "Very Low"

        result["reuse_potential"] = "Not Suitable"

        result["disposal_recommendation"] = (
            "Industrial Recovery / Hazardous Treatment"
        )

        result["sustainability_status"] = "Poor"


        return result



    # ---------------------------------
    # 2. Reusable Textile
    # ---------------------------------

    if (
        damage == "no damage"
        and
        contamination == "none"
        and
        quality == "high"
    ):

        result["waste_category"] = "Reusable"

        result["recyclability"] = "High"

        result["reuse_potential"] = "Excellent"

        result["disposal_recommendation"] = (
            "Direct Fabric Reuse / Donation"
        )

        result["sustainability_status"] = "Excellent"


        return result



    # ---------------------------------
    # 3. Repairable Textile
    # ---------------------------------

    if (
        "minor" in damage
        and
        contamination == "none"
    ):

        result["waste_category"] = "Repairable"

        result["recyclability"] = "Medium"

        result["reuse_potential"] = "Good"

        result["disposal_recommendation"] = (
            "Repair and Reuse"
        )

        result["sustainability_status"] = "Good"


        return result



    # ---------------------------------
    # 4. Upcyclable Textile
    # ---------------------------------

    if (
        fabric in [
            "denim",
            "cotton",
            "jacket",
            "wool"
        ]
        and
        damage != "no damage"
    ):

        result["waste_category"] = "Upcyclable"

        result["recyclability"] = "Medium"

        result["reuse_potential"] = "High"

        result["disposal_recommendation"] = (
            "Creative Upcycling into New Products"
        )

        result["sustainability_status"] = "Good"


        return result



    # ---------------------------------
    # 5. Compostable Textile
    # ---------------------------------

    if (
        "natural" in material
        or
        "cotton" in material
        or
        "wool" in material
    ):

        result["waste_category"] = "Compostable"

        result["recyclability"] = "Low"

        result["reuse_potential"] = "Low"

        result["disposal_recommendation"] = (
            "Industrial Composting"
        )

        result["sustainability_status"] = "Average"


        return result



    # ---------------------------------
    # 6. Recyclable Textile
    # ---------------------------------

    if (
        "synthetic" in material
        or
        "polyester" in material
        or
        "blend" in material
    ):

        result["waste_category"] = "Recyclable"

        result["recyclability"] = "High"

        result["reuse_potential"] = "Moderate"

        result["disposal_recommendation"] = (
            "Mechanical Recycling / Fiber Recovery"
        )

        result["sustainability_status"] = "Good"


        return result



    # ---------------------------------
    # Default
    # ---------------------------------

    result["waste_category"] = "Recyclable"

    result["recyclability"] = "Medium"

    result["reuse_potential"] = "Moderate"

    result["disposal_recommendation"] = (
        "Textile Recycling"
    )

    result["sustainability_status"] = "Average"


    return result
