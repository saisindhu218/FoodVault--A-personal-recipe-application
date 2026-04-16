
# FoodVault – Personal Recipe Management Web Application

FoodVault is a full-stack web application designed to help users organize, manage, and share their favorite recipes in a simple and efficient way. It provides a seamless experience for storing personal recipes while enabling easy access and updates anytime.


##  Key Features

###  User Authentication
- Secure signup and login  
- Forgot password functionality  
- Password change support  

###  Recipe Management
- Add, edit, and delete recipes  
- View all recipes or only personal recipes  

###  Detailed Recipe Information
- Ingredients list  
- Step-by-step cooking instructions  
- Cooking time estimation  
- Difficulty level classification  

###  User-Centric Dashboard
- Personalized recipe collection  
- Easy navigation and updates  


##  Tech Stack

### Frontend
- React (with TypeScript)  
- Vite  
- Tailwind CSS  

### Backend
- Node.js  
- Express.js  
- MongoDB  

### Authentication & Security
- JSON Web Tokens (JWT)  
- Bcrypt.js (password hashing)  



##  Installation & Setup

###  Backend Setup
```bash
cd backend
npm install
````

Create a `.env` file and add:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend server:

```bash
npm run dev
```



###  Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file and add:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```


##  How to Use

1. Navigate to `/auth` and create an account
2. Log in using your credentials
3. Click on **"Add Recipe"** to create a new recipe
4. View your recipes under **"My Recipes"**
5. Update your password anytime from your profile


## 🔗 API Endpoints

### Authentication

* `POST /api/auth/register` → Register a new user
* `POST /api/auth/login` → User login
* `POST /api/auth/forgot-password` → Reset password
* `POST /api/auth/change-password` → Change password

### Recipes

* `GET /api/recipes` → Fetch all recipes
* `POST /api/recipes` → Create a recipe
* `PUT /api/recipes/:id` → Update a recipe
* `DELETE /api/recipes/:id` → Delete a recipe


##  Application Preview

![App Screenshot](https://github.com/user-attachments/assets/08f4c5cd-fe4e-4cef-b57d-96e7a59d2451)

![App Screenshot](https://github.com/user-attachments/assets/0a7c9e4d-f108-4a1f-8ff2-e1713703fbd7)

![App Screenshot](https://github.com/user-attachments/assets/99dc5b01-8db3-466d-bab0-661ceb634621)

![App Screenshot](https://github.com/user-attachments/assets/f43dd2ea-c42c-4e64-b8bf-1e047730fcd4)



##  License

This project is licensed under the **MIT License**.



##  Author

**Rachabattuni Sai Sindhu**


