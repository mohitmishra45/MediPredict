from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('GEMINI_API_KEY')
client = genai.Client(api_key=api_key)

try:
    with open('models.txt', 'w') as f:
        models = client.models.list()
        for m in models:
            f.write(f"{m.name}\n")
    print("Models written to models.txt")
except Exception as e:
    print(f"Error: {e}")
