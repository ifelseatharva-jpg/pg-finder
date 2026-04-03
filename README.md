# 🏠 PGFinder — Room & PG Finder for Students

**Mini Project | Second Year B3 (AI & DS)**  
**P.R. Pote Patil College of Engineering & Management, Amravati**  
**Subject Teacher:** Prof. P.R. Maskare | **HOD:** Dr. A.B. Gadicha

---

## 📌 Problem Statement

Students moving to a new city for college face difficulty finding affordable, safe, and nearby accommodation. PGFinder is a web-based platform where owners can list rooms/PGs, and students can search, filter, and directly contact owners — without any brokerage.

---

## 🛠️ Technologies Used

| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | HTML, CSS, JavaScript |
| Backend   | Node.js + Express  |
| Database  | MongoDB + Mongoose |

---

## 📁 Project Structure

```
pg-finder/
├── server.js              # Main Express server
├── .env                   # Environment variables
├── package.json
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   └── Room.js            # Mongoose schema
├── routes/
│   └── rooms.js           # API routes (CRUD)
└── public/
    ├── index.html         # Home / landing page
    ├── css/style.css      # Global styles
    ├── js/utils.js        # Shared JS utilities
    └── pages/
        ├── list.html      # Browse rooms with filters
        ├── post.html      # Add new room listing
        └── manage.html    # Admin: edit/delete/toggle
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)
- npm

### Steps

```bash
# 1. Navigate to project folder
cd pg-finder

# 2. Install dependencies
npm install

# 3. Configure environment
# Edit .env file:
#   PORT=3000
#   MONGO_URI=mongodb://localhost:27017/pgfinder

# 4. Start MongoDB (if local)
mongod

# 5. Start the server
npm start

# OR for development with auto-reload:
npm run dev

# 6. Open browser
# http://localhost:3000
```

---

## 🌐 Pages

| Route     | Page           | Description                              |
|-----------|----------------|------------------------------------------|
| `/`       | Home           | Landing page with recent listings        |
| `/list`   | Browse Rooms   | Filter & search all available rooms      |
| `/post`   | List a Room    | Form to add a new room listing           |
| `/manage` | Manage         | Edit, delete, toggle availability        |

---

## 🔌 API Endpoints

| Method | Endpoint              | Description               |
|--------|-----------------------|---------------------------|
| GET    | `/api/rooms`          | Get all rooms (with filters) |
| GET    | `/api/rooms/:id`      | Get single room           |
| POST   | `/api/rooms`          | Create new room listing   |
| PUT    | `/api/rooms/:id`      | Update room               |
| DELETE | `/api/rooms/:id`      | Delete room               |
| PATCH  | `/api/rooms/:id/toggle` | Toggle availability     |

### Query Parameters for GET /api/rooms
- `type` — Room type filter
- `availableFor` — Boys / Girls
- `minRent`, `maxRent` — Rent range
- `area` — Area search (partial match)
- `available` — true / false

---

## ✅ Features Implemented

- [x] 2–3 UI pages (Home, Browse, Post, Manage)
- [x] Node.js backend with Express
- [x] MongoDB database connectivity
- [x] Insert (POST /api/rooms)
- [x] Display (GET /api/rooms)
- [x] Update (PUT /api/rooms/:id)
- [x] Delete (DELETE /api/rooms/:id)
- [x] Input validation (frontend + backend)
- [x] Clear problem statement and working solution

---

## 👥 Team Members

1. ___________________________
2. ___________________________
3. ___________________________
4. ___________________________

---

*Submission Deadline: 09/04/2026*
