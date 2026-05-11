import { APP_ROUTES } from '@/constant/enums';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ShoppingCart } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

export default async function ShopingCartButton() {
  const session = await auth();
  let cartCount = 0;

  if (session?.user?.id) {
    cartCount = await prisma.cartItem.count({
      where: { cart: { userId: session.user.id } },
    });
  } else {
    const guestCart = (await cookies()).get('guest_cart')?.value;
    if (guestCart) {
      cartCount = JSON.parse(guestCart).length;
    }
  }
  return (
    <Link href={APP_ROUTES.CART} className="relative">
      <ShoppingCart />
      <p
        className="absolute top-[-10px] right-[-10px] bg-primary text-primary-foreground
       rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
      >
        {cartCount}
      </p>
    </Link>
  );
}
