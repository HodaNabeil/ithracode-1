import CoursesList from '@/features/courses/components/courses-list';
import { getCourses } from '@/features/courses/services/course.service';
import {
  coursesPageQueryToGetCoursesParams,
  type CoursesPageQuery,
} from '@/features/courses/lib/courses-page-query';
import { ErrorRetry } from '@/components/shared/ErrorRetry';

type CoursesCatalogSectionProps = {
  query: CoursesPageQuery;
};

export async function CoursesCatalogSection({
  query,
}: CoursesCatalogSectionProps) {
  try {
    const coursesData = await getCourses(
      coursesPageQueryToGetCoursesParams(query),
    );

    return (
      <CoursesList
        courses={coursesData.courses}
        totalPages={coursesData.totalPages}
        currentPage={query.page}
      />
    );
  } catch (error) {
    console.error('Error fetching courses catalog:', error);
    return <ErrorRetry />;
  }
}
