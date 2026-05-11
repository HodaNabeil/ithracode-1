'use server';

import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

export async function createPath(data: { title: string; slug: string }) {
  const path = await prisma.path.create({
    data: {
      ...data,
      shortDescription: 'summary',
      description: 'description',
      category: 'WEB',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000',
      isPublished: true,
      metaTitle: null,
      metaDescription: null,
    },
  });

  revalidateTag('paths', 'max');
  return path;
}

export async function updatePath(data: {
  id: string;
  title?: string;
  slug?: string;
}) {
  const path = await prisma.path.update({
    where: { id: data.id },
    data,
  });

  revalidateTag('paths', 'max');
  return path;
}

export async function deletePath(id: string) {
  await prisma.path.delete({
    where: { id },
  });

  revalidateTag('paths', 'max');
}
