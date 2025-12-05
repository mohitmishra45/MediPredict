import pandas as pd
import json

try:
    df = pd.read_csv(r'c:\Users\mohit\OneDrive\Desktop\MedPredict\backend\data\liver.csv', encoding='latin1')
    ranges = {}
    for col in df.columns:
        if pd.api.types.is_numeric_dtype(df[col]):
            ranges[col] = {
                'min': float(df[col].min()),
                'max': float(df[col].max())
            }
    print(json.dumps(ranges, indent=2))
except Exception as e:
    print(f"Error: {e}")
