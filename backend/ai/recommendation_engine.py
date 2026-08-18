def generate_recommendation(
        waste_category,
        material,
        recyclability,
        reuse_potential
):


    recommendation = {

        "primary_action":"",
        "recycling_methods":[],
        "reuse_options":[],
        "reduction_strategy":"",
        "recovery_method":""

    }


    waste_category = waste_category.lower()
    material = material.lower()



    # -------------------------
    # Reusable
    # -------------------------

    if waste_category == "reusable":


        recommendation["primary_action"] = "Fabric Reuse"


        recommendation["recycling_methods"] = [

            "Donation",
            "Fabric Reuse"

        ]


        recommendation["reuse_options"] = [

            "Second hand clothing",
            "Garment reuse",
            "Community donation"

        ]


        recommendation["reduction_strategy"] = (

            "Extend textile life through reuse"

        )


        recommendation["recovery_method"] = (

            "Reuse before recycling"

        )



    # Repairable
   

    elif waste_category == "repairable":


        recommendation["primary_action"] = "Repair and Reuse"


        recommendation["recycling_methods"] = [

            "Fabric Repair",
            "Upcycling"

        ]


        recommendation["reuse_options"] = [

            "Clothing repair",
            "Modified garments"

        ]


        recommendation["reduction_strategy"] = (

            "Reduce textile waste by repairing"

        )


        recommendation["recovery_method"] = (

            "Repair first"

        )



   
    # Upcyclable
   

    elif waste_category == "upcyclable":


        recommendation["primary_action"] = "Upcycling"


        recommendation["recycling_methods"] = [

            "Upcycling",
            "Creative Recycling"

        ]


        recommendation["reuse_options"] = [

            "Bags",
            "Accessories",
            "Home products"

        ]


        recommendation["reduction_strategy"] = (

            "Convert waste into valuable products"

        )


        recommendation["recovery_method"] = (

            "Material transformation"

        )



    # Recyclable
   

    elif waste_category == "recyclable":


        recommendation["primary_action"] = "Fiber Recycling"


        recommendation["recycling_methods"] = [

            "Mechanical Recycling",
            "Chemical Recycling",
            "Fiber Recovery"

        ]


        recommendation["reuse_options"] = [

            "Recycled yarn",
            "Industrial textiles"

        ]


        recommendation["reduction_strategy"] = (

            "Recover fibers instead of disposal"

        )


        recommendation["recovery_method"] = (

            "Industrial recycling process"

        )



   
    # Compostable
  

    elif waste_category == "compostable":


        recommendation["primary_action"] = "Composting"


        recommendation["recycling_methods"] = [

            "Biological Recycling"

        ]


        recommendation["reuse_options"] = [

            "Natural fiber recovery"

        ]


        recommendation["reduction_strategy"] = (

            "Use biodegradable disposal methods"

        )


        recommendation["recovery_method"] = (

            "Industrial composting"

        )



    # -------------------------
    # Hazardous
    # -------------------------

    else:


        recommendation["primary_action"] = "Industrial Recovery"


        recommendation["recycling_methods"] = [

            "Industrial Recovery"

        ]


        recommendation["reuse_options"] = [

            "Not suitable"

        ]


        recommendation["reduction_strategy"] = (

            "Prevent contamination"

        )


        recommendation["recovery_method"] = (

            "Controlled waste treatment"

        )


    return recommendation