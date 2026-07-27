import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recipeApi } from "@/lib/mongodb-api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

const createIngredientField = (value = "") => ({
  id: crypto.randomUUID(),
  value,
});

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState<Array<{ id: string; value: string }>>([
    createIngredientField(),
  ]);
  const [preparationSteps, setPreparationSteps] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddIngredient = () => {
    setIngredients([...ingredients, createIngredientField()]);
  };

  const handleRemoveIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    }
  };

  const handleIngredientChange = (id: string, value: string) => {
    const newIngredients = ingredients.map((ingredient) =>
      ingredient.id === id ? { ...ingredient, value } : ingredient
    );
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to add recipes");
      return;
    }

    const filteredIngredients = ingredients
      .map((ingredient) => ingredient.value)
      .filter((ingredient) => ingredient.trim() !== "");
    
    if (filteredIngredients.length === 0) {
      toast.error("Please add at least one ingredient");
      return;
    }

    if (!preparationSteps.trim()) {
      toast.error("Please add preparation steps");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("category", category.trim());
      formData.append("ingredients", JSON.stringify(filteredIngredients));
      formData.append("preparationSteps", preparationSteps.trim());
      formData.append("difficulty", difficulty);

      if (prepTime) {
        formData.append("prepTime", prepTime);
      }

      if (cookTime) {
        formData.append("cookTime", cookTime);
      }

      if (servings) {
        formData.append("servings", servings);
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await recipeApi.create(formData);

      toast.success("Recipe added successfully!");
      navigate("/my-recipes");
    } catch (error: any) {
      toast.error(error.message || "Failed to add recipe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Recipe</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Recipe Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Chocolate Chip Cookies"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of your recipe..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Dessert, Main Course, Appetizer"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prepTime">Prep Time (min)</Label>
                  <Input
                    id="prepTime"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    placeholder="15"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cookTime">Cook Time (min)</Label>
                  <Input
                    id="cookTime"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                    placeholder="30"
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    placeholder="4"
                    type="number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as "Easy" | "Medium" | "Hard")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Recipe Image (optional)</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                />
                <p className="text-sm text-muted-foreground">
                  Upload an image from your device. JPG, PNG, and WEBP files are supported.
                </p>
                {imageFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {imageFile.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Ingredients *</Label>
                {ingredients.map((ingredient, index) => (
                  <div key={ingredient.id} className="flex gap-2">
                    <Input
                      value={ingredient.value}
                      onChange={(e) => handleIngredientChange(ingredient.id, e.target.value)}
                      placeholder={`Ingredient ${index + 1}`}
                      className="flex-1"
                    />
                    {ingredients.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveIngredient(ingredient.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddIngredient}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preparationSteps">Preparation Steps *</Label>
                <Textarea
                  id="preparationSteps"
                  value={preparationSteps}
                  onChange={(e) => setPreparationSteps(e.target.value)}
                  placeholder="Describe the preparation steps in detail..."
                  rows={6}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Recipe"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddRecipe;