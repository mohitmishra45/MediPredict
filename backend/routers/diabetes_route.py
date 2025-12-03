from flask import Blueprint, request, jsonify
from backend.utils.load_model import load_model
from backend.utils.preprocess import preprocess_input

diabetes_bp = Blueprint('diabetes', __name__)

model_data = load_model('diabetes')

@diabetes_bp.route('/predict/diabetes', methods=['POST'])
def predict():
    if not model_data:
        return jsonify({"error": "Model not loaded"}), 500
    
    data = request.json
    # Features: ['Pregnancies','Glucose','Blood pressure','Insulin','Age','Body mass index']
    # Frontend sends camelCase, map to list
    features = [
        float(data.get('pregnancies', 0)),
        float(data.get('glucose', 0)),
        float(data.get('bloodPressure', 0)),
        float(data.get('insulin', 0)),
        float(data.get('age', 0)),
        float(data.get('bmi', 0))
    ]
    
    try:
        scaler = model_data.get('scaler')
        model = model_data['model']
        
        # Manual preprocessing since features are simple list here
        import numpy as np
        input_data = np.array([features])
        if scaler:
            input_data = scaler.transform(input_data)
            
        prediction = model.predict(input_data)[0]
        result_text = "Diabetic" if prediction == 1 else "Not Diabetic"
        
        return jsonify({
            "prediction": result_text,
            "raw_prediction": int(prediction)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
