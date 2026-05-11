'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/features/cart/actions/cart';
import { ShoppingCart, ArrowRight, Loader2 } from 'lucide-react';

interface AddToCartButtonProps {
  courseId: string;
  userId?: string;
  initialIsInCart: boolean;
}

export default function AddToCartButton({
  courseId,
  userId,
  initialIsInCart,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(initialIsInCart);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (added) {
      router.push('/cart');
      return;
    }

    startTransition(async () => {
      const result = await addToCart(courseId, userId);

      if (result.success) {
        setAdded(true);
      } else {
        alert(result.error || 'حدث خطأ ما');
      }
    });
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isPending}
      variant={added ? 'outline' : 'default'}
      className="px-6 h-11 w-full md:w-fit rounded-xl text-base flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
    >
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : added ? (
        <>
          <ArrowRight className="w-5 h-5" />
          <span>الذهاب إلى السلة</span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          <span>إضافة إلى السلة</span>
        </>
      )}
    </Button>
  );
}
