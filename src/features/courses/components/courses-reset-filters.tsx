'use client';

import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';

export function CoursesResetFilters() {
  const router = useRouter();
  const pathname = usePathname();

  const handleReset = () => {
    router.push(pathname);
  };

  return (
    <Button variant="default" onClick={handleReset}>
      إعادة ضبط الفلاتر
    </Button>
  );
}
