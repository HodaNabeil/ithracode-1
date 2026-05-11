import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CartEmptyState() {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-20 space-y-6 text-center',
      )}
    >
      <div className={cn('p-6 bg-muted rounded-full')}>
        <ShoppingBag className={cn('size-12 text-muted-foreground')} />
      </div>
      <div className="space-y-2">
        <h2 className={cn('text-2xl font-bold')}>عربة التسوق فارغة</h2>
        <p className={cn('text-muted-foreground max-w-xs mx-auto')}>
          لم تقم بإضافة أي دورات إلى عربة التسوق الخاصة بك بعد.
        </p>
      </div>
      <Button asChild className={cn('rounded-full px-8 h-12 font-bold')}>
        <Link href="/courses">تصفح الدورات</Link>
      </Button>
    </div>
  );
}
