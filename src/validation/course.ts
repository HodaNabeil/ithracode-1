// lib/validations/course.ts
import * as z from 'zod';

export const createCourseSchema = z.object({
  slug: z.string().min(1, { message: 'عنوان الكورس مطلوب' }),
  pathId: z.string().min(1, { message: 'المسار مطلوب' }),
});
