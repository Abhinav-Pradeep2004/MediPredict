import React, { useState } from 'react';
import axios from 'axios';

function PredictorForm() {
  const [symptoms, setSymptoms] = useState(Array(6).fill(''));
  const [prediction, setPrediction] = useState('');

  const handleChange = (index, value) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = value;
    setSymptoms(newSymptoms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', {
        symptoms,
      });
      setPrediction(response.data.predicted_disease);
    } catch (error) {
      setPrediction('Error: Could not get prediction.');
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <form onSubmit={handleSubmit}>
        <h4>Enter 6 Symptoms</h4>
        {symptoms.map((symptom, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Symptom ${index + 1}`}
              value={symptom}
              onChange={(e) => handleChange(index, e.target.value)}
              required
              style={{ marginBottom: '0.5rem', padding: '0.5rem', width: '300px' }}
            />
          </div>
        ))}
        <br />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Predict Disease
        </button>
      </form>
      {prediction && (
        <div style={{ marginTop: '1rem' }}>
          <h3>🧠 Predicted Disease:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default PredictorForm;
