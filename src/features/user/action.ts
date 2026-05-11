import { prisma as db } from '@/lib/prisma';

import { Role } from '@prisma/client';
export async function changeUserRole(userId: string, role: Role) {
  return db.user.update({
    where: { id: userId },
    data: { role },
  });
}
