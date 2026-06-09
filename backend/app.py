from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

import os
import joblib

model_path = os.path.join(os.path.dirname(__file__), "loan_model.pkl")
model = joblib.load(model_path)

@app.route("/")
def home():
    return "Nirnay Backend Running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400

    try:
        features = [[
            data["Gender"],
            data["Married"],
            data["Dependents"],
            data["Education"],
            data["Self_Employed"],
            data["ApplicantIncome"],
            data["CoapplicantIncome"],
            data["LoanAmount"],
            data["Loan_Amount_Term"],
            data["Credit_History"],
            data["Property_Area_Semiurban"],
            data["Property_Area_Urban"]
        ]]

        prediction = model.predict(features)[0]
        prediction = int(prediction)

        label = "Approved" if prediction == 1 else "Rejected"

        return jsonify({
                        "prediction": prediction,
                        "result": label
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run()

