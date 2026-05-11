import { prisma } from '@/lib/prisma';
import { Course, Prisma } from '@prisma/client';

// ✅ GET single course
export async function GET(
  _req: Request, // 👈 Must keep this, even if unused
  // (prefixed with _ by convention)
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await params;

  const course: Course | null = await prisma.course.findUnique({
    where: { slug },
  });

  if (!course) {
    return new Response('Course not found', { status: 404 });
  }

  return Response.json(course);
}

// ✅ UPDATE course
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  try {
    const body: Prisma.CourseUpdateInput = await req.json();
    const { slug } = await params;

    const course: Course = await prisma.course.update({
      where: { slug },
      data: body,
    });

    return Response.json(course);
  } catch (_error) {
    return new Response('Update failed or course not found', { status: 500 });
  }
}

// ✅ DELETE course
export async function DELETE(
  _req: Request, // 👈 Must keep this as the first argument
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  try {
    const { slug } = await params;
    await prisma.course.delete({
      where: { slug },
    });

    return new Response('Deleted successfully', { status: 200 });
  } catch (_error) {
    return new Response('Error deleting course', { status: 500 });
  }
}
