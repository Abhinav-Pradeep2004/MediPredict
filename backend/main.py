from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

# Load model and metadata
model = joblib.load("model/xgb_model.pkl")
all_symptoms = joblib.load("model/all_symptoms.pkl")
target_encoder = joblib.load("model/label_encoder.pkl")

# Initialize FastAPI app
app = FastAPI()

# CORS settings — open for dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can change to ["http://localhost:5173"] later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class SymptomInput(BaseModel):
    symptoms: list[str]  # Accepts 1 to 6 symptoms

# Prediction endpoint
@app.post("/predict")
def predict_disease(data: SymptomInput):
    if not data.symptoms:
        raise HTTPException(status_code=400, detail="No symptoms provided")

    symptoms = [s.lower().strip() for s in data.symptoms if s.strip()]
    print("Symptoms received:", symptoms)

    if len(symptoms) == 0:
        raise HTTPException(status_code=400, detail="Empty symptoms submitted")

    # One-hot encode input
    input_vector = [1 if symptom in symptoms else 0 for symptom in all_symptoms]
    input_df = pd.DataFrame([input_vector], columns=all_symptoms)

    # Predict
    try:
        pred = model.predict(input_df)
        disease = target_encoder.inverse_transform(pred)[0]
        return {"predicted_disease": disease}
    except Exception as e:
        print("Prediction error:", e)
        raise HTTPException(status_code=500, detail="Prediction failed")
