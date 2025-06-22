# 🎬 PulkeMovies Client

A full-featured front-end React application for PulkeMovies — a platform to discover, manage, and promote movies.  
Built with **React**, **Redux**, **React Router**, and **TypeScript** for a smooth, dynamic, and interactive experience.

🔗 [View Server Repo](https://github.com/DavidPulke/final-server)
🔗 [View Live Site](https://final-client-1.onrender.com/)

---

## 🚀 Features

### 🎥 Movie Zone Platform

- 🧑‍🎤 User registration/login/logout with secure token storage
- 🆔 Profile management with editable user details and avatar
- 🏆 Creators can upload & manage their movies
- ❤️ Like/unlike movies (saved in user profile)
- 🔍 Live search by name, category, or genre
- 🎞️ Detailed movie page with info 
- 💰 Market page (for future PulCoins functionality)

### 💬 Mini Chat System

- 🗨️ Built-in mini-chat on the bottom left
- ✨ Users can send quick questions to the admin
- 🤖 Auto-suggestions with predefined answers
- 📲 Admin panel shows real-time user messages (WhatsApp style)

### 🧑‍💼 Admin Dashboard

- 📋 Manage users & creators
- 🔄 Activate/lock users
- 🗑️ Delete users or movies
- 📬 Access all chats per user
- 🧠 Admin chat auto-refresh + reload button with animation

---

## 🧭 Pages Overview

| Route                | Page Description                               |
|----------------------|------------------------------------------------|
| `/`                  | Homepage with featured movies                  |
| `/login`             | User login page                                |
| `/register`          | Register a new user                            |
| `/market`            | PulCoins marketplace                           |
| `/profile`           | Edit profile + image                           |
| `/becomeCreator`     | Info + form to become a creator                |
| `/about`             | Info page about project                        |
| `/movie/:id`         | Movie details                                  |
| `/admin/crm`         | Admin panel to manage users                    |
| `/admin/chat`        | Admin chat interface with all users            |

---

## 🛠️ Technologies Used

- **React** with **TypeScript**
- **Redux Toolkit** for state management
- **React Router DOM v6** for routing
- **Axios** for API requests
- **Bootstrap** for responsive design
- **Font Awesome** & **Custom CSS** for icons/UI
- **TMDB API** for real movie data & trailers
- **Cloudinary** for image uploads
- **LocalStorage** for persistent login
- **Mini Chat Engine** using REST API

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/DavidPulke/final-client.git
cd final-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create .env file

```bash
REACT_APP_API=http://localhost:8000/api/
TMDB_ID = ""
ADMIN_ID = ""
```
### 4. run site

```bash
npm start
```


## Folder Structure 📁

final-client/

├── src/

│   ├── components/        # Reusable components

│   ├── pages/             # All route-based pages

│   ├── hooks/             # Custom hooks (e.g., useUser)

│   ├── redux/             # Redux store, slices

│   ├── services/          # Axios API calls

│   ├── interfaces/        # TypeScript interfaces

│   ├── assets/            # Images, icons, etc.

│   ├── styling/            # css style.

│   └── App.tsx            # Main app

├── .env

├── package.json

└── README.md


## 🖼️ Screenshots

| Homepage                          | Mini Chat + Admin Chat             |
|----------------------------------|------------------------------------|
| ![Home](https://github.com/user-attachments/assets/0699899a-4485-4ed3-8dd2-e3b8eb8b5a37) | ![Chat](https://github.com/user-attachments/assets/6a85c535-10c7-48c4-8e57-3df89de5baa8) |

| Movies Page                      | Movie Info Page                    |
|----------------------------------|------------------------------------|
| ![Movies](https://github.com/user-attachments/assets/5887e729-7a41-4574-afdb-8d477671b1d9) | ![MovieInfo](https://github.com/user-attachments/assets/d4602e5a-99c6-468c-b661-ca64c4cb09fe) |

| About Page                       | Market Page                        |
|----------------------------------|------------------------------------|
| ![About](https://github.com/user-attachments/assets/45842020-b5e0-4be3-a220-0a6d411f51ba) | ![Market](https://github.com/user-attachments/assets/4970ca38-885e-42c8-a6d0-2e8f00802048) |




## 🙋‍♂️ Author

### Made with ❤️ by David Polak
### 📧 davidpulke@gmail.com
### 🐙 GitHub Profile

### If you enjoyed this project, consider giving it a ⭐ on GitHub!
