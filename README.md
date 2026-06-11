# Nirnay - Loan Approval Prediction System

Nirnay is a machine learning-based website that predicts whether a loan application is likely to be approved based on applicant information. The project was built to explore the complete machine learning workflow beyond model training, including backend development, frontend integration, API communication, deployment, and report generation.

## Features

- Loan approval prediction using a trained Machine Learning model
- Clean and responsive user interface
- Flask backend API for model inference
- PDF report generation
- Real-time prediction results
- Deployed and accessible through a website

---

## Tech Stack

### Frontend
- React.js
- Vite
- CSS

### Backend
- Flask
- Flask-CORS

### Machine Learning
- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib

### PDF Generation
- ReportLab

### Deployment
- Vercel
- Render

---

## Input Parameters

The model uses the following applicant details:

- Gender
- Marital Status
- Number of Dependents
- Education
- Self Employment Status
- Applicant Income
- Co-Applicant Income
- Loan Amount
- Loan Amount Term
- Credit History
- Property Area

---

## Project Workflow

### 1. Data Preprocessing

- Cleaned and prepared the loan dataset
- Handled categorical values
- Converted features into machine-readable format
- Prepared data for model training

### 2. Model Training

- Trained a Random Forest Classifier
- Evaluated model performance
- Saved the trained model using Joblib

### 3. Backend Development

- Built REST APIs using Flask
- Loaded the trained model
- Accepted applicant information through POST requests
- Returned prediction results

### 4. Frontend Development

- Developed the user interface using React
- Created forms for collecting applicant information
- Connected frontend with Flask APIs

### 5. PDF Report Generation

- Generated downloadable PDF reports
- Included applicant details and prediction result

---


POST /predict
