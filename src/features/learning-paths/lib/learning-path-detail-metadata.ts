import type { Metadata } from 'next';
import type { PathDetailDTO } from '@/types/path/path.dto';
import { loadPathDetailBySlug } from './learning-path-detail-data';

const SITE_ORIGIN = 'https://ithracode.com';
const DEFAULT_OG_IMAGE = '/default-path.png';

export function buildPathNotFoundMetadata(): Metadata {
  return {
    title: 'المسار غير موجود | إثرالكود',
    robots: { index: false },
  };
}

export function buildPathMetadataErrorMetadata(): Metadata {
  return {
    title: 'خطأ في التحميل | إثرالكود',
    robots: { index: false },
  };
}

export function buildLearningPathDetailMetadata(
  slug: string,
  path: PathDetailDTO,
): Metadata {
  const title = path.metaTitle || `${path.title} | منصة إثرالكود`;
  const description =
    path.metaDescription || path.summary || path.tagline || '';
  const imageUrl = path.thumbnailUrl || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    metadataBase: new URL(SITE_ORIGIN),
    alternates: {
      canonical: `/learning-paths/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/learning-paths/${slug}`,
      siteName: 'إثرالكود',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: path.title,
        },
      ],
      locale: 'ar_EG',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export async function resolveLearningPathDetailMetadata(
  slug: string,
): Promise<Metadata> {
  const result = await loadPathDetailBySlug(slug);

  if (result.status === 'ok') {
    return buildLearningPathDetailMetadata(slug, result.path);
  }
  if (result.status === 'not_found') {
    return buildPathNotFoundMetadata();
  }
  return buildPathMetadataErrorMetadata();
}
