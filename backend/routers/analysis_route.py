from flask import Blueprint, jsonify, send_from_directory
import os

analysis_bp = Blueprint('analysis', __name__)

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
NOTEBOOKS_DIR = os.path.join(DATA_DIR, 'notebooks')
PLOTS_DIR = os.path.join(DATA_DIR, 'plots')

# Ensure directories exist
os.makedirs(NOTEBOOKS_DIR, exist_ok=True)
os.makedirs(PLOTS_DIR, exist_ok=True)

@analysis_bp.route('/analysis/notebooks', methods=['GET'])
def list_notebooks():
    try:
        files = [f for f in os.listdir(NOTEBOOKS_DIR) if f.endswith('.html') or f.endswith('.ipynb')]
        return jsonify(files)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
        return jsonify(files)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@analysis_bp.route('/analysis/plots/<path:filename>', methods=['GET'])
def get_plot(filename):
    try:
        return send_from_directory(PLOTS_DIR, filename)
    except Exception as e:
        return jsonify({"error": str(e)}), 404
