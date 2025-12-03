from flask import Blueprint, request, jsonify
from backend.utils.load_model import load_model

lung_bp = Blueprint('lung', __name__)

model_data = load_model('lung')

@lung_bp.route('/predict/lung', methods=['POST'])
def predict():
    if not model_data:
        return jsonify({"error": "Model not loaded"}), 500
    
    data = request.json
    # Features: ['Gender','Age','Passive Smoker','Coughing of Blood','Balanced Diet','Smoking','Air Pollution','Obesity']
    
    gender = data.get('gender', 'Male')
    encoders = model_data.get('encoders', {})
    
    gender_val = 0
    if 'Gender' in encoders:
        try:
            gender_val = encoders['Gender'].transform([gender])[0]
        except:
            gender_val = 1 if gender.lower() == 'male' else 0
    else:
        gender_val = 1 if gender.lower() == 'male' else 0
        
    features = [
        gender_val,
        float(data.get('age', 0)),
        float(data.get('passiveSmoker', 1)),
        float(data.get('coughingOfBlood', 1)),
        float(data.get('balancedDiet', 1)),
        float(data.get('smoking', 1)),
        float(data.get('airPollution', 1)),
        float(data.get('obesity', 1))
    ]
    
    try:
        scaler = model_data.get('scaler')
        model = model_data['model']
        
        import numpy as np
        input_data = np.array([features])
        if scaler:
            input_data = scaler.transform(input_data)
            
        prediction = model.predict(input_data)[0]
        
        if prediction == 0:
            result_text = "High Risk of Lung Cancer"
        elif prediction == 1:
            result_text = "Low Risk of Lung Cancer"
        else:
            result_text = "Medium Risk of Lung Cancer"
        
        return jsonify({
            "prediction": result_text,
            "raw_prediction": int(prediction)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
