import Stripe from 'stripe';
import { env } from '@/config/env';

export const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: '2026-03-25.dahlia',
});
