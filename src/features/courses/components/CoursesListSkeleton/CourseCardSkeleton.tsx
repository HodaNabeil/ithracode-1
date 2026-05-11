import { Skeleton } from '@/components/ui/skeleton';

export function CourseCardSkeleton() {
  return (
    <div className="list-none">
      <div className="block h-full overflow-hidden rounded-xl border border-border bg-card">
        <Skeleton className="aspect-video w-full rounded-none" />

        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="h-6 flex-1 mb-2" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          <div className="h-16 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="mt-auto flex items-center justify-between pt-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
