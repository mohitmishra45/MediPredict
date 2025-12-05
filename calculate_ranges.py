import pandas as pd
import os
import json

data_dir = r'c:\Users\mohit\OneDrive\Desktop\MedPredict\backend\data'
files = {
    'heart': 'Heart_Disease_Prediction.csv',
    'diabetes': 'diabetes.csv',
    'kidney': 'kidney.csv',
    'liver': 'liver.csv',
    'lung': 'lung.csv',
    'stroke': 'stroke.csv'
}

ranges = {}

for disease, filename in files.items():
    filepath = os.path.join(data_dir, filename)
    if os.path.exists(filepath):
        try:
            df = pd.read_csv(filepath)
            # Clean column names to match what might be in frontend (simplified)
            # But actually I need to map them manually or just output all and pick
            ranges[disease] = {}
            for col in df.columns:
                # Handle non-numeric columns if any (though most seem numeric or categorical encoded)
                if pd.api.types.is_numeric_dtype(df[col]):
                    ranges[disease][col] = {
                        'min': float(df[col].min()),
                        'max': float(df[col].max())
                    }
        except Exception as e:
            print(f"Error processing {filename}: {e}")



with open('ranges.json', 'w') as f:
    json.dump(ranges, f, indent=2)
print("Ranges calculated and saved to ranges.json")
