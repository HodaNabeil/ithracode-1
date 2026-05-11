import type { CourseListDTO } from '@/types/course/course.dto';

const SITE_ORIGIN = 'https://ithracode.com';

export function buildCoursesItemListJsonLd(courses: CourseListDTO[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        url: `${SITE_ORIGIN}/courses/${course.slug}`,
        name: course.title,
        description: course.description,
        provider: {
          '@type': 'Organization',
          name: 'إثرالكود',
          sameAs: SITE_ORIGIN,
        },
      },
    })),
  };
}
