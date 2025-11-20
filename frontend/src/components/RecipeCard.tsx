import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface Recipe {
  id: string;
  title: string;
  category: string;
  image_url?: string;
  ingredients: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onView: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const RecipeCard = ({ recipe, onView, onEdit, onDelete, showActions = false }: RecipeCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="aspect-video overflow-hidden bg-secondary">
        {recipe.image_url ? (
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{recipe.title}</h3>
          <Badge variant="secondary">{recipe.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {recipe.ingredients.length} ingredients
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button onClick={() => onView(recipe.id)} variant="default" className="flex-1">
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
        {showActions && (
          <>
            <Button onClick={() => onEdit?.(recipe.id)} variant="outline" size="icon">
              <Pencil className="w-4 h-4" />
            </Button>
            <Button onClick={() => onDelete?.(recipe.id)} variant="outline" size="icon">
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
