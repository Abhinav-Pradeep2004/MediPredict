import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import streamlit as st
import base64
from PIL import Image

# --- Load and Train Model Once ---
@st.cache_resource
def train_model():
    df = pd.read_csv("backend/dataset/train_disease.csv")
    df = df.drop(columns=["Unnamed: 133"])

    df['prognosis'] = df['prognosis'].str.strip().replace({
        'hepatitis A': 'Hepatitis A',
        'Fungal infection': 'Fungal Infection',
        'Chronic cholestasis': 'Chronic Cholestasis',
        'Peptic ulcer diseae': 'Peptic Ulcer Disease',
        'Cervical spondylosis': 'Cervical Spondylosis',
        'Paralysis (brain hemorrhage)': 'Paralysis (Brain Hemorrhage)',
        'Chicken pox': 'Chicken Pox',
        'Alcoholic hepatitis': 'Alcoholic Hepatitis',
        'Dimorphic hemmorhoids(piles)': 'Dimorphic Hemmorhoids (Piles)',
        'Heart attack': 'Heart Attack',
        'Varicose veins': 'Varicose Veins',
        'Urinary tract infection': 'Urinary Tract Infection',
        '(vertigo) Paroymsal  Positional Vertigo': 'Paroymsal Positional Vertigo'
    })

    label_encoder = LabelEncoder()
    df['prognosis'] = label_encoder.fit_transform(df['prognosis'])

    X = df.drop(columns=['prognosis'])
    y = df['prognosis']
    model = RandomForestClassifier(random_state=24)
    model.fit(X, y)

    return model, label_encoder, X.columns

# --- Inference Function ---
def predict_from_csv(df, model, label_encoder, expected_columns):
    features_df = df[expected_columns]
    predictions = model.predict(features_df)
    labels = label_encoder.inverse_transform(predictions)
    return pd.DataFrame({"Prediction": labels})

# --- Streamlit UI ---
st.set_page_config(page_title="MediPredict", layout="centered")
st.title("📊 MediPredict - A Disease Prediction Interface")

# Display logo
with open("MP-1.png", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
st.markdown(
    f"""
    <div style="text-align: center;">
        <img src="data:image/png;base64,{encoded_string}" width="500" style="margin-bottom: 20px;" />
    </div>
    """,
    unsafe_allow_html=True
)

# Upload CSV
uploaded_file = st.file_uploader("📂 Upload your CSV file", type=["csv"])

if uploaded_file is not None:
    try:
        df_input = pd.read_csv(uploaded_file)
        st.success("✅ File uploaded successfully!")

        st.subheader("📄 Uploaded Data Preview:")
        st.dataframe(df_input.head())

        model, label_encoder, expected_cols = train_model()

        st.subheader("🔍 Predictions:")
        predictions_df = predict_from_csv(df_input, model, label_encoder, expected_cols)
        st.dataframe(predictions_df)

        # Download option
        csv = predictions_df.to_csv(index=False).encode("utf-8")
        st.download_button("📥 Download Predictions as CSV", csv, "predictions.csv", "text/csv")

    except Exception as e:
        st.error(f"❌ An error occurred while processing the file:\n\n{e}")
