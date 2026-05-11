'use server';

import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

type CreateCourseInput = {
  title: string;
  price: number;
  slug: string;
  pathId: string;
};

export async function createCourse(data: CreateCourseInput) {
  const course = await prisma.course.create({
    data: {
      ...data,
      instructorId: 'cmnnkquiz0000fldgx4gy7ykf',
      description: 'description',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000',
      level: 'BEGINNER',
      status: 'PUBLISHED',
      visibility: 'PUBLIC',
      isFeatured: false,
      duration: null,
      requirements: [],
      objectives: [],
      targetAudience: [],
      tags: [],
      metaTitle: null,
      metaDescription: null,
      certificateEnabled: true,
      maxStudents: null,
    },
  });

  revalidateTag('courses', 'max');

  return course;
}

type UpdateCourseInput = {
  id: string;
  title?: string;
  price?: number;
  slug?: string;
  pathId?: string;
};

export async function updateCourse(data: UpdateCourseInput) {
  const course = await prisma.course.update({
    where: { id: data.id },
    data,
  });

  revalidateTag('courses', 'max');

  return course;
}

export async function deleteCourse(id: string) {
  await prisma.course.delete({
    where: { id },
  });

  revalidateTag('courses', 'max');
}
