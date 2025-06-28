from fastapi import FastAPI
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or ["*"] for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Request schema
class SymptomInput(BaseModel):
    symptoms: list[str]  # exactly 6 symptoms

# Prediction endpoint
@app.post("/predict")
def predict_disease(data: SymptomInput):
    symptoms = [s.lower().strip() for s in data.symptoms]

    # One-hot encode input
    input_vector = [1 if symptom in symptoms else 0 for symptom in all_symptoms]
    input_df = pd.DataFrame([input_vector], columns=all_symptoms)

    # Predict
    pred = model.predict(input_df)
    disease = target_encoder.inverse_transform(pred)[0]
    
    return {"predicted_disease": disease}
