import { ChefHat, LogOut, Plus, Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  return (
    <nav className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <ChefHat className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">FoodVault</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant={location.pathname === "/" ? "default" : "ghost"}
              onClick={() => navigate("/")}
            >
              <Home className="w-4 h-4 mr-2" />
              All Recipes
            </Button>
            <Button
              variant={location.pathname === "/my-recipes" ? "default" : "ghost"}
              onClick={() => navigate("/my-recipes")}
            >
              <User className="w-4 h-4 mr-2" />
              My Recipes
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => navigate("/add-recipe")}>
            <Plus className="w-4 h-4 mr-2" />
            Add Recipe
          </Button>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
