
def analyze_material(fabric):

    if fabric=="Cotton":

        return{
            "fiber_composition":"100% Cotton",
            "blend":"Not Detected",
            "quality":"High",
            "category":"Natural Fiber"
        }

    elif fabric=="Polyester":

        return{
            "fiber_composition":"100% Polyester",
            "blend":"Not Detected",
            "quality":"High",
            "category":"Synthetic Fiber"
        }

    elif fabric=="Denim":

        return{
            "fiber_composition":"98% Cotton 2% Elastane",
            "blend":"Detected",
            "quality":"High",
            "category":"Natural Blend"
        }

    elif fabric=="Silk":

        return{
            "fiber_composition":"100% Silk",
            "blend":"Not Detected",
            "quality":"Premium",
            "category":"Natural Fiber"
        }

    elif fabric=="Wool":

        return{
            "fiber_composition":"100% Wool",
            "blend":"Not Detected",
            "quality":"High",
            "category":"Natural Fiber"
        }

    elif fabric=="Linen":

        return{
            "fiber_composition":"100% Linen",
            "blend":"Not Detected",
            "quality":"High",
            "category":"Natural Fiber"
        }

    elif fabric=="Nylon":

        return{
            "fiber_composition":"100% Nylon",
            "blend":"Not Detected",
            "quality":"High",
            "category":"Synthetic Fiber"
        }

    elif fabric=="Rayon":

        return{
            "fiber_composition":"100% Rayon",
            "blend":"Not Detected",
            "quality":"Medium",
            "category":"Semi Synthetic Fiber"
        }

    elif fabric=="Acrylic":

        return{
            "fiber_composition":"100% Acrylic",
            "blend":"Not Detected",
            "quality":"Medium",
            "category":"Synthetic Fiber"
        }

    else:

        return{
            "fiber_composition":"60% Cotton 40% Polyester",
            "blend":"Detected",
            "quality":"Medium",
            "category":"Mixed Fabric"
        }