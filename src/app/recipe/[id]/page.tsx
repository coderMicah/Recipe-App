import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Recipe {
  title: string;
  image: string;
  readyInMinutes: number;
  summary: string;
  vegan: boolean;
  id: string;
  dishTypes: string[];
  analyzedInstructions: [{ name: string; steps: Steps[] }];
}

interface Ingredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}
interface Equipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}
interface Length {
  number: number;
  unit: string;
}

interface Steps {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length: Length;
}

async function getRecipe(id: number): Promise<Recipe> {
  const data = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information/?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  //delay response
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return data.json();
}

export default async function RecipePage({
  params,
}: {
  params: { id: number };
}) {
  const recipe = await getRecipe(params.id);

  return (
    <main className="p-8">
      <div>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={recipe.image}
            alt="Image"
            sizes="100vw"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>

      <h2 className="mt-6">Recipe Summary</h2>
      <div className="flex flex-wrap gap-4 my-6">
        {/* {recipe.dishTypes.map((dish) => (
          <Badge key={dish}>
            {dish}
          </Badge>
        ))} */}
      </div>
      <p
        className="text-lg leading-7 [&:not(:first-child)]:mt-6"
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />

      <h2 className="mt-6">Steps</h2>

      <ul className="p-4 space-y-4">
        {recipe?.analyzedInstructions[0].steps.map((step) => (
          <li className="list-decimal" key={step.number}>
            {step.step}
          </li>
        ))}
      </ul>
    </main>
  );
}
