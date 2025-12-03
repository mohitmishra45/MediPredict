from flask import Blueprint, request, jsonify
from backend.utils.load_model import load_model

liver_bp = Blueprint('liver', __name__)

model_data = load_model('liver')

@liver_bp.route('/predict/liver', methods=['POST'])
def predict():
    if not model_data:
        return jsonify({"error": "Model not loaded"}), 500
    
    data = request.json
    # Features: ['Age of the patient','Gender of the patient','Total Bilirubin','Direct Bilirubin','Sgot Aspartate Aminotransferase']
    
    gender = data.get('gender', 'Male')
    encoders = model_data.get('encoders', {})
    
    gender_val = 0
    if 'Gender of the patient' in encoders:
        try:
            gender_val = encoders['Gender of the patient'].transform([gender])[0]
        except:
            gender_val = 1 if gender.lower() == 'male' else 0
    else:
        gender_val = 1 if gender.lower() == 'male' else 0
        
    features = [
        float(data.get('age', 0)),
        gender_val,
        float(data.get('totalBilirubin', 0)),
        float(data.get('directBilirubin', 0)),
        float(data.get('sgot', 0))
    ]
    
    try:
        scaler = model_data.get('scaler')
        model = model_data['model']
        
        import numpy as np
        input_data = np.array([features])
        if scaler:
            input_data = scaler.transform(input_data)
            
        prediction = model.predict(input_data)[0]
        result_text = "Liver Disease" if prediction == 1 else "No Liver Disease"
        
        return jsonify({
            "prediction": result_text,
            "raw_prediction": int(prediction)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
