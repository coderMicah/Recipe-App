import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <main className="p-8">
      <Skeleton>
        <div className="w-full">
          <AspectRatio ratio={16 / 9}></AspectRatio>
        </div>
      </Skeleton>

      <Skeleton className="h-12 mt-6 flex-grow " />

      <div className="flex flex-wrap gap-4 my-6">
        {"1234".split("").map((i) => (
          <Skeleton key={i} className="w-12 h-5 rounded px-2.5 py-0.5" />
        ))}
      </div>

      <Skeleton className="h-4 flex-grow mt-4" />
      <Skeleton className="h-4 flex-grow mt-4" />
      <Skeleton className="h-4 w-1/2 mt-4" />

      <Skeleton className="h-12 mt-6 flex-grow " />


      <Skeleton className="h-4 flex-grow mt-4" />
      <Skeleton className="h-4 flex-grow mt-4" />

      <Skeleton className="h-4 w-1/2 mt-4" />
      
    </main>
  );
}

export default loading;
