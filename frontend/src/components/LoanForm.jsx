import { useState } from "react";

function LoanForm() {
  const [gender, setGender] = useState("");
  const [married, setMarried] = useState("");
  const [dependents, setDependents] = useState("");
  const [education, setEducation] = useState("");
  const [selfEmployed, setSelfEmployed] = useState("");
  const [applicantIncome, setApplicantIncome] = useState("");
  const [coapplicantIncome, setCoapplicantIncome] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [creditHistory, setCreditHistory] = useState("");
  const [propertyArea, setPropertyArea] = useState("");

  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    if (
      !gender ||
      !married ||
      !dependents ||
      !education ||
      !selfEmployed ||
      !applicantIncome ||
      !coapplicantIncome ||
      !loanAmount ||
      !loanTerm ||
      !creditHistory ||
      !propertyArea
    ) {
      alert("Please fill all fields");
      return;
    }

    let semiurban = 0;
    let urban = 0;

    if (propertyArea === "Semiurban") {
      semiurban = 1;
    }

    if (propertyArea === "Urban") {
      urban = 1;
    }

    const formData = {
      Gender: Number(gender),
      Married: Number(married),
      Dependents: Number(dependents),
      Education: Number(education),
      Self_Employed: Number(selfEmployed),
      ApplicantIncome: Number(applicantIncome),
      CoapplicantIncome: Number(coapplicantIncome),
      LoanAmount: Number(loanAmount),
      Loan_Amount_Term: Number(loanTerm),
      Credit_History: Number(creditHistory),
      Property_Area_Semiurban: semiurban,
      Property_Area_Urban: urban,
    };

    try {
      const response = await fetch(
        "https://nirnay-5nfx.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      setResult(data.result);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }
  };

  const downloadReport = async () => {
    let semiurban = 0;
    let urban = 0;

    if (propertyArea === "Semiurban") {
      semiurban = 1;
    } else if (propertyArea === "Urban") {
      urban = 1;
    }

    const reportData = {
      Gender: gender,
      Married: married,
      Dependents: dependents,
      Education: education,
      Self_Employed: selfEmployed,
      ApplicantIncome: applicantIncome,
      CoapplicantIncome: coapplicantIncome,
      LoanAmount: loanAmount,
      Loan_Amount_Term: loanTerm,
      Credit_History: creditHistory,
      PropertyArea: propertyArea,
      Property_Area_Semiurban: semiurban,
      Property_Area_Urban: urban,
      result: result,
    };

    const response = await fetch(
      "https://nirnay-5nfx.onrender.com/generate-pdf",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      }
    );

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "Loan_Report.pdf";
    a.click();
  };

  return (
    <div className="main-container">
      <div className="form-card">

        <div className="hero-section">
          <h1>NIRNAY</h1>

          <h2>Smarter Loan Decisions. Faster Approvals.</h2>

          <p>
            Analyze applicant information and receive instant
            loan approval recommendations.
          </p>
        </div>

        <div className="form-grid">

          <div className="input-group">
            <label>Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
          </div>

          <div className="input-group">
            <label>Marital Status</label>
            <select
              value={married}
              onChange={(e) => setMarried(e.target.value)}
            >
              <option value="">Select Marital Status</option>
              <option value="1">Married</option>
              <option value="0">Not Married</option>
            </select>
          </div>

          <div className="input-group">
            <label>Number of Dependents</label>
            <select
              value={dependents}
              onChange={(e) => setDependents(e.target.value)}
            >
              <option value="">Select Dependents</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>

          <div className="input-group">
            <label>Education</label>
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            >
              <option value="">Select Education</option>
              <option value="1">Graduate</option>
              <option value="0">Not Graduate</option>
            </select>
          </div>

          <div className="input-group">
            <label>Self Employment Status</label>
            <select
              value={selfEmployed}
              onChange={(e) => setSelfEmployed(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="1">Self Employed</option>
              <option value="0">Not Self Employed</option>
            </select>
          </div>

          <div className="input-group">
            <label>Applicant Income</label>
            <input
              type="number"
              placeholder="Enter Applicant Income"
              value={applicantIncome}
              onChange={(e) => setApplicantIncome(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Co-Applicant Income</label>
            <input
              type="number"
              placeholder="Enter Co-Applicant Income"
              value={coapplicantIncome}
              onChange={(e) => setCoapplicantIncome(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Loan Amount</label>
            <input
              type="number"
              placeholder="Enter Loan Amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Loan Term (Months)</label>
            <input
              type="number"
              placeholder="Enter Loan Term"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Credit History</label>
            <select
              value={creditHistory}
              onChange={(e) => setCreditHistory(e.target.value)}
            >
              <option value="">Select Credit History</option>
              <option value="1">Good</option>
              <option value="0">Poor</option>
            </select>
          </div>

          <div className="input-group">
            <label>Property Area</label>
            <select
              value={propertyArea}
              onChange={(e) => setPropertyArea(e.target.value)}
            >
              <option value="">Select Property Area</option>
              <option value="Rural">Rural</option>
              <option value="Semiurban">Semiurban</option>
              <option value="Urban">Urban</option>
            </select>
          </div>

        </div>

        <button
          className="predict-btn"
          onClick={handleSubmit}
        >
          Check Loan Approval Status
        </button>

        {result && (
          <div className="result-section">

            <h2
              className={
                result === "Approved"
                  ? "approved-text"
                  : "rejected-text"
              }
            >
              {result === "Approved"
                ? "Loan Likely To Be Approved"
                : "Loan Likely To Be Rejected"}
            </h2>

            <p>
              {result === "Approved"
                ? "Based on the provided applicant information, the application satisfies the approval criteria."
                : "The application currently does not meet the approval criteria used by the model."}
            </p>

            <button
              className="download-btn"
              onClick={downloadReport}
            >
              Download Assessment Report
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default LoanForm;