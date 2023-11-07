import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface Recipe {
  title: string;
  image: string;
  readyInMinutes: number;
  summary: string;
  vegan: boolean;
  id: string;
}

async function getRecipes(): Promise<{ recipes: Recipe[] }> {
  const data = await fetch(
    `https://api.spoonacular.com/recipes/random/?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&number=9`
  );

  //delay response
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return data.json();
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {recipes?.recipes.map((recipe) => (
          <Card key={recipe.id} className="flex flex-col justify-between">
            <CardHeader className="flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage src={`${recipe.image}`} alt="recipe-img" />
                <AvatarFallback>{recipe.title.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>
                  {recipe.readyInMinutes} mins to cook
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <p className="line-clamp-3" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button>
                <Link href={`/recipe/${recipe.id}`}>View Recipe</Link>
              </Button>

              {recipe.vegan && <Badge variant="secondary">Vegan!</Badge>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
