# GroShare: AI-Powered Food Redistribution & Recipe Builder

## 📌 Project Overview

**GroShare** is an AI-powered food redistribution platform that enables grocery stores and food banks to minimize waste while helping local communities. This project integrates **AI-driven discounts**, **real-time donation tracking**, and a **recipe builder** to suggest meal ideas based on surplus food.

### **Key Features**

✅ **Grocery Store Donations:** Stores can list near-expiry food at discounted prices and donate surplus to food banks. ✅ **Real-Time Inventory Updates:** Fetch and subscribe to Firestore donations dynamically. ✅ **Recipe Builder with OpenAI:** Generates recipes based on discounted ingredients. ✅ **Local Community Resources:** View nearby food banks and shelters. ✅ **Event Tracking:** Displays upcoming food drives and volunteer opportunities.

## 🏗️ Tech Stack

### **Frontend**

- **Next.js** (React-based frontend)
- **Material UI (MUI)** (UI components)
- **Tailwind CSS** (UI components)

### **Backend**

- **Flask** (REST API)
- **Firebase Firestore** (Real-time Cloud Database)
- **OpenAI API** (AI-powered recipe generation)
- **Google Maps API** (Logistics & distance calculations)

## 🚀 Features & API Endpoints

### **1️⃣ Donation Management**

| API Endpoint     | Method | Description                                 |
| ---------------- | ------ | ------------------------------------------- |
| `/add_donation`  | `POST` | Allows grocery stores to add food donations |
| `/get_donations` | `GET`  | Fetches available donations                 |

### **2️⃣ Recipe Builder**

| API Endpoint       | Method | Description                                      |
| ------------------ | ------ | ------------------------------------------------ |
| `/generate_recipe` | `POST` | Generates a recipe based on selected ingredients |

### **3️⃣ Community Resources**

| API Endpoint       | Method | Description                                   |
| ------------------ | ------ | --------------------------------------------- |
| `/get_shelters`    | `GET`  | Retrieves list of local food banks & shelters |
| `/match_donations` | `POST` | AI-powered matching of donations to shelters  |

## 🛠️ How It Works

### **1️⃣ User Homepage (Dynamic Donations Feed)**

- Displays **real-time grocery deals** via Firestore subscriptions.
- Users can **view available donations** and **reserve items**.

### **2️⃣ Recipe Builder (AI-Powered)**

- Users **select ingredients from donations**.
- AI generates **step-by-step recipes** using OpenAI.
- Displays **nutrition facts per serving**.

### **3️⃣ Community Resources & Events**

- View nearby **food banks & shelters** with real-time needs.
- Track **upcoming food drives and volunteer events**.

## 🎨 UI Components

### **User Homepage**

- **Featured Deals (Horizontal Scroll View)**
- **Local Shelters (Popup Modal on View Details)**
- **Community Events**

### **Recipe Builder**

- **Ingredient Selection with Search Filter**
- **AI Recipe Generation with MUI Cards**
- **Nutrition Facts Display**

## 🌟 Acknowledgments

Special thanks to **HackRU**, **Wakefern**, and the sponsors for support.

## 📜 License

This project is licensed under the **MIT License**.