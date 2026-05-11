import type { PathCategoryDTO, PathListDTO, PathDetailDTO } from './path.dto';

export type PathSortOption = 'newest' | 'oldest' | 'title';

export const PATH_SORT_OPTIONS = [
  { label: 'الأحدث', value: 'newest' },
  { label: 'الأقدم', value: 'oldest' },
  { label: 'الاسم', value: 'title' },
];

export const PATH_CATEGORY_OPTIONS = [
  { label: 'جميع الفئات', value: 'all' },
  { label: 'تطوير الويب', value: 'WEB' },
  { label: 'تطوير الموبايل', value: 'MOBILE' },
  { label: 'غير ذلك', value: 'OTHER' },
];

export interface GetPublicPathsParams extends Record<string, unknown> {
  search?: string;
  page?: number;
  limit?: number;
  sort?: PathSortOption;
  category?: PathCategoryDTO;
}

export interface GetPublicPathsResult {
  paths: PathListDTO[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface GetPathBySlugResult {
  data: {
    path: PathDetailDTO;
  };
}

export { PathCategoryDTO };
