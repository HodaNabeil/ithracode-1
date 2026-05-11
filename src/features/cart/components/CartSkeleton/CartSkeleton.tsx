import { cn } from '@/lib/utils';
import { CartItemSkeleton } from './CartItemSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { CartSummarySkeleton } from './CartSummarySkeleton';

export function CartSkeleton() {
  return (
    <div
      className={cn(
        'flex flex-col-reverse lg:flex-row gap-6 lg:gap-12 container px-4 pb-32 lg:pb-0',
      )}
      dir="rtl"
    >
      {/* Cart Items List */}
      <div className={cn('flex-1 space-y-4')}>
        <Skeleton className="h-6 w-48 mb-4" />
        <div
          className={cn(
            'border-t border-border flex flex-col gap-4 sm:flex-none sm:gap-0',
          )}
        >
          {[...Array(3)].map((_, i) => (
            <CartItemSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Cart Summary Panel */}
      <div className={cn('w-full lg:w-[400px]')}>
        <CartSummarySkeleton />
      </div>
    </div>
  );
}
