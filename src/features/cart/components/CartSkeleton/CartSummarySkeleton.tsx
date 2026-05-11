import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function CartSummarySkeleton() {
  return (
    <div
      className={cn('pt-8 lg:pt-0 flex flex-col gap-6 top-24 text-right')}
      dir="rtl"
    >
      <div className="space-y-4">
        <div
          className={cn(
            'mb-2 flex lg:flex-col gap-2 lg:gap-0 flex-wrap sm:flex-nowrap',
          )}
        >
          <Skeleton className="h-5 w-24 mb-1" /> {/* Total Label */}
          <div
            className={cn(
              'flex flex-row lg:flex-col gap-2 lg:gap-0 items-start text-right',
            )}
          >
            <Skeleton className="h-10 w-32" /> {/* Main Price */}
            <div
              className={cn(
                'flex flex-row lg:flex-col gap-2 lg:gap-0 items-start mt-0.5',
              )}
            >
              <Skeleton className="h-5 w-20" /> {/* Original Price */}
              <Skeleton className="h-5 w-24" /> {/* Discount Percentage */}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-12 w-full rounded-md" />{' '}
          {/* Checkout Button */}
          <div className="flex justify-center">
            <Skeleton className="h-4 w-40" /> {/* Helper text */}
          </div>
        </div>
      </div>

      <div className={cn('pt-6 border-t border-border')}>
        <Skeleton className="h-10 w-full rounded-lg" />{' '}
        {/* Coupon Toggle/Button */}
      </div>
    </div>
  );
}
