from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

def generate_pdf(data, prediction, filename):

    pdf = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    content = []

    title = Paragraph("NIRNAY - Loan Assessment Report", styles["Title"])

    content.append(title)

    content.append(Spacer(1, 20))

    for key, value in data.items():

        text = Paragraph(
            f"<b>{key}</b>: {value}",
            styles["BodyText"]
        )

        content.append(text)

        content.append(Spacer(1, 5))

    content.append(Spacer(1, 15))

    result = Paragraph(
        f"<b>Prediction Result:</b> {prediction}",
        styles["Heading2"]
    )

    content.append(result)

    pdf.build(content)