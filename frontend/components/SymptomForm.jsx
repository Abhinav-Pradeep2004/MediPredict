import { useState } from "react";

function SymptomForm() {
  const [symptoms, setSymptoms] = useState([""]);
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  // Handle user typing a symptom
  const handleSymptomChange = (value, index) => {
    const updated = [...symptoms];
    updated[index] = value;
    setSymptoms(updated);
  };

  // Add new symptom field
  const addSymptom = () => {
    if (symptoms.length < 6) {
      setSymptoms([...symptoms, ""]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error
    setPrediction("");

    // Filter out empty fields
    const filteredSymptoms = symptoms.map(s => s.trim()).filter(s => s !== "");

    if (filteredSymptoms.length === 0) {
      setError("Please enter at least one symptom.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: filteredSymptoms }),
      });

      if (!res.ok) {
        setError("Server error: Unable to predict disease.");
        return;
      }

      const data = await res.json();
      setPrediction(data.predicted_disease);
    } catch (err) {
      console.error("Error calling prediction API:", err);
      setError("Failed to contact server. Is FastAPI running?");
    }
  };

  return (
    <div className="container">
      <h2>Enter Your Symptoms</h2>
      <form onSubmit={handleSubmit}>
        {symptoms.map((symptom, i) => (
          <div className="form-group" key={i}>
            <label>Symptom {i + 1}</label>
            <input
              type="text"
              value={symptom}
              onChange={(e) => handleSymptomChange(e.target.value, i)}
              placeholder="e.g., headache"
            />
          </div>
        ))}

        {symptoms.length < 6 && (
          <button type="button" onClick={addSymptom}>
            + Add Symptom
          </button>
        )}

        <button type="submit" style={{ marginTop: "1rem" }}>
          Predict Disease
        </button>
      </form>

      {error && (
        <div style={{ marginTop: "1rem", color: "red", fontWeight: "bold" }}>
          ⚠️ {error}
        </div>
      )}

      {prediction && (
        <div style={{ marginTop: "2rem", fontSize: "1.2rem", color: "green" }}>
          🧬 Predicted Disease: <strong>{prediction}</strong>
        </div>
      )}
    </div>
  );
}

export default SymptomForm;
