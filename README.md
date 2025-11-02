# 🌙 Dream Board

**Dream Board** is a full-stack web application that lets users sign up, log in, and post their dreams, goals, or affirmations to a shared digital vision board.  

It’s built with **Node.js**, **Express**, **MongoDB**, and **EJS**, featuring user authentication and CRUD functionality — all wrapped in a starry aesthetic. ✨

---

## 🧩 Tech Stack

- **Frontend:** EJS templating + Bootstrap + Custom CSS (dreamy gradient theme)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** Passport.js (local strategy)
- **Other:** dotenv, express-session, bcrypt

---

## 💫 Features

- 🪄 User authentication (Signup / Login / Logout)  
- ☁️ Create and post messages (your dreams/goals)  
- 🌧️ Like, dislike, or delete posts  
- 💬 View all users’ dreams in one collective board  
- 🖼️ Responsive, modern UI with custom styling  
- 🔒 Passwords hashed and secured with bcrypt  

---

## 🚀 Getting Started

### 1. Clone this repo
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME

2. Install dependencies
npm install

3. Create a .env file
Inside the project root, add your environment variables:
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key

5. Start the app
npm start

Then visit:
👉 http://localhost:3000

```
---

## 🗂️ Folder Structure
.
├── public/
│   ├── style.css
│   └── main.js
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   └── profile.ejs
├── models/
│   └── user.js
├── routes/
│   └── main.js
├── server.js
├── package.json
└── README.md


---

## 🧠 Core Logic
Users register and log in via Passport local strategy.
Once logged in, they can add messages to the shared board.
Messages are stored in MongoDB and rendered dynamically using EJS.
Users can like (☁️) or dislike (🌧️) dreams, or delete (🗑️) their own.
Logout clears the session, returning them to the login screen.

---

## 💻 Example
A typical dream entry looks like:
Name: leeanneeagan@example.com
Message: “Move to Paris and open a cozy coffee shop!”
Likes: ☁️☁️☁️

---

## 🌠 Future Enhancements
User profile pages with uploaded dream images
Category filters (career, travel, personal growth)
Public/private dream toggles
Notifications for dream “likes”
Cloud-themed animations ☁️💭

---

## 🪶 Author
Leeanne Eagan
🌙 Turning ideas into interactive realities — one dream at a time.
GitHub

---

## 📜 License
This project is licensed under the MIT License — feel free to use, remix, and make your own dream board!

