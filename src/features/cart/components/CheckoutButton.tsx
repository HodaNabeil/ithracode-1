'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import type { CartItemType } from '@/types/cart/cart';
import { env } from '@/config/env';

export const CartCheckoutButton = ({ items }: { items: CartItemType[] }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isAuthenticated = status === 'authenticated';
  const isAuthLoading = status === 'loading';

  // 🔥 stable function (important for useEffect)
  const onCheckout = useCallback(async () => {
    if (!env.NEXT_PUBLIC_APP_URL) {
      console.error('Missing NEXT_PUBLIC_APP_URL');
      return;
    }

    if (isAuthLoading || loading) return;

    if (!isAuthenticated) {
      const callbackUrl = `/cart?checkout=true`;
      router.push(
        `/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      );
      return;
    }

    const userId = session?.user?.id;
    const userEmail = session?.user?.email;

    if (!userId || !userEmail || items.length === 0) return;

    try {
      setLoading(true);

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          items,
          userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const data = await response.json();

      // 🔥 redirect to Stripe
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isAuthLoading, session, items, loading, router]);

  useEffect(() => {
    const shouldAutoCheckout = searchParams.get('checkout') === 'true';

    if (isAuthenticated && shouldAutoCheckout && items.length > 0 && !loading) {
      router.replace(pathname, { scroll: false });
      onCheckout();
    }
  }, [
    isAuthenticated,
    searchParams,
    items.length,
    pathname,
    loading,
    router,
    onCheckout,
  ]);

  return (
    <Button
      variant="default"
      size="lg"
      disabled={items.length === 0 || loading || isAuthLoading}
      onClick={onCheckout}
      className={cn(
        'w-full h-14 lg:h-12 text-base font-bold rounded-xl transition-all active:scale-[0.98]',
        'bg-primary text-primary-foreground hover:bg-primary/90',
      )}
    >
      {loading || isAuthLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        'الانتقال إلى الدفع'
      )}
    </Button>
  );
};
