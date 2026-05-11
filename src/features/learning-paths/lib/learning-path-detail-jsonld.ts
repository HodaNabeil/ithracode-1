import type { PathDetailDTO } from '@/types/path/path.dto';

const SITE_ORIGIN = 'https://ithracode.com';
const DEFAULT_PATH_IMAGE = `${SITE_ORIGIN}/default-path.png`;

export function buildLearningPathDetailJsonLd(path: PathDetailDTO) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: path.title,
    description: path.summary || path.tagline,
    image: path.thumbnailUrl || DEFAULT_PATH_IMAGE,
    provider: {
      '@type': 'Organization',
      name: 'إثرالكود',
      url: SITE_ORIGIN,
    },
    hasPart:
      path.tracks?.map((track) => ({
        '@type': 'CreativeWork',
        name: track.title,
        description: track.summary,
      })) || [],
  };
}
