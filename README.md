# MedPredict AI 🏥

<img width="1919" height="928" alt="image" src="https://github.com/user-attachments/assets/7a47d084-2a91-49d7-8fdb-183f5fdb3774" />


**MedPredict AI** is an advanced machine learning platform designed to assist healthcare professionals and individuals in early disease detection and risk assessment. Leveraging state-of-the-art algorithms, it provides accurate, instant, and accessible risk assessments for multiple critical health conditions.

## 🚀 Key Features

*   **Multi-Disease Prediction**: Comprehensive analysis for:
    *   ❤️ Heart Disease
    *   🩸 Diabetes
    *   🧠 Stroke
    *   🫁 Lung Cancer
    *   🩺 Kidney Disease
    *   👤 Liver Disease
*   **High Accuracy**: Powered by machine learning models trained on validated clinical datasets.
*   **Modern UI/UX**:
    *   ✨ **Glassmorphism Design**: Sleek, modern interface with glass-like cards and panels.
    *   🌗 **Dark/Light Mode**: Fully responsive theme switching for comfortable viewing in any environment.
    *   🎨 **Customizable Themes**: Multiple color accents (Green, Blue, Purple, Pink, etc.).
    *   🧊 **3D Visuals**: Custom CSS-based 3D logo and interactive elements.
    *   ✨ **Particle Background**: Subtle, dynamic background effects.
*   **Instant Results**: Real-time processing and risk probability scoring.
*   **Secure & Private**: Client-side data handling focus (disclaimer: demo purpose).

## 🧠 Machine Learning Models

MedPredict AI utilizes a variety of robust algorithms tailored to each specific disease dataset to ensure maximum accuracy.

| Disease | Model Algorithm | Accuracy | Description |
| :--- | :--- | :--- | :--- |
| **Diabetes** | Logistic Regression | **78.57%** | Effective for binary classification based on glucose and insulin levels. |
| **Heart Disease** | Gaussian Naive Bayes | **85.19%** | Probabilistic classifier suitable for medical diagnosis with independent features. |
| **Kidney Disease** | K-Nearest Neighbors (KNN) | **97.50%** | Classifies based on similarity to known cases, highly effective for this dataset. |
| **Liver Disease** | Decision Tree Classifier | **92.85%** | Uses a tree-like model of decisions to predict liver anomalies. |
| **Lung Cancer** | Decision Tree Classifier | **100.00%** | High-precision model for detecting patterns in lung health data. |
| **Stroke** | Logistic Regression | **93.93%** | Reliable statistical model for estimating stroke probability. |

*Note: Accuracies are based on the testing subset of the respective clinical datasets.*

## 🛠️ Technology Stack

### Frontend
*   **React.js**: Component-based UI architecture.
*   **Vite**: Next-generation frontend tooling.
*   **Tailwind CSS**: Utility-first CSS framework for styling.
*   **Lucide React**: Beautiful, consistent icons.
*   **CSS Modules/Variables**: Advanced theming and animations.

### Backend
*   **Python**: Core programming language.
*   **Flask**: Lightweight WSGI web application framework.
*   **Scikit-Learn**: Machine learning library for model training and prediction.
*   **Pandas/NumPy**: Data manipulation and analysis.
*   **Joblib**: Model serialization.

## 📸 Screenshots

| Dashboard Home | Disease Prediction Form |
|:---:|:---:|
| ![Home](https://via.placeholder.com/600x400?text=Dashboard+Home) | ![Form](https://via.placeholder.com/600x400?text=Prediction+Form) |
| <img width="1919" height="928" alt="image" src="https://github.com/user-attachments/assets/1a57b204-a260-4ae3-8d0b-e5401c614ba6" />
| <img width="1919" height="929" alt="image" src="https://github.com/user-attachments/assets/3956706c-c089-418f-ab0a-dbc1ba6bd686" />
|

| Dark Mode | About Section |
|:---:|:---:|
| ![Dark Mode](https://via.placeholder.com/600x400?text=Dark+Mode) | ![About](https://via.placeholder.com/600x400?text=About+Section) |
|<img width="1919" height="929" alt="image" src="https://github.com/user-attachments/assets/81ddde44-30a1-40df-8613-0852cc41ecac" />
| <img width="1918" height="929" alt="image" src="https://github.com/user-attachments/assets/097cf0fe-ef62-4e31-947b-012638c5dc19" />
|

## ⚙️ Installation & Setup

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v16+)
*   Python (v3.8+)
*   Git

### 1. Clone the Repository
```bash
git clone https://github.com/mohitmishra45/MediPredict-AI.git
cd MediPredict-AI
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies.

```bash
# Navigate to root directory (if not already there)
# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install requirements
pip install -r backend/requirements.txt

# Run the Flask Server
python backend/app.py
```
*The backend server will start at `http://127.0.0.1:5000`*

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and start the development server.

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```
*The frontend will be available at `http://localhost:5173`*

## 🧠 How It Works

1.  **Select a Disease**: Choose the condition you want to assess from the dashboard.
2.  **Input Health Data**: Enter the required patient vitals (e.g., Age, BMI, Blood Pressure).
3.  **AI Analysis**: The data is sent to the Flask backend where the specific ML model processes it.
4.  **Get Results**: Receive an instant risk assessment (Low/High Risk) with actionable insights.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Mohit Mishra**

*   🔗 LinkedIn: [mohitmishra45](https://www.linkedin.com/in/mohitmishra45/)
*   📧 Email: [mohitmishra9707@gmail.com](mailto:mohitmishra9707@gmail.com)
*   🐙 GitHub: [mohitmishra45](https://github.com/mohitmishra45)

---
*Disclaimer: MedPredict AI is a decision support tool and is NOT a substitute for professional medical diagnosis. Always consult a healthcare provider.*
