# Deployment Guide 🚀

This guide outlines the steps to deploy the **MedPredict AI** application. The frontend will be deployed to **Vercel**, and the backend to **Render**.

## Prerequisites

*   GitHub Account (with this repository pushed)
*   [Vercel Account](https://vercel.com/)
*   [Render Account](https://render.com/)

---

## 1. Backend Deployment (Render)

We will deploy the Flask backend first to get the API URL.

1.  Log in to your **Render** dashboard.
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub repository (`MediPredict-AI`).
4.  Configure the service:
    *   **Name**: `medpredict-api` (or similar)
    *   **Region**: Choose the one closest to you (e.g., Singapore, Oregon).
    *   **Branch**: `main` (or your working branch).
    *   **Root Directory**: Leave empty (defaults to repo root).
    *   **Runtime**: **Python 3**.
    *   **Build Command**: `pip install -r backend/requirements.txt`
    *   **Start Command**: `gunicorn backend.wsgi:app`
5.  Click **Create Web Service**.
6.  Wait for the deployment to finish. Once live, copy the **onrender.com URL** (e.g., `https://medpredict-api.onrender.com`). You will need this for the frontend.

---

## 2. Frontend Deployment (Vercel)

Now we deploy the React frontend and connect it to the backend.

1.  Log in to your **Vercel** dashboard.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository (`MediPredict-AI`).
4.  Configure the project:
    *   **Framework Preset**: **Vite** (should be auto-detected).
    *   **Root Directory**: Click `Edit` and select `frontend`.
5.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Key: `VITE_API_URL`
    *   Value: Paste your Render Backend URL (e.g., `https://medpredict-api.onrender.com`). **Important:** Do not add a trailing slash `/`.
6.  Click **Deploy**.
7.  Vercel will build and deploy your site. Once done, you will get a production URL (e.g., `https://medpredict-ai.vercel.app`).

---

## 3. Verification

1.  Open your Vercel URL.
2.  The dashboard should load.
3.  Go to the "About" tab to verify navigation.
4.  Select a disease (e.g., Heart Disease) and click "Analyze Risk Factors".
5.  If the backend is connected correctly, you should see a prediction result (or a loading state followed by a result).

## Troubleshooting

*   **CORS Errors**: If the frontend cannot talk to the backend, check the browser console. Ensure the backend is running and `flask-cors` is enabled (it is by default in this project).
*   **Backend 500 Error**: Check the Render logs. Ensure all dependencies are in `requirements.txt` (we added `gunicorn`).
*   **Frontend 404 on Refresh**: We added `vercel.json` to handle routing, so this should work.

Happy Deploying! 🚀
