from flask import Blueprint, request, jsonify
from backend.utils.load_model import load_model

kidney_bp = Blueprint('kidney', __name__)

model_data = load_model('kidney')

@kidney_bp.route('/predict/kidney', methods=['POST'])
def predict():
    if not model_data:
        return jsonify({"error": "Model not loaded"}), 500
    
    data = request.json
    # Features: ['age', 'sc', 'hemo', 'al', 'sg', 'bu', 'htn']
    
    htn = data.get('hypertension', 'no')
    # Simple manual encoding if encoders not easily accessible or just use logic
    # In training: yes=1, no=0 usually. Let's check encoders from model_data
    encoders = model_data.get('encoders', {})
    
    htn_val = 0
    if 'htn' in encoders:
        try:
            htn_val = encoders['htn'].transform([htn])[0]
        except:
            htn_val = 1 if htn.lower() == 'yes' else 0
    else:
        htn_val = 1 if htn.lower() == 'yes' else 0
        
    features = [
        float(data.get('age', 0)),
        float(data.get('serumCreatinine', 0)),
        float(data.get('hemoglobin', 0)),
        float(data.get('albumin', 0)),
        float(data.get('specificGravity', 0)),
        float(data.get('bloodUrea', 0)),
        htn_val
    ]
    
    try:
        scaler = model_data.get('scaler')
        model = model_data['model']
        
        import numpy as np
        input_data = np.array([features])
        if scaler:
            input_data = scaler.transform(input_data)
            
        prediction = model.predict(input_data)[0]
        # 0: CKD, 1: Not CKD
        result_text = "Chronic Kidney Disease Detected" if prediction == 0 else "Healthy (No CKD)"
        
        return jsonify({
            "prediction": result_text,
            "raw_prediction": int(prediction)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
