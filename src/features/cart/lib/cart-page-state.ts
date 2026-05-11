import type { CartDataType } from '@/types/cart/cart';
import { getCart } from '../services/getCartItems';

export type CartPageState =
  | { kind: 'failure' }
  | { kind: 'empty' }
  | { kind: 'ready'; data: CartDataType };

export type CartLoader = typeof getCart;

/**
 * Resolves cart data into a page-level view model (success / empty / failure).
 * Keeps data-fetch concerns out of presentation components.
 */
export async function resolveCartPageState(
  loadCart: CartLoader = getCart,
): Promise<CartPageState> {
  try {
    const response = await loadCart();
    const cartData = response?.data;
    const items = cartData?.items ?? [];

    if (!cartData || items.length === 0) {
      return { kind: 'empty' };
    }

    return { kind: 'ready', data: cartData };
  } catch (error) {
    console.error('Database Error:', error);
    return { kind: 'failure' };
  }
}
