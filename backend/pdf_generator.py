from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO

def decode_data(data):
    decoded = {}

    for key, value in data.items():

        if key == "Gender":
            decoded[key] = "Male" if value == 1 else "Female"

        elif key == "Married":
            decoded[key] = "Yes" if value == 1 else "No"

        elif key == "Education":
            decoded[key] = "Graduate" if value == 1 else "Not Graduate"

        elif key == "Self_Employed":
            decoded[key] = "Yes" if value == 1 else "No"

        elif key == "Credit_History":
            decoded[key] = "Good" if value == 1 else "Bad"

        elif key == "Property_Area_Semiurban":
            decoded[key] = "Semiurban" if value == 1 else ""

        elif key == "Property_Area_Urban":
            decoded[key] = "Urban" if value == 1 else ""

        else:
            decoded[key] = value

    return decoded

def generate_pdf(data, prediction):

    buffer = BytesIO()

    pdf = SimpleDocTemplate(buffer)
    styles = getSampleStyleSheet()

    content = []

    title = Paragraph("NIRNAY - Loan Assessment Report", styles["Title"])
    content.append(title)
    content.append(Spacer(1, 20))

    data = decode_data(data)

    for key, value in data.items():
        text = Paragraph(f"<b>{key}</b>: {value}", styles["BodyText"])
        content.append(text)
        content.append(Spacer(1, 5))

    content.append(Spacer(1, 15))

    result = Paragraph(
        f"<b>Prediction Result:</b> {prediction}",
        styles["Heading2"]
    )
    content.append(result)

    pdf.build(content)

    buffer.seek(0)
    return buffer