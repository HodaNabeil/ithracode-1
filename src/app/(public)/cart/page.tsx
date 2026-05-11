import { Suspense } from 'react';
import CartContainer from '@/features/cart/components/CartContainer';
import { CartSkeleton } from '@/features/cart/components/CartSkeleton/CartSkeleton';

export default async function CartPage() {
  return (
    <div className="pb-6">
      <Suspense fallback={<CartSkeleton />}>
        <CartContainer />
      </Suspense>
    </div>
  );
}
