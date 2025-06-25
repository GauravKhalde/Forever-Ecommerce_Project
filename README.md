# 🛒 Forever Ecommerce (MERN Fullstack Project)


A complete MERN Stack Ecommerce Application with Customer Frontend, Admin Panel, Node.js API, Cloudinary Image Upload, and Stripe Payments, all deployed on Vercel.

🚀 Features
🖥️ Customer Frontend (Product Browsing, Cart, Orders, Payments)

🛠️ Admin Panel (Add Products, Manage Orders, Update Status)

☁️ Cloudinary for Image Hosting

💳 Stripe for Payments

🌱 MongoDB Atlas for Database

🌐 REST API with Node.js + Express


🛠️ Tech Stack

✅ Frontend (User + Admin Panel):
React:
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)

Vite:
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)

Tailwind CSS:
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

Axios:
![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white)

✅ Backend (API Server):
Node.js:
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)

Express:
![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white)

MongoDB:
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)

Mongoose:
![Mongoose](https://img.shields.io/badge/-Mongoose-880000?logo=mongoose&logoColor=white)

Cloudinary:
![Cloudinary](https://img.shields.io/badge/-Cloudinary-FBCE44?logo=cloudinary&logoColor=black)

Stripe:
![Stripe](https://img.shields.io/badge/-Stripe-635BFF?logo=stripe&logoColor=white)

JWT:
![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white)

✅ Deployment:
Vercel:
![Vercel](https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white)

📁 Folder Structure
Forever-Ecommerce_Project/
├── backend/        # Node.js + Express API (MongoDB + Stripe + Cloudinary)
├── frontend/       # React + Vite (Customer Website)
└── admin/          # React + Vite (Admin Panel for Product & Order Management)


🌐 Live URLs (Vercel)
| Part        | Link                                                                 |
| ----------- | -------------------------------------------------------------------- |
| Frontend    | [https://your-frontend.vercel.app](https://your-frontend.vercel.app) |
| Backend API | [https://your-backend.vercel.app](https://your-backend.vercel.app)   |
| Admin Panel | [https://your-admin.vercel.app](https://your-admin.vercel.app)       |


⚙️ How to Run Locally
Clone the Repo:
git clone https://github.com/GauravKhalde/Forever-Ecommerce_Project.git
cd Forever-Ecommerce_Project


Setup Backend:
cd backend
npm install

Create .env inside /backend/:
MONGODB_URL=your_mongodb_connection
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret


Run backend:
npm run dev

Setup Frontend:
cd ../frontend
npm install

.env in /frontend/:
VITE_APP_BACKEND_URL=https://your_backend_url.vercel.app/

Run frontend:
npm run dev

Setup Admin Panel:
cd ../admin
npm install

.env in /admin/:
VITE_APP_BACKEND_URL=https://your_backend_url.vercel.app/

Run admin:
npm run dev

✅ Deployment on Vercel
For each folder (backend, frontend, admin):
Deploy as separate Vercel projects
Backend → Vercel Node project
Frontend & Admin → Vite → Build Command: npm run build, Output: dist
Set .env in Vercel Dashboard (Environment Variables)


✅ Author
Gaurav Khalde
MERN Stack Developer | React | Node.js | MongoDB | Cloudinary | Stripe







