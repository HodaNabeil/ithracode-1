'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/formatters';
import { cn } from '../../../lib/utils';

import { CartCheckoutButton } from './CheckoutButton';
import { CartItemType } from '@/types/cart/cart';

interface CartSummaryProps {
  total: number;
  originalTotal: number;
  discount: number;
  currency: string;
  items: CartItemType[];
}

export function CartSummary({
  total,
  originalTotal,
  discount,
  currency,
  items,
}: CartSummaryProps) {
  const [showCoupon, setShowCoupon] = useState(false);

  return (
    <div
      className={cn(
        'pt-8',
        'lg:pt-0',
        'flex',
        'flex-col',
        'gap-6',
        'top-24',
        'text-right',
      )}
    >
      <div className="space-y-4">
        <div
          className={cn(
            'mb-2',
            'flex',
            'lg:flex-col',
            'gap-2',
            'lg:gap-0',
            'flex-wrap',
            'sm:flex-nowrap',
          )}
        >
          <span
            className={cn(
              'text-muted-foreground',
              'text-base',
              'font-medium',
              'block',
              'mb-1',
            )}
          >
            الإجمالي:
          </span>

          <div
            className={cn(
              'flex',
              'flex-row',
              'lg:flex-col',
              'gap-2',
              'lg:gap-0',
              'items-start',
              'text-right',
            )}
          >
            <span
              className={cn(
                'text-xl',
                'sm:text-3xl',
                'font-medium',
                'tracking-tight',
                'text-primary',
              )}
            >
              {formatPrice(total, currency)}
            </span>
            {originalTotal > total && (
              <div
                className={cn(
                  'flex',
                  'flex-row',
                  'lg:flex-col',
                  'gap-2',
                  'lg:gap-0',
                  'items-start',
                  'text-muted-foreground',
                  'mt-0.5',
                )}
              >
                <span className={cn('text-base', 'line-through', 'opacity-80')}>
                  {formatPrice(originalTotal, currency)}
                </span>
                <span className={cn('text-base', 'font-light')}>
                  خصم بنسبة {discount}%
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <CartCheckoutButton items={items} />
          <p className={cn('text-xs', 'text-muted-foreground', 'text-center')}>
            لن يتم خصم أي مبلغ منك حتى الآن
          </p>
        </div>
      </div>

      <div className={cn('pt-6', 'border-t', 'border-border')}>
        {showCoupon ? (
          <div className="space-y-4">
            <h3 className={cn('text-lg', 'font-bold', 'text-foreground')}>
              عروض ترويجية
            </h3>
            <div className={cn('flex', 'gap-2', 'items-center')} dir="rtl">
              <Input
                placeholder="إدخال القسيمة"
                className={cn(
                  'flex-1',
                  'h-10',
                  'border-border',
                  'bg-background',
                )}
              />
              <Button
                className={cn(
                  'h-10',
                  'px-6',
                  'font-bold',
                  'rounded-lg',
                  'shrink-0',
                )}
              >
                قدم
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setShowCoupon(true)}
            className={cn(
              'w-full',
              'h-10',
              'text-base',
              'font-bold',
              'text-primary',
              'border-primary',
              'hover:bg-primary/5',
              'rounded-lg',
            )}
          >
            تطبيق القسيمة
          </Button>
        )}
      </div>
    </div>
  );
}
