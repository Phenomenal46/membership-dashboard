# 📊 Membership Dashboard

![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=flat&logo=zod&logoColor=white)

A **clean**, **responsive**, and **easy-to-use** Membership Dashboard. It helps you **manage users** with **live data tracking**, **quick search and sort** features, and a simple way to **add new members**.

## 🚀 Live Demo

The project is successfully deployed on Vercel and live! You can access the application here:  
**[Membership Dashboard - Live Preview](https://membership-dashboard-psi.vercel.app/)**

---

## ✨ Key Features

* **Live Analytics:** Tracks Active Members, Total Revenue, Total Members, and New Signups.
* **Quick Data Handling:** Search with a slight delay to keep things fast, alphabetical sorting, and smooth page-by-page viewing.
* **Safe Form Rules:** Uses Zod and React Hook Form to check user inputs, prevent duplicate emails, and make sure all data is correct.
* **Easy to Use (Accessibility):** Works great with a keyboard, keeps your screen focus inside pop-ups, stops background scrolling when a pop-up is open, and shows clear loading or empty screens.
* **Extra Details:** Full dark mode support, looks great on mobile phones, and connects to a test API.

---

## 🏗️ Architectural Approach

To keep the code clean and easy to grow, the project is split into simple layers:
* **UI Layer:** Basic components that just handle what you see on the screen (`StatCard`, `MembersTable`).
* **Logic Layer:** Custom hooks (`useMembers`) that manage the data steps (search → filter → sort → show pages).
* **Service Layer:** A separate file (`memberApi.js`) just for talking to the database/API.
* **Utility Layer:** Simple helper functions for math calculations and fixed text.

---

## 📁 Folder Structure

Here is a quick look at how the project files are organized:

* **`src/`**: The main application code.
  * **`components/`**: Reusable UI parts grouped by feature (`Dashboard`, `Forms`, `Members`, `UI`).
  * **`context/`**: Global state management (handles the Dark Mode theme).
  * **`hooks/`**: Custom React logic to keep components clean.
  * **`pages/`**: The main page views (The Dashboard).
  * **`services/`**: Files that fetch and save data to the API.
  * **`utils/`**: Helper functions and text constants used across the app.

---

## 🛠️ Tools & Technologies

* **Core:** React (v19), Vite, Tailwind CSS (v4)
* **Forms & Checking:** React Hook Form, Zod 
* **Design Extras:** React Icons, React Hot Toast (for pop-up alerts)
* **Data Management:** MockAPI.io for testing data and backend actions
* **AI Help:** ChatGPT & Google Gemini (used for bouncing ideas, fixing bugs, and improving accessibility)

---

## 🧗 Challenges & Solutions

| Challenge | How I Fixed It |
| :--- | :--- |
| **Managing Data Speed** | Handling search, sort, and pages at the same time made the app a bit slow. I fixed this by processing data step-by-step and delaying the search bar slightly (300ms) so it doesn't overwork the app. |
| **Form Rules & User Experience** | Checking forms manually was messy. I switched to Zod to easily set strict rules, clean up user typing, and block duplicate member entries. |
| **Making the App Accessible** | Pop-ups were hard to use with a keyboard. I added standard web rules to keep the keyboard focus trapped inside the pop-up and locked the background from scrolling. |

---

## 💡 Future Improvements 

If I had more time, I would add:
1. **Automated Testing:** Write tests for the main features and data steps to make sure everything works perfectly without breaking.
2. **Backend Processing:** Move the sorting, filtering, and paging to the server so the app stays lightning fast even if there are thousands of members.
3. **Full Member Control:** Add simple buttons to Edit and Delete existing members directly from the table.
4. **Clickable Stats:** Make the top dashboard cards clickable, allowing users to instantly filter the table (for example, clicking "Active Members" would filter the list automatically).