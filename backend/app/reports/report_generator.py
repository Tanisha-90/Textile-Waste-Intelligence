def generate_report(
        fabric,
        confidence,
        material,
        texture,
        pattern, 
        color,
        damage, 
        contamination, 
        fiber_composition, 
        blend, 
        quality,
        category, 
        waste_category,
        recyclability,
        reuse_potential,
        disposal_recommendation, 
        sustainability_status,
        recommendation
):
    report = {

"AI Fabric Recognition": {
    "Fabric Type": fabric,
    "Confidence": confidence,
    "Model": "OpenAI CLIP (ViT-B/32)",
    "Method": "Zero-Shot Vision Classification"
},


"Textile Image Analysis": {

    "Fabric Detection": fabric,
    "Material Recognition": material,
    "Fabric Texture": texture,
    "Fabric Pattern": pattern,
    "Fabric Color": color,
    "Damage Detection": damage,
    "Contamination Detection": contamination

},


"Material Classification": {

    "Fabric Type": fabric,
    "Fiber Composition": fiber_composition,
    "Blend Identification": blend,
    "Material Quality": quality,
    "Fabric Category": category

},


"Textile Waste Classification": {

    "Waste Category": waste_category,
    "Recyclability": recyclability,
    "Reuse Potential": reuse_potential,
    "Disposal Recommendation": disposal_recommendation,
    "Sustainability Status": sustainability_status

},


"Recycling Recommendation": {

    "Primary Action": recommendation["primary_action"],
    "Material Recovery": recommendation["recovery_method"],
    "Waste Reduction Strategy": recommendation["reduction_strategy"],
    "Recycling Methods": ", ".join(recommendation["recycling_methods"]),
    "Reuse Options": ", ".join(recommendation["reuse_options"])

}

}
    return report


   