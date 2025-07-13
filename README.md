
# 💻 StackIt - AI Enhanced Q&A Platform

Welcome to **StackIt**, a community-driven Q&A platform powered by AI through **OpenRouter**. This project allows users to ask, answer, and bookmark questions with a sleek UI and intelligent suggestions.

---

## 🚀 Features

- 🧠 AI-suggested answers via OpenRouter
- 🔐 JWT Authentication (Login / Signup)
- 📝 Ask & Answer questions
- 🔖 Bookmark questions
- 🛠️ Admin panel (only creator can promote users)
- 📦 Image upload support
- 🌐 Clean UI using Bootstrap and color palette design
- 🗂️ Fully connected backend using MongoDB and Express.js

---

## 📂 Folder Structure

```
/frontend   - React app
/backend    - Express.js + MongoDB server
.env        - Environment configuration file (NOT shared publicly)
```

---

## 🛠️ Technologies Used

- Frontend: React, Bootstrap
- Backend: Node.js, Express.js, MongoDB
- Authentication: JWT
- AI Integration: OpenRouter API
- File Upload: Multer
- State: useState, useEffect
- Protected Routing & Role Management

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Karanveera/Odoo-Project.git
cd Odoo-Project
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3. Create `.env` in `backend` Folder

> ⚠️ **IMPORTANT:** The OpenRouter API Key will **NOT** work if this is hosted with your key.  
> Anyone cloning this repo should replace `OPENROUTER_API_KEY` with their own key.  
> Get your key from: https://openrouter.ai

```env
PORT=5020
MONGO_URI=mongodb://127.0.0.1:27017/stackit
OPENROUTER_API_KEY=REPLACE_WITH_YOUR_OPENROUTER_KEY
JWT_SECRET=yourSuperSecretKey
```

---

### 4. Run the App

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd ../frontend
npm start
```

Now open `http://localhost:3000` to access the app.

---

## 🔑 Note About API Keys

This project uses OpenRouter for AI features.  
Your `.env` should never be committed to GitHub.

- ✅ `.env` is in `.gitignore`
- 🔒 Do NOT hardcode your API keys in JS files.
- ❗ **Replace the default OpenRouter API key with your own.**

---

## 👨‍💻 Author

Developed by [Karan Veera](https://github.com/Karanveera)

---

## ⭐ Contribute

Want to contribute? Fork this repo and create a pull request!

---

## 📃 License

This project is licensed under the **MIT License**.
