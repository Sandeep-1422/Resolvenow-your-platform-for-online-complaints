# ResolveNow - Your Platform for Online Complaints


ResolveNow is a full-stack MERN web application for registering and resolving user complaints online. It supports role-based login for users, agents, and admins with basic chat and complaint tracking.


Developed as part of an internship project under **SmatIntrenz**.


 📂 Project Structure

ResolveNow:

backend:-
  1 .env
  2.Schema.js
  3.config.js
  4.index.js
  5.package.json
  6.readme.md

 frontend:
  A.public:-
     1.index.html
  B.src:-
      C.components
         1.admin
         2. agent
         3. common
         4.user
   D.Images
   E. App.css
   F. App.js
      1.index.js
   G. package.json
   H.README.md



## 💡 Key Features

### 👤 Users:
- Register/Login
- Create complaints
- View status updates
- Real-time chat with agents

### 👨‍💼 Agents:
- View assigned complaints
- Update complaint status
- Chat with users

### 🛠 Admin:
- Manage all complaints
- Assign agents
- View all users and agents



## 🛠️ Tech Stack

- **Frontend:** React.js, React Router, Axios, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT (Role-based access)
- **Database:** MongoDB
- **Styling:** CSS, Bootstrap



## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

git :https://github.com/abhinavh-77/Resolvenow-your-platform-for-online-complaints


2️⃣ Install Backend Dependencies:

cd backend-
npm install-
node index.js-
npm start

3️⃣ Install Frontend Dependencies:

cd frontend-
npm install-
npm start


💡 Make sure MongoDB is running locally or configure your .env with your MongoDB URI.


🔐 Environment Variables (backend/.env):
MONGO_URI=mongodb://127.0.0.1:27017/details
JWT_SECRET=your_jwt_secret
PORT=8000


🚀 Running the Application:
Backend: http://localhost:8000
Frontend: http://localhost:3000

🧪 Testing Status
Tested manually with different user roles

All endpoints functional

Basic chat tested with dummy data

🚧 Known Issues
No file uploads for complaint proof

Chat feature uses polling instead of WebSocket

Basic UI responsiveness

🧭 Future Enhancements
WebSocket-based real-time chat

Complaint file/image upload

Admin analytics dashboard

Push notifications or email alerts

Mobile UI optimization

🙏 Credits
Internship conducted by SmatIntrenz

Developed by Haridasula Abhinav


📧 Email:habhinavnaidu2005@gmail.com
