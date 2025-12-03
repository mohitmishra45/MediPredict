from flask import Blueprint, request, jsonify
from backend.utils.load_model import load_model

heart_bp = Blueprint('heart', __name__)

model_data = load_model('heart')

@heart_bp.route('/predict/heart', methods=['POST'])
def predict():
    if not model_data:
        return jsonify({"error": "Model not loaded"}), 500
    
    data = request.json
    # Features: ['Age','Sex','Chest pain type','BP','Cholesterol','Max HR']
    features = [
        float(data.get('age', 0)),
        float(data.get('sex', 0)),
        float(data.get('cp', 0)),
        float(data.get('trestbps', 0)), # BP
        float(data.get('chol', 0)),
        float(data.get('thalach', 0))   # Max HR
    ]
    
    try:
        scaler = model_data.get('scaler')
        model = model_data['model']
        
        import numpy as np
        input_data = np.array([features])
        if scaler:
            input_data = scaler.transform(input_data)
            
        prediction = model.predict(input_data)[0]
        
        # Handle potential string output from older models or label encoding issues
        raw_pred = 0
        if str(prediction) == 'Presence':
            raw_pred = 1
        elif str(prediction) == 'Absence':
            raw_pred = 0
        else:
            try:
                raw_pred = int(prediction)
            except:
                raw_pred = 0

        result_text = "Heart Disease Detected" if raw_pred == 1 else "No Heart Disease"
        
        return jsonify({
            "prediction": result_text,
            "raw_prediction": raw_pred
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
