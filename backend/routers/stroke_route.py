from flask import Blueprint, request, jsonify
from backend.utils.load_model import load_model

stroke_bp = Blueprint('stroke', __name__)

model_data = load_model('stroke')

@stroke_bp.route('/predict/stroke', methods=['POST'])
def predict():
    if not model_data:
        return jsonify({"error": "Model not loaded"}), 500
    
    data = request.json
    # Features: ['age', 'hypertension', 'heart_disease', 'avg_glucose_level', 'bmi', 'smoking_status']
    
    smoking = data.get('smokingStatus', 'never smoked')
    encoders = model_data.get('encoders', {})
    
    smoking_val = 0
    if 'smoking_status' in encoders:
        try:
            smoking_val = encoders['smoking_status'].transform([smoking])[0]
        except:
            smoking_val = 0
            
    features = [
        float(data.get('age', 0)),
        int(data.get('hypertension', 0)),
        int(data.get('heartDisease', 0)),
        float(data.get('avgGlucoseLevel', 0)),
        float(data.get('bmi', 0)),
        smoking_val
    ]
    
    try:
        scaler = model_data.get('scaler')
        model = model_data['model']
        
        import numpy as np
        input_data = np.array([features])
        if scaler:
            input_data = scaler.transform(input_data)
            
        prediction = model.predict(input_data)[0]
        result_text = "Stroke Risk" if prediction == 1 else "No Stroke Risk"
        
        return jsonify({
            "prediction": result_text,
            "raw_prediction": int(prediction)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
