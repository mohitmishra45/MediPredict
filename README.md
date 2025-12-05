# MedPredict AI 🏥

<img width="1919" height="928" alt="MedPredict AI Banner" src="https://github.com/user-attachments/assets/7a47d084-2a91-49d7-8fdb-183f5fdb3774" />

> *Advanced Disease Prediction & Health Analytics Platform*

**MedPredict AI** is a cutting-edge health analytics application that leverages machine learning to predict the risk of multiple life-threatening diseases. Designed with a focus on usability and accuracy, it provides users with instant, data-driven health insights through a beautiful, modern interface.

---

## 🚀 Key Features

### 🩺 Multi-Disease Prediction
Comprehensive risk assessment for 6 critical conditions:
*   ❤️ **Heart Disease**
*   🩸 **Diabetes**
*   🧠 **Stroke**
*   🩺 **Kidney Disease**
*   👤 **Liver Disease**

### 🧠 Advanced AI/ML Core
*   **High Accuracy Models**: Trained on validated clinical datasets (e.g., UCI Machine Learning Repository).
*   **Real-time Analysis**: Instant processing of patient vitals to generate risk probability scores.
*   **Data Visualization**: Integrated **Analysis Hub** featuring interactive notebooks and EDA (Exploratory Data Analysis) graphs for deep insights.

### ✨ Modern & Immersive UI/UX
*   **Glassmorphism Design**: Premium aesthetic with translucent cards and neon accents.
*   **3D Interactive Elements**: Custom 3D Logo and dynamic visual components.
*   **Particle Background**: Smooth, animated background that reacts to user interaction.
*   **Responsive Layout**: Optimized for Desktop, Tablet, and Mobile devices.
*   **Theme Engine**: 
    *   🌗 **Dark/Light Mode**: Seamless toggle for comfortable viewing.
    *   🎨 **Custom Accents**: Personalize the dashboard with Blue, Green, Purple, or Pink themes.

---

## 📸 Application Gallery

### Dashboard & Navigation
The central hub for accessing all prediction models and analytics tools.

| Dashboard Home (Light) | Dashboard Home (Dark) |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/1a57b204-a260-4ae3-8d0b-e5401c614ba6" alt="Dashboard Home" width="600"/> | <img src="https://github.com/user-attachments/assets/81ddde44-30a1-40df-8613-0852cc41ecac" alt="Dashboard Dark" width="600"/> |
| *Clean light mode for clarity* | *Sleek dark mode for night usage* |

### Prediction Interface & Details
Intuitive forms for entering patient health data and exploring specific sections.

| Disease Prediction Form | About Section |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/3956706c-c089-418f-ab0a-dbc1ba6bd686" alt="Prediction Form" width="600"/> | <img src="https://github.com/user-attachments/assets/097cf0fe-ef62-4e31-947b-012638c5dc19" alt="About Section" width="600"/> |
| *Easy-to-use input fields with validation* | *Detailed project/team information* |

### Analysis Hub & Visualizations
Explore the data behind the models with integrated Jupyter Notebook views.

| EDA Graphs | Model Performance |
| :---: | :---: |
| ![EDA Graphs](https://via.placeholder.com/600x400?text=Exploratory+Data+Analysis) | ![Model Performance](https://via.placeholder.com/600x400?text=Model+Accuracy+Charts) |

---

## 🛠️ Technology Stack

### Frontend
*   **[React.js](https://reactjs.org/)**: Building the user interface.
*   **[Vite](https://vitejs.dev/)**: Fast build tool and dev server.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first styling.
*   **[Framer Motion](https://www.framer.com/motion/)**: Smooth animations and transitions.
*   **[Lucide React](https://lucide.dev/)**: Modern, clean iconography.

### Backend
*   **[Python 3.8+](https://www.python.org/)**: Core logic and ML processing.
*   **[Flask](https://flask.palletsprojects.com/)**: RESTful API to serve predictions.
*   **[Scikit-Learn](https://scikit-learn.org/)**: Machine learning model implementation.
*   **[Pandas](https://pandas.pydata.org/)** & **[NumPy](https://numpy.org/)**: Data handling.
*   **Joblib**: Efficient model serialization.

---

## ⚙️ Installation & Setup

Get the project running on your local machine in minutes.

### Prerequisites
*   Node.js (v16 or higher)
*   Python (3.8 or higher)
*   Git

### 1. Clone the Repository
```bash
git clone https://github.com/mohitmishra45/MediPredict-AI.git
cd MediPredict-AI
```

### 2. Backend Configuration
Set up the Python environment and start the API server.

```bash
# Navigate to backend folder (if you are in root)
# It is recommended to create a virtual environment first:
# python -m venv venv
# source venv/bin/activate  (Mac/Linux)
# venv\Scripts\activate     (Windows)

pip install -r backend/requirements.txt
python backend/app.py
```
*Server will start at `http://127.0.0.1:5000`*

### 3. Frontend Configuration
Launch the React application.

```bash
# Open a new terminal
cd frontend
npm install
npm run dev
```
*Application will open at `http://localhost:5173`*

---

## 🔌 API Reference

The backend provides REST endpoints for predictions. Example usage:

### Predict Heart Disease
`POST /api/predict/heart`

**Request Body:**
```json
{
  "age": 45,
  "sex": 1,
  "cp": 2,
  "trestbps": 130,
  "chol": 250,
  "fbs": 0,
  "restecg": 1,
  "thalach": 160,
  "exang": 0,
  "oldpeak": 1.5,
  "slope": 2,
  "ca": 0,
  "thal": 2
}
```

**Response:**
```json
{
  "prediction": "High Risk",
  "probability": 0.85
}
```

---

## 🤝 Contributing

We welcome contributions!
1.  **Fork** the repository.
2.  Create a **Feature Branch** (`git checkout -b feature/NewFeature`).
3.  **Commit** your changes (`git commit -m 'Add NewFeature'`).
4.  **Push** to the branch (`git push origin feature/NewFeature`).
5.  Open a **Pull Request**.

---

## 📞 Contact

**Mohit Mishra**

*   🔗 **LinkedIn**: [mohitmishra45](https://www.linkedin.com/in/mohitmishra45/)
*   📧 **Email**: [mohitmishra9707@gmail.com](mailto:mohitmishra9707@gmail.com)
*   🐙 **GitHub**: [mohitmishra45](https://github.com/mohitmishra45)

---

*Disclaimer: This tool is for educational and demonstrative purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.*
