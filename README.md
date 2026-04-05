<h1 align="center">🚨 RescueLens</h1>
<h3 align="center">AI-Powered Real-Time Disaster Intelligence System</h3>

<p align="center">
  Turning chaotic social media signals into structured, actionable intelligence for faster emergency response.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-FastAPI-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Frontend-JavaScript-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/Map-Leaflet-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/Status-Demo%20Ready-success?style=for-the-badge">
</p>

---

## 📌 Problem Statement

During disasters, **critical information appears on social media before official reports**.

However:
- Data is **unstructured and noisy**
- Contains **misinformation and outdated content**
- Lacks **real-time filtering and prioritization**

> ⚠️ **Core Gap:**  
No system converts raw social signals into **trusted, prioritized, and location-aware intelligence**.

---

## 💡 Solution Overview

**RescueLens** is an AI-powered disaster intelligence system that:

- ⚡ Detects disaster events in real time  
- 📊 Assigns **authenticity (confidence) scores**  
- 🕒 Filters outdated signals  
- 🧠 Explains *why* each alert was generated  
- 📍 Visualizes alerts on an interactive map  

> 🎯 Goal: Enable faster, smarter, and more reliable emergency response.

---

## ⚙️ System Architecture
Simulated Data Stream
↓
NLP Detection Engine
↓
Intelligence Layer
(Recency + Authenticity + Explanation)
↓
Smart Alert Engine
↓
Backend API (FastAPI)
↓
Frontend Dashboard (JS + Leaflet)


---

## 🧠 Core Intelligence Features

### 🔍 Disaster Detection
- Keyword-based NLP engine  
- Supports: Flood, Fire, Earthquake, Accident  

---

### 🕒 Temporal Filtering
- Distinguishes **recent vs outdated alerts**
- Prevents false signals from old data  

---

### 📊 Authenticity Scoring
Each alert is evaluated using:
- Recency (time relevance)  
- Source credibility (News, Twitter, etc.)  
- Location specificity (area vs city)  

> Example: `Score = 0.8 → High Confidence`

---

### 🧠 Explanation Layer *(Key Differentiator)*
Each alert explains its reasoning:
Detected due to: recent activity + area match + disaster keywords


---

### 📍 Smart Geo-Mapping
- Area-level extraction from text  
- City-level fallback  
- Cluster simulation using coordinate spread  

---

## 🚀 Features

- ⚡ Real-time disaster monitoring  
- 📍 Interactive map visualization  
- 🎨 Multi-disaster color coding  
- 🕒 Recency-based fading (old vs live)  
- 📊 Authenticity scoring system  
- 🧠 Explainable alerts  
- 📩 Simulated notification system  

---

## 🧱 Core Modules

| Module | Description |
|------|------------|
| Data Loader | Handles dataset ingestion |
| NLP Engine | Detects disaster type |
| Authenticity Engine | Scores reliability |
| Explanation Engine | Generates reasoning |
| API Layer | Backend communication |
| Frontend Dashboard | Visualizes alerts |

---

## ⚙️ Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | HTML, CSS, JavaScript, Leaflet.js |
| Backend | FastAPI (Python) |
| NLP | Rule-based keyword detection |
| Data | CSV (simulated real-time feed) |

---

## 📁 Project Structure
RescueLens/
│
├── backend/
│ ├── main.py
│ ├── routes.py
│ ├── services/
│ └── utils/
│
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── data/
│ └── disaster_data.csv
│
├── docs/
│ └── architecture.md
│
├── README.md
├── requirements.txt
└── LICENSE


---

## 📊 Output

- 🔴 High-confidence alerts  
- ⚪ Faded outdated signals  
- 📍 Geo-based disaster hotspots  
- 🧠 Explanation-backed decisions  
- 📡 Real-time alert feed  

---

## 🖥️ Demo Preview *(Add Screenshots Here)*

<p align="center">
  <img src="docs/demo1.png" width="45%">
  <img src="docs/demo2.png" width="45%">
</p>

---

## 👥 Team

| Role | Name |
|------|------|
| AI / ML | Ayush |
| Backend | Pramit |
| Frontend | Achal |
| Documentation | Shravni |

---

## 🏆 Impact

RescueLens enables:

- 🚑 Faster emergency response  
- 📡 Improved situational awareness  
- 📊 Better decision-making  
- ⚠️ Reduced misinformation impact  

> **Turning raw data into life-saving intelligence.**

---

## 🚀 Future Enhancements

- Live Twitter/X API integration  
- Advanced NLP models (BERT / Transformers)  
- Multi-source data aggregation  
- SMS / Email alert system  
- Admin control panel  

---

## 📜 License

This project is licensed under the **MIT License**.

---

<p align="center">
  ⭐ If you like this project, consider starring the repository!
</p>
