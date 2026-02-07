# AI Notes Application

An AI-powered note-taking application that automatically clusters
and categorizes similar notes using machine learning techniques.

This project was built to explore practical applications of
unsupervised learning and NLP in a real-world full-stack application.

---

## 🚀 Features
- Create, edit, and delete notes
- Automatic clustering of similar notes
- ML-based categorization using text similarity
- Clean and simple UI for managing notes
- REST API for note operations

---

## 🧠 How It Works (High Level)
1. Notes are preprocessed using NLP techniques
2. Text is converted into numerical representations (e.g. TF-IDF / embeddings)
3. An unsupervised ML algorithm clusters similar notes
4. Notes in the same cluster are grouped together in the UI

---

## 🛠 Tech Stack

### Backend
- Python
- Flask
- scikit-learn
- NLP preprocessing

### Frontend
- React
- CSS

### ML Concepts
- Unsupervised Learning
- Text Vectorization
- Cosine Similarity
- Clustering Algorithms (e.g. KMeans / DBSCAN)

---

## ⚙️ Setup Instructions

### Backend
cd backend
pip install -r requirements.txt
python app.py

---

### Frontend
cd frontend
npm install
npm start
