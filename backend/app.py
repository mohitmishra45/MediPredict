from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

from backend.routers.diabetes_route import diabetes_bp
from backend.routers.heart_route import heart_bp
from backend.routers.kidney_route import kidney_bp
from backend.routers.liver_route import liver_bp
from backend.routers.ai_tracker_route import ai_tracker_bp
from backend.routers.stroke_route import stroke_bp
from backend.utils.load_model import load_model

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(diabetes_bp, url_prefix='/api')
app.register_blueprint(heart_bp, url_prefix='/api')
app.register_blueprint(kidney_bp, url_prefix='/api')
app.register_blueprint(liver_bp, url_prefix='/api')
app.register_blueprint(ai_tracker_bp, url_prefix='/api')
app.register_blueprint(stroke_bp, url_prefix='/api')
from backend.routers.analysis_route import analysis_bp
app.register_blueprint(analysis_bp, url_prefix='/api')

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({"status": "running"})

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "MedPredict API is running. Access endpoints at /api/..."})

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    models = ['diabetes', 'heart', 'kidney', 'liver', 'lung', 'stroke']
    metrics = {}
    
    for name in models:
        data = load_model(name)
        if data:
            metrics[name] = {
                "accuracy": f"{data.get('accuracy', 0):.2f}%",
                "best_model": str(data['model'].__class__.__name__),
                "all_accuracies": data.get('all_accuracies', {})
            }
        else:
            metrics[name] = {"accuracy": "N/A", "best_model": "Not Available"}
            
    return jsonify(metrics)

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, port=port)
