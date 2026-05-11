import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export function CartItemSkeleton() {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row gap-4 sm:py-4',
        'border border-border pb-4 sm:pb-0',
        'sm:border-t-0 sm:border-x-0 sm:border-b last:border-0 sm:last:border-b-0',
        'animate-pulse',
      )}
      dir="rtl"
    >
      {/* Image Skeleton */}
      <div
        className={cn(
          'relative h-42 w-full sm:w-[120px] sm:h-[68px]',
          'overflow-hidden rounded bg-muted',
        )}
      >
        <Skeleton className="h-full w-full" />
      </div>

      {/* Details Skeleton */}
      <div
        className={cn(
          'flex-1 flex gap-2 lg:justify-between flex-col px-4 sm:px-0',
        )}
      >
        <div className="space-y-2">
          {/* Title Skeleton */}
          <Skeleton className="h-5 w-3/4 sm:h-6" />
          <Skeleton className="h-4 w-1/2 hidden sm:block" />
        </div>

        <div className={cn('flex flex-col gap-2 my-4')}>
          {/* Meta Info Skeletons */}
          <div className="flex gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        {/* Actions (mobile) */}
        <div
          className={cn('flex flex-row xl:hidden gap-4 items-start order-2')}
        >
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Actions (desktop) */}
      <div className={cn('hidden xl:flex gap-2 flex-col items-end order-2')}>
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Price Area Skeleton */}
      <div
        className={cn(
          'px-4 sm:px-0 flex flex-col lg:mr-8 items-start md:items-end gap-2 min-w-[120px] order-last',
        )}
      >
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}
