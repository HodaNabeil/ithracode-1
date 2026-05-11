'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const NOT_ENROLLED_QUERY = 'notEnrolled';

export function CourseNotEnrolledToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;
    if (searchParams.get(NOT_ENROLLED_QUERY) !== '1') return;

    shown.current = true;
    toast.warning('غير منضم للدورة');
    router.replace(pathname);
  }, [pathname, router, searchParams]);

  return null;
}
