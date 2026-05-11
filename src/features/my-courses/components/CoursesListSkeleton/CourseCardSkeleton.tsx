import { Skeleton } from '@/components/ui/skeleton';

export function CourseCardSkeleton() {
  return (
    <li className="list-none">
      <div className="block h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300">
        <div className="relative aspect-16/10 overflow-hidden bg-muted">
          <Skeleton className="h-full w-full rounded-none" />
        </div>

        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-10" />
            </div>
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        </div>
      </div>
    </li>
  );
}
