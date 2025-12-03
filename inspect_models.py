import joblib
import os
import sys

# Add current directory to path so we can import backend modules if needed
sys.path.append(os.getcwd())

model_dir = 'backend/models'
models = ['diabetes', 'heart', 'kidney', 'liver', 'lung', 'stroke']

print("Inspecting models...")

for name in models:
    try:
        # Try loading joblib first
        path = os.path.join(model_dir, f'{name}_model.joblib')
        if not os.path.exists(path):
            path = os.path.join(model_dir, f'{name}_model.pkl')
        
        if os.path.exists(path):
            data = joblib.load(path)
            model = data.get('model')
            accuracy = data.get('accuracy')
            with open('model_info.txt', 'a') as f:
                f.write(f"Model: {name}\n")
                f.write(f"  Type: {type(model).__name__}\n")
                if hasattr(model, 'estimators_'):
                    f.write(f"  Estimators: {len(model.estimators_)}\n")
                f.write(f"  Accuracy: {accuracy}\n")
                f.write("-" * 20 + "\n")
        else:
            with open('model_info.txt', 'a') as f:
                f.write(f"Model {name} not found.\n")
    except Exception as e:
        with open('model_info.txt', 'a') as f:
            f.write(f"Error loading {name}: {e}\n")
