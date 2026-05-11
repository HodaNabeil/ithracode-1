import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PathCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col h-full border-border/50 shadow-sm">
      <Skeleton className="w-full aspect-video rounded-none" />
      <CardContent className="flex flex-col flex-1 gap-4 p-6">
        <div className="space-y-3">
          <Skeleton className="h-7 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Skeleton className="h-11 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}
