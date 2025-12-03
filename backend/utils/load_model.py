import joblib
import os

MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models')

def load_model(model_name):
    path = os.path.join(MODEL_DIR, f'{model_name}_model.pkl')
    if os.path.exists(path):
        try:
            return joblib.load(path)
        except Exception as e:
            print(f"Error loading {model_name} model: {e}")
            return None
    else:
        print(f"Model file {path} not found.")
        return None
