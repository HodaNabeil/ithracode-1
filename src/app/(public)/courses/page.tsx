import { Suspense } from 'react';
import { Metadata } from 'next';
import { AppHero } from '@/components/shared/AppHero';
import { CoursesListSkeleton } from '@/features/courses/components/CoursesListSkeleton/CoursesListSkeleton';
import { CoursesCatalogSection } from '@/features/courses/components/courses-page/CoursesCatalogSection';
import { CoursesListingJsonLd } from '@/features/courses/components/courses-page/CoursesListingJsonLd';
import { FilterCourseSection } from '@/features/courses/components/courses-page/FilterCourseSection';
import { parseCoursesPageSearchParams } from '@/features/courses/lib/courses-page-query';
import { buildCoursesListingMetadata } from '@/features/courses/lib/courses-listing-metadata';

interface CoursesPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sort?: string;
    category?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: CoursesPageProps): Promise<Metadata> {
  const query = parseCoursesPageSearchParams(await searchParams);
  return buildCoursesListingMetadata(query);
}

export default async function Courses({ searchParams }: CoursesPageProps) {
  const query = parseCoursesPageSearchParams(await searchParams);

  return (
    <>
      <CoursesListingJsonLd query={query} />

      <AppHero
        title="ارفع مستوى مهاراتك في البرمجة"
        description="سواء كنت ترغب في التفوق في تطوير الويب، أو تطوير الأجهزة المحمولة، أو تعزيز مهاراتك الأساسية في هندسة البرمجيات، فهناك دورة تدريبية تناسبك."
      />

      <Suspense fallback={null}>
        <FilterCourseSection selectedCategory={query.category ?? ''} />
      </Suspense>

      <Suspense
        key={`${query.search}-${query.page}-${query.sort}-${query.category}`}
        fallback={<CoursesListSkeleton />}
      >
        <CoursesCatalogSection query={query} />
      </Suspense>
    </>
  );
}
