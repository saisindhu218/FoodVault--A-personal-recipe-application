import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { recipeApi, type RecipeCardProps } from "@/lib/mongodb-api";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const Home = () => {
  const [recipes, setRecipes] = useState<RecipeCardProps[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeCardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.ingredients?.some((ing) =>
            ing.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchQuery, recipes]);

  const fetchRecipes = async () => {
    try {
      const data = await recipeApi.getAll();
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
        ingredients: recipe.ingredients
      }));
      setRecipes(transformedRecipes);
      setFilteredRecipes(transformedRecipes);
    } catch (error: any) {
      // FIXED: Handle the exception properly
      console.error("Failed to load recipes:", error);
      toast.error("Failed to load recipes");
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Extract nested ternary into separate function
  const getContent = () => {
    if (loading) {
      return <div className="text-center text-muted-foreground">Loading recipes...</div>;
    }
    
    if (filteredRecipes.length === 0) {
      return (
        <div className="text-center text-muted-foreground">
          {searchQuery ? "No recipes found matching your search." : "No recipes yet. Add your first recipe!"}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onView={(id) => navigate(`/recipe/${id}`)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search recipes by name, category, description, or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {getContent()}
      </div>
    </div>
  );
};

export default Home;