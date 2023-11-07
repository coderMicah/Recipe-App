import SkeletonCard from "@/components/SkeletonCard";

function Loading() {
  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {"123456789".split("").map((i) => (
          <SkeletonCard key={i}/>
        ))}
      </div>
    </main>
  );
}

export default Loading;
