import { User as PrismaUser, Role } from '@prisma/client';

/**
 * Basic User type matching the Prisma model
 */
export type User = PrismaUser;

/**
 * Safe version of the User type for frontend use (removes sensitive fields and converts dates to strings)
 */
export type SafeUser = Omit<
  PrismaUser,
  'password' | 'emailVerified' | 'createdAt' | 'updatedAt'
> & {
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
};

export { Role };
