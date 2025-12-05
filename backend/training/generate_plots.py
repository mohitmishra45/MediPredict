import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import os
from sklearn.preprocessing import LabelEncoder

# Ensure directories exist
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
PLOTS_DIR = os.path.join(DATA_DIR, 'plots')
os.makedirs(PLOTS_DIR, exist_ok=True)

def save_plot(corr, title, filename):
    plt.figure(figsize=(12, 10))
    ax = sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f", linewidths=0.5)
    plt.title(title, pad=20)
    
    # Move x-axis labels to top
    ax.xaxis.tick_top()
    ax.xaxis.set_label_position('top')
    
    plt.xticks(rotation=45, ha='left')
    plt.yticks(rotation=0)
    plt.tight_layout()
    plt.savefig(os.path.join(PLOTS_DIR, filename))
    plt.close()
    print(f"Saved {filename}")

def plot_diabetes():
    print("Generating Diabetes Plot...")
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, 'diabetes.csv'))
        df[['Glucose','Blood pressure','Insulin']] = df[['Glucose','Blood pressure','Insulin']].replace(0, np.nan)
        for i in df.select_dtypes(include='number').columns:
            df[i] = df[i].fillna(df[i].mean())
            
        X = df[['Pregnancies','Glucose','Blood pressure','Insulin','Age','Body mass index']]
        corr = X.corr()
        save_plot(corr, 'Diabetes Feature Correlation', 'diabetes_correlation.png')
    except Exception as e:
        print(f"Error generating Diabetes plot: {e}")

def plot_liver():
    print("Generating Liver Plot...")
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, 'liver.csv'), encoding='latin1')
        for i in df.select_dtypes(include='number').columns:
            df[i] = df[i].fillna(df[i].mean())
            
        le = LabelEncoder()
        df['Gender of the patient'] = le.fit_transform(df['Gender of the patient'].astype(str))
        
        X = df[['Age of the patient','Gender of the patient','Total Bilirubin','Direct Bilirubin','Sgot Aspartate Aminotransferase']]
        corr = X.corr()
        save_plot(corr, 'Liver Disease Feature Correlation', 'liver_correlation.png')
    except Exception as e:
        print(f"Error generating Liver plot: {e}")

def plot_kidney():
    print("Generating Kidney Plot...")
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, 'kidney.csv'))
        
        for col in df.select_dtypes(include='object').columns:
            df[col] = df[col].astype(str).str.strip()
            
        if 'id' in df.columns:
            df = df.drop('id', axis=1)
            
        cols_to_numeric = ['age', 'sc', 'hemo', 'al', 'sg', 'bu']
        for col in cols_to_numeric:
            df[col] = pd.to_numeric(df[col], errors='coerce')

        for col in df.select_dtypes(include='number').columns:
            df[col] = df[col].fillna(df[col].mean())
            
        for col in df.select_dtypes(include='object').columns:
            df[col] = df[col].fillna(df[col].mode()[0])
            
        le_htn = LabelEncoder()
        df['htn'] = le_htn.fit_transform(df['htn'])
        
        X = df[['age', 'sc', 'hemo', 'al', 'sg', 'bu', 'htn']]
        corr = X.corr()
        save_plot(corr, 'Kidney Disease Feature Correlation', 'kidney_correlation.png')
    except Exception as e:
        print(f"Error generating Kidney plot: {e}")

def plot_stroke():
    print("Generating Stroke Plot...")
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, 'stroke.csv'))
        
        le_smoking = LabelEncoder()
        df['smoking_status'] = df['smoking_status'].astype(str)
        df['smoking_status'] = le_smoking.fit_transform(df['smoking_status'])
        
        for i in df.select_dtypes(include='number').columns:
            df[i] = df[i].fillna(df[i].mean())
            
        for i in df.select_dtypes(include='object').columns:
            df[i] = df[i].fillna(df[i].mode()[0])
            
        X = df[['age', 'hypertension', 'heart_disease', 'avg_glucose_level', 'bmi', 'smoking_status']]
        X = X.astype(float)
        corr = X.corr()
        save_plot(corr, 'Stroke Risk Feature Correlation', 'stroke_correlation.png')
    except Exception as e:
        print(f"Error generating Stroke plot: {e}")

def plot_heart():
    print("Generating Heart Disease Plot...")
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, 'Heart_Disease_Prediction.csv'))
        
        for i in df.select_dtypes(include='number').columns:
            df[i] = df[i].fillna(df[i].mean())
        
        X = df[['Age','Sex','Chest pain type','BP','Cholesterol','Max HR']]
        corr = X.corr()
        save_plot(corr, 'Heart Disease Feature Correlation', 'heart_correlation.png')
    except Exception as e:
        print(f"Error generating Heart plot: {e}")

if __name__ == "__main__":
    plot_diabetes()
    plot_liver()
    plot_kidney()
    plot_stroke()
    plot_heart()
    print("All plots generated.")
