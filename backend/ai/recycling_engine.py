def generate_recycling_recommendation(
        material,
        condition,
        quantity
):

    result = {}


    # Cotton Rules

    if material.lower() == "cotton":


        if condition.lower() == "good condition":

            result["waste_category"] = "Reusable Textile Waste"

            result["recommended_action"] = "Fabric Reuse"

            result["available_options"] = [
                "Fabric Reuse",
                "Upcycling",
                "Donation"
            ]

            result["suggestions"] = [
                "New garments",
                "Bags and accessories",
                "Home textile products"
            ]



        elif condition.lower() in [
            "damaged",
            "torn",
            "highly damaged"
        ]:

            result["waste_category"] = "Recyclable Textile Waste"

            result["recommended_action"] = "Mechanical Recycling"

            result["available_options"] = [
                "Fiber Recycling",
                "Mechanical Recycling",
                "Industrial Recovery"
            ]

            result["suggestions"] = [
                "Convert into recycled fibers",
                "Insulation materials",
                "Fiber filling"
            ]




    # Polyester Rules


    elif material.lower() == "polyester":


        result["waste_category"] = "Synthetic Textile Waste"


        result["recommended_action"] = "Chemical Recycling"


        result["available_options"] = [

            "Chemical Recycling",
            "Mechanical Recycling",
            "Industrial Recovery"

        ]


        result["suggestions"] = [

            "Recycled polyester production",
            "Industrial textile products",
            "Automotive materials"

        ]




    # Denim


    elif material.lower() == "denim":


        result["waste_category"] = "Denim Textile Waste"


        result["recommended_action"] = "Upcycling"


        result["available_options"] = [

            "Fabric Reuse",
            "Upcycling",
            "Fiber Recycling"

        ]


        result["suggestions"] = [

            "Bags",
            "Accessories",
            "Home decoration items"

        ]




    # Mixed Fabric


    elif material.lower() == "mixed fabric":


        result["waste_category"] = "Mixed Textile Waste"


        result["recommended_action"] = "Industrial Recovery"


        result["available_options"] = [

            "Industrial Recovery",
            "Mechanical Recycling"

        ]


        result["suggestions"] = [

            "Insulation materials",
            "Automotive textiles",
            "Fiber filling"

        ]



    else:


        result["waste_category"] = "Unknown Textile Waste"


        result["recommended_action"] = "Manual Assessment"


        result["available_options"] = [

            "Material Inspection"

        ]


        result["suggestions"] = [

            "Separate textile components"

        ]



    return result