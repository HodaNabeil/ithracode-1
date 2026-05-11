import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// ✅ GET all courses
// The return type is inferred as Course[], but you can be explicit
// app/api/courses/route.ts

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // ✅ Pagination
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);

  // ✅ Search
  const search = searchParams.get('search') || '';

  // ✅ Price Filter
  const minPrice = Number(searchParams.get('minPrice') || 0);
  const maxPrice = Number(searchParams.get('maxPrice') || 100000);

  // ✅ Build where dynamically
  const where: Prisma.CourseWhereInput = {};

  if (search) {
    where.title = {
      contains: search,
      mode: 'insensitive',
    };
  }

  if (minPrice || maxPrice) {
    where.price = {
      gte: minPrice,
      lte: maxPrice,
    };
  }

  // ✅ Query + Count
  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.course.count({ where }),
  ]);

  return Response.json({
    data: courses,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}

// ✅ CREATE course
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Use Prisma.CourseCreateInput for the incoming data
    // This type knows which fields are required vs optional based on your schema
    const { title, description, price, slug, thumbnailUrl, pathId } = body;

    if (!title || !description || !pathId) {
      return new Response(
        'Missing fields: title, description, and pathId are required',
        { status: 400 },
      );
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        thumbnailUrl,
        price: Number(price),
        slug,
        instructorId: '1', // This should be dynamic in a real app
        pathId,
      },
    });

    return Response.json(course);
  } catch (error) {
    console.error(error);
    return new Response('Error creating course', { status: 500 });
  }
}
