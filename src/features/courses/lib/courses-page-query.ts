import type {
  CategoryOption,
  GetCoursesParams,
  SortOption,
} from '@/types/course/course.types';

/** Raw searchParams shape from Next.js `page.tsx`. */
export type CoursesPageSearchParamsInput = {
  page?: string;
  search?: string;
  sort?: string;
  category?: string;
};

export type CoursesPageQuery = {
  page: number;
  sort: SortOption;
  search?: string;
  category?: CategoryOption;
};

const SORT_VALUES = [
  'newest',
  'oldest',
  'price_asc',
  'price_desc',
] as const satisfies readonly SortOption[];

function parseSort(raw: string | undefined): SortOption {
  if (raw && (SORT_VALUES as readonly string[]).includes(raw)) {
    return raw as SortOption;
  }
  return 'newest';
}

export function parseCoursesPageSearchParams(
  input: CoursesPageSearchParamsInput,
): CoursesPageQuery {
  const page = Number(input.page) || 1;
  const sort = parseSort(input.sort);
  const search = input.search?.trim() || undefined;
  const category = input.category?.trim() || undefined;

  return {
    page,
    sort,
    search,
    category,
  };
}

export function coursesPageQueryToGetCoursesParams(
  query: CoursesPageQuery,
): GetCoursesParams {
  return {
    search: query.search,
    page: query.page,
    sort: query.sort,
    category: query.category,
  };
}
