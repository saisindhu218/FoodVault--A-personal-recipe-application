import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { recipeApi, type RecipeCardProps } from "@/lib/mongodb-api";
import { useAuth } from "@/contexts/AuthContext";
import RecipeCard from "@/components/RecipeCard";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMyRecipes();
    }
  }, [user]);

  const fetchMyRecipes = async () => {
    try {
      const data = await recipeApi.getMyRecipes();
      // Transform backend data to frontend format
      const transformedRecipes: RecipeCardProps[] = data.map(recipe => ({
        id: recipe._id,
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        image_url: recipe.imageUrl,
        prep_time: recipe.prepTime,
        cook_time: recipe.cookTime,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        author: recipe.author.username,
        created_at: recipe.createdAt,
        ingredients: recipe.ingredients // ADDED THIS
      }));
      setRecipes(transformedRecipes);
    } catch (error: any) {
      // FIXED: Handle the exception properly
      console.error("Failed to load user recipes:", error);
      toast.error("Failed to load your recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await recipeApi.delete(deleteId);
      setRecipes(recipes.filter((r) => r.id !== deleteId));
      toast.success("Recipe deleted successfully");
    } catch (error: any) {
      console.error("Failed to delete recipe:", error);
      toast.error("Failed to delete recipe");
    } finally {
      setDeleteId(null);
    }
  };

  // FIXED: Extract nested ternary into separate function
  const getContent = () => {
    if (loading) {
      return <div className="text-center text-muted-foreground">Loading your recipes...</div>;
    }
    
    if (recipes.length === 0) {
      return (
        <div className="text-center text-muted-foreground">
          You haven't added any recipes yet. Start by adding your first recipe!
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onView={(id) => navigate(`/recipe/${id}`)}
            onEdit={(id) => navigate(`/edit-recipe/${id}`)}
            onDelete={(id) => setDeleteId(id)}
            showActions
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">My Recipes</h1>
          <button
            type="button"
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-secondary"
            onClick={() => navigate('/change-password')}
          >
            Change Password
          </button>
        </div>

        {getContent()}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your recipe.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyRecipes;