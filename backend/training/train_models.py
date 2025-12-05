import pandas as pd
import numpy as np
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler, StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

# Ensure directories exist
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
MODEL_DIR = os.path.join(BASE_DIR, 'models')
os.makedirs(MODEL_DIR, exist_ok=True)

def get_best_model(X_train, X_test, y_train, y_test):
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "KNN": KNeighborsClassifier(n_neighbors=5),
        "Naive Bayes": GaussianNB(),
        "Decision Tree": DecisionTreeClassifier(criterion='gini', random_state=42)
    }
    
    best_model_name = ""
    best_model = None
    best_accuracy = 0.0
    all_accuracies = {}
    
    print("Evaluating models...")
    for name, model in models.items():
        try:
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            acc = accuracy_score(y_test, y_pred) * 100
            print(f"  {name}: {acc:.2f}%")
            all_accuracies[name] = acc
            if acc > best_accuracy:
                best_accuracy = acc
                best_model = model
                best_model_name = name
        except Exception as e:
            print(f"  Error training {name}: {e}")
            all_accuracies[name] = 0.0
            
    print(f"Best Model: {best_model_name} with {best_accuracy:.2f}% accuracy")
    return best_model, best_accuracy, all_accuracies

def train_diabetes():
    print("\n--- Training Diabetes Model ---")
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, 'diabetes.csv'))
        
        df[['Glucose','Blood pressure','Insulin']] = df[['Glucose','Blood pressure','Insulin']].replace(0, np.nan)
        for i in df.select_dtypes(include='number').columns:
            df[i] = df[i].fillna(df[i].mean())
            
        X = df[['Pregnancies','Glucose','Blood pressure','Insulin','Age','Body mass index']]
        y = df['Outcome']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        scaler = MinMaxScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        model, accuracy, all_accuracies = get_best_model(X_train_scaled, X_test_scaled, y_train, y_test)
        
        joblib.dump({
            'model': model,
            'scaler': scaler,
            'accuracy': accuracy,
            'all_accuracies': all_accuracies
        }, os.path.join(MODEL_DIR, 'diabetes_model.pkl'))
        print("Diabetes model saved.")
    except Exception as e:
        print(f"Failed to train Diabetes model: {e}")

def train_liver():
    print("\n--- Training Liver Model ---")
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, 'liver.csv'), encoding='latin1')
        
        for i in df.select_dtypes(include='number').columns:
            df[i] = df[i].fillna(df[i].mean())
            
        le = LabelEncoder()
        df['Gender of the patient'] = le.fit_transform(df['Gender of the patient'])
        
        df['Result'] = df['Result'].map({1: 1, 2: 0})
        
        X = df[['Age of the patient','Gender of the patient','Total Bilirubin','Direct Bilirubin','Sgot Aspartate Aminotransferase']]
        y = df['Result']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)
        
        scaler = MinMaxScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        model, accuracy, all_accuracies = get_best_model(X_train_scaled, X_test_scaled, y_train, y_test)
        
        joblib.dump({
            'model': model,
            'scaler': scaler,
            'encoders': {'Gender of the patient': le},
            'accuracy': accuracy,
            'all_accuracies': all_accuracies
        }, os.path.join(MODEL_DIR, 'liver_model.pkl'))
        print("Liver model saved.")
    except Exception as e:
        print(f"Failed to train Liver model: {e}")

def train_lung():
    print("\n--- Training Lung Cancer Model ---")
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, 'lung.csv'))
        
        le_gender = LabelEncoder()
        df['Gender'] = le_gender.fit_transform(df['Gender'])
        
        le_level = LabelEncoder()
        df['Level'] = le_level.fit_transform(df['Level'])
        
        for col in df.select_dtypes(include='number').columns:
            df[col] = df[col].fillna(df[col].mean())
            
        for col in df.select_dtypes(include='object').columns:
            df[col] = df[col].fillna(df[col].mode()[0])
            
        X = df[['Gender','Age','Passive Smoker','Coughing of Blood','Balanced Diet','Smoking','Air Pollution','Obesity']]
        y = df['Level']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        scaler = MinMaxScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        model, accuracy, all_accuracies = get_best_model(X_train_scaled, X_test_scaled, y_train, y_test)
        
        joblib.dump({
            'model': model,
            'scaler': scaler,
            'encoders': {'Gender': le_gender, 'Level': le_level},
            'all_accuracies': all_accuracies
        }, os.path.join(MODEL_DIR, 'lung_model.pkl'))
        print("Lung Cancer model saved.")
    except Exception as e:
        print(f"Failed to train Lung Cancer model: {e}")

def train_stroke():
    print("\n--- Training Stroke Model ---")
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, 'healthcare-dataset-stroke-data (1).csv'))
        
        le_smoking = LabelEncoder()
        df['smoking_status'] = df['smoking_status'].astype(str)
        df['smoking_status'] = le_smoking.fit_transform(df['smoking_status'])
        
        for i in df.select_dtypes(include='number').columns:
            df[i] = df[i].fillna(df[i].mean())
            
        for i in df.select_dtypes(include='object').columns:
            df[i] = df[i].fillna(df[i].mode()[0])
            
        X = df[['age', 'hypertension', 'heart_disease', 'avg_glucose_level', 'bmi', 'smoking_status']]
        y = df['stroke']
        
        X = X.astype(float)
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Balance the training set
        print(f"  Original Training counts: {y_train.value_counts().to_dict()}")
        
        from imblearn.over_sampling import SMOTE
        smote = SMOTE(random_state=42)
        X_train, y_train = smote.fit_resample(X_train, y_train)
        
        print(f"  Balanced Training counts: {y_train.value_counts().to_dict()}")
        
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        model, accuracy, all_accuracies = get_best_model(X_train_scaled, X_test_scaled, y_train, y_test)
        
        joblib.dump({
            'model': model,
            'scaler': scaler,
            'encoders': {'smoking_status': le_smoking},
            'accuracy': accuracy,
            'all_accuracies': all_accuracies
        }, os.path.join(MODEL_DIR, 'stroke_model.pkl'))
        print("Stroke model saved.")
    except Exception as e:
        print(f"Failed to train Stroke model: {e}")

def train_kidney():
    print("\n--- Training Kidney Model ---")
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
            
        le_class = LabelEncoder()
        df['classification'] = le_class.fit_transform(df['classification'])
        
        le_htn = LabelEncoder()
        df['htn'] = le_htn.fit_transform(df['htn'])
        
        X = df[['age', 'sc', 'hemo', 'al', 'sg', 'bu', 'htn']]
        y = df['classification']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=42)
        
        scaler = MinMaxScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        model, accuracy, all_accuracies = get_best_model(X_train_scaled, X_test_scaled, y_train, y_test)
        
        joblib.dump({
            'model': model,
            'scaler': scaler,
            'encoders': {'classification': le_class, 'htn': le_htn},
            'accuracy': accuracy,
            'all_accuracies': all_accuracies
        }, os.path.join(MODEL_DIR, 'kidney_model.pkl'))
        print("Kidney model saved.")
    except Exception as e:
        print(f"Failed to train Kidney model: {e}")

def train_heart():
    print("\n--- Training Heart Disease Model ---")
    try:
        df = pd.read_csv(os.path.join(DATA_DIR, 'Heart_Disease_Prediction.csv'))
        
        for i in df.select_dtypes(include='number').columns:
            df[i] = df[i].fillna(df[i].mean())
        
        # Encode the target variable (Handle 'Presence' and 'Absence' strings)
        le_target = LabelEncoder()
        df['Heart Disease'] = le_target.fit_transform(df['Heart Disease'])
        
        X = df[['Age','Sex','Chest pain type','BP','Cholesterol','Max HR']]
        y = df['Heart Disease']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        scaler = MinMaxScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        X_test_scaled = scaler.transform(X_test)
        
        model, accuracy, all_accuracies = get_best_model(X_train_scaled, X_test_scaled, y_train, y_test)
        
        joblib.dump({
            'model': model,
            'scaler': scaler,
            'encoders': {'Heart Disease': le_target},
            'accuracy': accuracy,
            'all_accuracies': all_accuracies
        }, os.path.join(MODEL_DIR, 'heart_model.pkl'))
        print("Heart Disease model saved.")
    except Exception as e:
        print(f"Failed to train Heart Disease model: {e}")

if __name__ == "__main__":
    train_diabetes()
    train_liver()
    train_lung()
    train_stroke()
    train_kidney()
    train_heart()
    print("\nAll training complete.")
