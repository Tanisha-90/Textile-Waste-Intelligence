from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
import os
from datetime import datetime




def create_pdf(report):

    folder = "app/reports/generated"

    os.makedirs(
        folder,
        exist_ok=True
    )


    file_path = os.path.join(
        folder,
        "textile_waste_report.pdf"
    )


    doc = SimpleDocTemplate(
        file_path,
        pagesize=letter
    )


    styles = getSampleStyleSheet()


    content = []


    title = Paragraph(
        "Textile Waste Intelligence Report",
        styles["Title"]
    )


    content.append(title)

    content.append(
        Spacer(1,20)
    )
    date = Paragraph(
    "Generated On: " + datetime.now().strftime("%d-%m-%Y %H:%M"),
    styles["Normal"]
    )

    content.append(date)

    content.append(
        Spacer(1,20)
    )


    for section, data in report.items():
            
        heading = Paragraph(
        f"◆ {section}",
        styles["Heading2"]
    )    
        

        content.append(heading)


        table_data = [
            ["Parameter","Result"]
        ]


        for key,value in data.items():

            table_data.append(
                [
                    key,
                    str(value)
                ]
            )


        table = Table(
            table_data
        )
        table.setStyle(
    TableStyle(
        [

        # Header row
        (
        "BACKGROUND",
        (0,0),
        (-1,0),
        "#0f766e"
        ),


        (
        "TEXTCOLOR",
        (0,0),
        (-1,0),
        "#ffffff"
        ),


        (
        "FONTNAME",
        (0,0),
        (-1,0),
        "Helvetica-Bold"
        ),


        # Parameter column
        (
        "FONTNAME",
        (0,1),
        (0,-1),
        "Helvetica-Bold"
        ),


        # Grid
        (
        "GRID",
        (0,0),
        (-1,-1),
        0.5,
        "#94a3b8"
        ),


        # Padding
        (
        "LEFTPADDING",
        (0,0),
        (-1,-1),
        10
        ),


        (
        "RIGHTPADDING",
        (0,0),
        (-1,-1),
        10
        ),


        (
        "TOPPADDING",
        (0,0),
        (-1,-1),
        8
        ),


        (
        "BOTTOMPADDING",
        (0,0),
        (-1,-1),
        8
        ),


        (
        "VALIGN",
        (0,0),
        (-1,-1),
        "MIDDLE"
        )

        ]
    )
)


       


        content.append(table)

        content.append(
            Spacer(1,20)
        )


    doc.build(content)


    return file_path