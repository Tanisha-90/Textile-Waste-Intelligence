from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors



def safe(data,key):

    value = data.get(key)

    if value is None or value == "":
        return "N/A"

    return value



def generate_pdf(data, filename):


    doc = SimpleDocTemplate(
        filename,
        pagesize=letter
    )


    styles = getSampleStyleSheet()


    content=[]



    title = Paragraph(
        "EcoWeave AI - Sustainability Analysis Report",
        styles["Title"]
    )


    content.append(title)

    content.append(
        Spacer(1,20)
    )



    sustainability = data.get(
        "sustainability",
        {}
    )


    environmental = data.get(
        "environmental",
        {}
    )


    waste = data.get(
        "waste_score",
        {}
    )



    rows=[

        ["SUSTAINABILITY ANALYSIS",""],


        ["Material",
        safe(sustainability,"material")],


        ["Weight (Kg)",
        safe(sustainability,"weight")],


        ["Condition",
        safe(sustainability,"condition")],


        ["Recovered Weight",
        safe(sustainability,"recovered_weight")],


        ["Reused Weight",
        safe(sustainability,"reused_weight")],



        ["Carbon Footprint",
        f'{safe(sustainability,"carbon_footprint")} kg CO2'],


        ["Waste Diversion",
        f'{safe(sustainability,"waste_diversion")} %'],


        ["Resource Recovery",
        f'{safe(sustainability,"resource_recovery")} %'],


        ["Circular Status",
        safe(sustainability,"circular_status")],


        ["Benchmark",
        safe(sustainability,"benchmark")],




        ["ENVIRONMENTAL IMPACT",""],


        ["CO2 Savings",
        f'{safe(environmental,"co2_savings")} kg CO2'],


        ["Water Savings",
        f'{safe(environmental,"water_savings")} Litres'],


        ["Landfill Reduction",
        f'{safe(environmental,"landfill_reduction")} %'],


        ["Resource Conservation",
        f'{safe(environmental,"resource_conservation")} %'],


       
        ["Environment Score",
         f'{safe(environmental, "environment_score") if safe(environmental, "environment_score") != "N/A" else safe(environmental, "sustainability_score")}%'],
# f'{safe(environmental,"environment_score") 
# if safe(environmental,"environment_score")!="N/A"
# else safe(environmental,"sustainability_score") }%'], 





        ["WASTE SCORE ANALYSIS",""],



        ["Recyclability Score",
        f'{safe(waste,"recyclability_score")} %'],


        ["Recyclability Level",
        safe(waste,"recyclability_level") 
        if safe(waste,"recyclability_level")!="N/A"
        else safe(waste,"recyclability_category")],



        ["Reuse Score",
        f'{safe(waste,"reuse_score")} %'],


        ["Reuse Level",
        safe(waste,"reuse_level")],



        ["Sustainability Score",
        f'{safe(waste,"sustainability_score")} %'],


        ["Sustainability Level",
        safe(waste,"sustainability_level")],



        ["Material Recovery Score",
        f'{safe(waste,"material_recovery_score")} %'],



        ["Circularity Score",
        f'{safe(waste,"circularity_score")} %'],


        ["Circularity Category",
        safe(waste,"circularity_category")
        if safe(waste,"circularity_category")!="N/A"
        else safe(waste,"category")]

    ]




    table=Table(
        rows,
        colWidths=[220,220]
    )



    table.setStyle(

        TableStyle([


            (
            "GRID",
            (0,0),
            (-1,-1),
            0.5,
            colors.grey
            ),



            (
            "BACKGROUND",
            (0,0),
            (-1,0),
            colors.lightgreen
            ),



            (
            "BACKGROUND",
            (0,12),
            (-1,12),
            colors.lightblue
            ),



            (
            "BACKGROUND",
            (0,17),
            (-1,17),
            colors.lightgrey
            ),



            (
            "FONT",
            (0,0),
            (-1,-1),
            "Helvetica"
            ),



            (
            "VALIGN",
            (0,0),
            (-1,-1),
            "MIDDLE"
            )

        ])

    )



    content.append(table)



    doc.build(content)