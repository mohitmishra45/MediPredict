from flask import Blueprint, jsonify, send_from_directory
import os

analysis_bp = Blueprint('analysis', __name__)

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data')
NOTEBOOKS_DIR = os.path.join(DATA_DIR, 'notebooks')
PLOTS_DIR = os.path.join(DATA_DIR, 'plots')

# Ensure directories exist
os.makedirs(NOTEBOOKS_DIR, exist_ok=True)
os.makedirs(PLOTS_DIR, exist_ok=True)

@analysis_bp.route('/analysis/notebooks', methods=['GET'])
def list_notebooks():
    try:
        files = [f for f in os.listdir(NOTEBOOKS_DIR) if f.endswith('.html') or f.endswith('.ipynb')]
        if not files:
            # Return debug info as a fake file so it shows in UI
            debug_msg = f"DEBUG_CWD_{os.getcwd()}_PATH_{NOTEBOOKS_DIR}_ABS_{os.path.abspath(NOTEBOOKS_DIR)}_CONTENTS_{os.listdir(DATA_DIR) if os.path.exists(DATA_DIR) else 'NO_DATA'}"
            return jsonify([debug_msg])
        return jsonify(files)
    except Exception as e:
        return jsonify([f"ERROR_{str(e)}"]), 200

@analysis_bp.route('/analysis/notebooks/<path:filename>', methods=['GET'])
def get_notebook(filename):
    try:
        return send_from_directory(NOTEBOOKS_DIR, filename)
    except Exception as e:
        return jsonify({"error": str(e)}), 404

@analysis_bp.route('/analysis/plots', methods=['GET'])
def list_plots():
    try:
        files = [f for f in os.listdir(PLOTS_DIR) if f.endswith('.png') or f.endswith('.jpg') or f.endswith('.jpeg')]
        if not files:
             debug_msg = f"DEBUG_CWD_{os.getcwd()}_PATH_{PLOTS_DIR}_ABS_{os.path.abspath(PLOTS_DIR)}_CONTENTS_{os.listdir(DATA_DIR) if os.path.exists(DATA_DIR) else 'NO_DATA'}"
             return jsonify([debug_msg])
        return jsonify(files)
    except Exception as e:
        return jsonify([f"ERROR_{str(e)}"]), 200

@analysis_bp.route('/analysis/plots/<path:filename>', methods=['GET'])
def get_plot(filename):
    try:
        return send_from_directory(PLOTS_DIR, filename)
    except Exception as e:
        return jsonify({"error": str(e)}), 404
