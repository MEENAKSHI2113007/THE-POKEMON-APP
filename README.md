# THE-POKEMON-APP
The Pokemon Search App is a web application for exploring Pokemon data, featuring search, sorting, pagination, and detailed Pokemon profiles with similar Pokemon suggestions. Built with React.js, Node.js, and MongoDB, it integrates data from the PokeAPI for a seamless user experience.
## Tech Stack

### Backend
- **Node.js**: Server-side runtime.
- **Express.js**: Framework for building APIs.
- **MongoDB**: NoSQL database to store Pokémon data.
- **Mongoose**: MongoDB ODM (Object Data Modeling) library.
- **Axios**: HTTP client for making API requests.

### Frontend
- **React.js**: Library for building the user interface.
- **React Router**: For navigation and routing.
- **CSS**: For styling.

---

## Pre-requisite

Before running the app locally, ensure the following are installed:
1. **Node.js** (v14 or later)
2. **MongoDB** (Local instance or a cloud-based connection string)

---

## Migration & Seed Database Steps

1. **Start MongoDB**  
   Ensure MongoDB is running on your system.

2. **Clone Repository**  
   Clone the repository to your local system:
   ```bash
   git clone <repo-link>
   cd <repo-folder>
   ```markdown

## Migration & Seed Database Steps

### Install Dependencies

Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

### Seed Pokémon Data

Run the seed script to populate the database with Pokémon data:
```bash
node seed.js
```

---

## Running the App

### Backend

1. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```
2. The backend server will run at `http://localhost:5000`.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```
4. The frontend will run at `http://localhost:3000`.

---

## Features

1. **Search Pokémon**  
   Search Pokémon by name or ID directly from the homepage.
   
2. **Filter Pokémon**  
   Filter Pokémon by type, height, or weight.

3. **Sort Pokémon**  
   Sort Pokémon by name, height, or weight in ascending or descending order.

4. **Pagination**  
   Browse Pokémon in pages, with 10 Pokémon displayed per page.

5. **Detailed Pokémon View**  
   Click on a Pokémon to view its detailed stats, including ID, type, height, weight, and stats like attack, defense, and special abilities.

6. **Similar Pokémon Suggestions**  
   View three similar Pokémon based on height, weight, and type criteria.

---

## Directory Structure

```
project/
├── backend/
│   ├── models/
│   │   └── Pokemon.js
│   ├── routes/
│   │   └── pokemonRoutes.js
│   ├── seed.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PokemonDetails.js
│   │   │   └── PokemonList.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   └── package.json
├── README.md
└── package.json
```
```
