import CardCourse from './CourseCard';
import type { CourseListDTO } from '@/types/course/course.dto';
import { CourseCardSkeleton } from './CoursesListSkeleton/CourseCardSkeleton';
import { CoursesPagination } from '@/components/shared/CoursesPagination';

type CoursesListProps = {
  courses: CourseListDTO[];
  totalPages: number;
  currentPage: number;
};

export default function CoursesList({
  courses,
  totalPages,
  currentPage,
}: CoursesListProps) {
  const isLoading = !courses;
  const isEmpty = courses?.length === 0;

  return (
    <section>
      <div className="my-14 md:my-20 container">
        <ul
          className="mx-auto grid max-w-[calc(350px*3)] grid-cols-1 
        gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}

          {!isLoading && isEmpty && (
            <p className="col-span-full text-center text-muted-foreground">
              لا توجد دورات متاحة حاليا
            </p>
          )}

          {!isLoading &&
            !isEmpty &&
            courses!.map((course) => (
              <CardCourse key={course.id} course={course} />
            ))}
        </ul>

        {totalPages > 1 && (
          <CoursesPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </section>
  );
}
