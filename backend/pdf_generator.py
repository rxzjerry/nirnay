from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO
from reportlab.platypus import Table, TableStyle
from reportlab.lib import colors

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

    items = list(data.items())
    table_data = []
    for i in range(0, len(items), 2):

        row = []

    key1, val1 = items[i]
    row.append(f"{key1}: {val1}")

    if i + 1 < len(items):
        key2, val2 = items[i + 1]
        row.append(f"{key2}: {val2}")
    else:
        row.append("")

    table_data.append(row)
    table = Table(table_data, colWidths=[250, 250])
    table.setStyle(TableStyle([
        ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    content.append(table)
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