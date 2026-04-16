
# FoodVault - Personal Recipe Application

A web app to manage and share your favorite recipes.

## Features
- User authentication (sign up, login, forgot password)
- Add, edit, and delete recipes
- View all recipes or just your own
- Change password anytime
- Recipe details: ingredients, steps, cooking time, difficulty level

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT + Bcryptjs

## Installation

### Backend
```bash
cd backend
npm install
# Create .env file with MONGODB_URI and JWT_SECRET
npm run dev
```

### Frontend
```bash
cd frontend
npm install
# Create .env file with VITE_API_URL=http://localhost:5000/api
npm run dev
```

## Usage
1. Sign up at `/auth`
2. Add recipes from the "Add Recipe" button
3. View your recipes in "My Recipes"
4. Change password anytime from "My Recipes"

## API Endpoints
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Reset password
- `POST /api/auth/change-password` - Change password
- `GET/POST /api/recipes` - View/create recipes
- `PUT/DELETE /api/recipes/:id` - Edit/delete recipes

## Result 
<img width="1920" height="1020" alt="Image" src="https://github.com/user-attachments/assets/08f4c5cd-fe4e-4cef-b57d-96e7a59d2451" />

<img width="1920" height="1020" alt="Image" src="https://github.com/user-attachments/assets/0a7c9e4d-f108-4a1f-8ff2-e1713703fbd7" />

<img width="1920" height="1020" alt="Image" src="https://github.com/user-attachments/assets/99dc5b01-8db3-466d-bab0-661ceb634621" />

<img width="1920" height="1020" alt="Image" src="https://github.com/user-attachments/assets/f43dd2ea-c42c-4e64-b8bf-1e047730fcd4" />
## License
MIT


#### Rachabattuni Sai Sindhu
