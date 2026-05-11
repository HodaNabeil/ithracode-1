import { prisma } from '@/lib/prisma';

export async function getIsUserEnrolledInCourse(
  userId: string,
  courseId: string,
): Promise<boolean> {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId: userId,
        courseId,
      },
    },
  });
  return !!enrollment && enrollment.status === 'ACTIVE';
}
