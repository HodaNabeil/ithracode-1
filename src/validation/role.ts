import { Role } from '@prisma/client';

export function parseRole(roleFromUI: string): Role {
  if (!(roleFromUI in Role)) {
    throw new Error('Invalid role');
  }

  return Role[roleFromUI as keyof typeof Role];
}
