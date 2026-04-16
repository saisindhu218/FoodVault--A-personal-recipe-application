// MongoDB API Service Layer
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const parseApiResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (isJson) {
    return response.json();
  }

  const text = await response.text();
  return {
    message: text?.trim()
      ? `Server returned non-JSON response: ${text.slice(0, 120)}`
      : 'Server returned non-JSON response'
  };
};

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

interface ForgotPasswordResponse {
  message: string;
  temporaryPassword: string;
}

interface BasicMessageResponse {
  message: string;
}

// SINGLE Recipe type that matches backend
export interface Recipe {
  _id: string;
  title: string;
  description?: string;
  category: string;
  ingredients: string[];
  preparationSteps: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  imageUrl?: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

// For RecipeCard component compatibility - FIXED: Made ingredients required
export interface RecipeCardProps {
  id: string;
  title: string;
  description?: string;
  category: string;
  image_url?: string;
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  author?: string;
  created_at?: string;
  ingredients: string[]; // CHANGED: Made required
}

export const authApi = {
  signUp: async (email: string, password: string, username: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    });
    
    const data = await parseApiResponse(response);

    if (!response.ok) {
      const error = data as { message?: string };
      throw new Error(error.message || 'Signup failed');
    }

    return data as AuthResponse;
  },

  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await parseApiResponse(response);

    if (!response.ok) {
      const error = data as { message?: string };
      throw new Error(error.message || 'Sign in failed');
    }

    return data as AuthResponse;
  },

  forgotPassword: async (email: string): Promise<ForgotPasswordResponse> => {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await parseApiResponse(response);

    if (!response.ok) {
      const error = data as { message?: string };
      throw new Error(error.message || 'Forgot password failed');
    }

    return data as ForgotPasswordResponse;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<BasicMessageResponse> => {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await parseApiResponse(response);

    if (!response.ok) {
      const error = data as { message?: string };
      throw new Error(error.message || 'Failed to change password');
    }

    return data as BasicMessageResponse;
  },

  signOut: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: (): string | null => localStorage.getItem('token'),
  
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

export const recipeApi = {
  getAll: async (): Promise<Recipe[]> => {
    const response = await fetch(`${API_URL}/recipes`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    
    return response.json();
  },

  getById: async (id: string): Promise<Recipe> => {
    const response = await fetch(`${API_URL}/recipes/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }
    
    return response.json();
  },

  getMyRecipes: async (): Promise<Recipe[]> => {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/recipes/my-recipes`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch your recipes');
    }
    
    return response.json();
  },

  create: async (recipe: Omit<Recipe, '_id' | 'author' | 'createdAt' | 'updatedAt'>): Promise<Recipe> => {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(recipe),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create recipe');
    }
    
    return response.json();
  },

  update: async (id: string, recipe: Partial<Omit<Recipe, '_id' | 'author' | 'createdAt' | 'updatedAt'>>): Promise<Recipe> => {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(recipe),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update recipe');
    }
    
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/recipes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete recipe');
    }
  },
};