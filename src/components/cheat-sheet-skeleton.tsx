import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CheatSheetSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <Skeleton className="h-10 w-3/4 mx-auto rounded-lg" />
      
      <div className="space-y-4 rounded-lg border p-4">
        <Skeleton className="h-8 w-1/4 rounded-md" />
        <Skeleton className="h-20 w-full rounded-md" />
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <Skeleton className="h-8 w-1/3 rounded-md" />
        <Skeleton className="h-6 w-full rounded-md" />
        <Skeleton className="h-6 w-5/6 rounded-md" />
        <Skeleton className="h-6 w-full rounded-md" />
      </div>

       <div className="space-y-4 rounded-lg border p-4">
        <Skeleton className="h-8 w-1/4 rounded-md" />
        <Skeleton className="h-20 w-full rounded-md" />
      </div>
    </div>
  );
}
