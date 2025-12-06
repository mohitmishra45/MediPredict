from flask import Blueprint, request, jsonify
from google import genai
from PIL import Image
import io
import base64
import os

ai_tracker_bp = Blueprint('ai_tracker', __name__)

# Configure Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

if GEMINI_API_KEY:
    try:
        client = genai.Client(api_key=GEMINI_API_KEY)
    except Exception as e:
        print(f"Error initializing Gemini Client: {e}")
        client = None
else:
    print("Warning: GEMINI_API_KEY not found in environment variables.")
    client = None

@ai_tracker_bp.route('/ai-tracker/chat', methods=['POST'])
def chat():
    if not client:
        return jsonify({"error": "AI service not configured. Missing API Key."}), 503

    try:
        data = request.json
        user_message = data.get('message', '')
        image_data = data.get('image') # Expecting base64 string
        
        if not user_message and not image_data:
            return jsonify({"error": "Message or image is required"}), 400

        # Simple prompt engineering for medical context
        system_prompt = """You are a helpful AI medical assistant. 
        
        **CRITICAL INSTRUCTION: FORMAT YOUR RESPONSE USING MARKDOWN.**
        
        If an image is provided:
        1. Analyze it thoroughly.
        2. Provide your findings in a **concise, bulleted list**.
        3. Focus on key visual observations.
        
        For general questions:
        1. Provide clear and helpful medical information.
        2. **ALWAYS use bullet points** or numbered lists to structure your answer.
        3. Avoid long paragraphs. Use headers and bold text for clarity.
        
        **CRITICAL DISCLAIMER:** Always advise the user to consult a doctor for a professional diagnosis. Do not provide definitive medical diagnoses. This is for informational purposes only."""
        
        contents = [system_prompt, "\n\nUser: ", user_message]

        if image_data:
            try:
                # Remove header if present (e.g., "data:image/jpeg;base64,")
                if "base64," in image_data:
                    image_data = image_data.split("base64,")[1]
                
                image_bytes = base64.b64decode(image_data)
                image = Image.open(io.BytesIO(image_bytes))
                contents.append(image)
            except Exception as img_err:
                print(f"Error processing image: {img_err}")
                return jsonify({"error": "Invalid image data"}), 400

        # Using the new SDK pattern
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents
        )
        
        return jsonify({
            "response": response.text
        })

    except Exception as e:
        print(f"Error in AI Tracker: {e}")
        return jsonify({"error": str(e)}), 500
