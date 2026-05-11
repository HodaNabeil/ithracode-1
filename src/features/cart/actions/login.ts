// features/auth/actions/login.ts
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function syncCartAfterLogin(userId: string) {
  const cookieStore = await cookies();
  const guestCartData = cookieStore.get('guest_cart')?.value;

  if (guestCartData) {
    const courseIds: string[] = JSON.parse(guestCartData);

    // 1. Get or Create User's DB Cart
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    const courses = await prisma.course.findMany({
      where: { id: { in: courseIds } },
      select: { id: true, price: true },
    });

    // 2. Add all guest items to the DB Cart
    await Promise.all(
      courses.map((course) =>
        prisma.cartItem.upsert({
          where: { cartId_courseId: { cartId: cart.id, courseId: course.id } },
          update: {},
          create: {
            cartId: cart.id,
            courseId: course.id,
            price: course.price,
          },
        }),
      ),
    );

    // 3. Delete the guest cookie
    cookieStore.delete('guest_cart');
  }
}
