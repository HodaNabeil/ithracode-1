import { resolveCartPageState } from '../lib/cart-page-state';
import { CartEmptyState } from './CartEmptyState';
import { CartErrorState } from './CartErrorState';
import { CartFilledView } from './CartFilledView';

export default async function CartContainer() {
  const state = await resolveCartPageState();

  switch (state.kind) {
    case 'failure':
      return <CartErrorState />;
    case 'empty':
      return <CartEmptyState />;
    case 'ready':
      return <CartFilledView cartData={state.data} />;
  }
}
