import { notFound } from 'next/navigation';
import { CourseHero } from '@/features/courses/components/CourseHero';
import {
  CourseContentSection,
  ObjectivesCourseSection,
  RequirementsSection,
  TargetAudienceSection,
} from '@/features/courses/[slug]/components/course-detail-sections';
import { Testimonials } from '@/features/courses/[slug]/components/testimonials/Testimonials';
import {
  getCourseJsonLdFields,
  getCourseSeoFields,
} from '@/features/courses/services/course.service';
import { Metadata } from 'next';
import { ErrorRetry } from '@/components/shared/ErrorRetry';
import Script from 'next/script';

type CourseSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CourseSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseSeoFields(slug);

  if (!course) return { title: 'الكورس غير موجود' };

  return {
    title: `${course.title} | منصة إثرالكود`,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: course.thumbnailUrl
        ? [{ url: course.thumbnailUrl, width: 1200, height: 630 }]
        : [{ url: '/default-course.png' }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://ithracode.com/courses/${slug}`,
    },
    metadataBase: new URL('https://ithracode.com'),

    twitter: {
      card: 'summary_large_image',
      site: '@ithracode',
      title: course.title,
      description: course.description,
      images: [course.thumbnailUrl || '/default-course.png'],
    },
  };
}

export default async function CourseSlug({ params }: CourseSlugPageProps) {
  const { slug } = await params;

  let jsonLdData;
  try {
    jsonLdData = await getCourseJsonLdFields(slug);
    if (!jsonLdData) {
      notFound();
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('NOT_FOUND')) {
      notFound();
    }
    console.error('Course Slug Page Error:', error);
    return <ErrorRetry />;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: jsonLdData.title,
    description: jsonLdData.description,
    provider: {
      '@type': 'Organization',
      name: 'إثرالكود',
      sameAs: 'https://ithracode.com',
    },
    offers: {
      '@type': 'Offer',
      price: jsonLdData.price,
      priceCurrency: jsonLdData.currency || 'EGP',
      category: 'Paid',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: jsonLdData.rating || 0,
      reviewCount: jsonLdData.reviewCount,
    },
  };

  return (
    <>
      <Script
        id="course-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <CourseHero slug={slug} />
        <ObjectivesCourseSection slug={slug} />
        <CourseContentSection slug={slug} />
        <TargetAudienceSection slug={slug} />
        <RequirementsSection slug={slug} />
        <Testimonials />
      </main>
    </>
  );
}
