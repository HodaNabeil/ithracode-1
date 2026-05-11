'use client';
import React from 'react';
import Select from '@/components/shared/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';

type FilterCourseProps = {
  selectedCategory: string;
  paths: { title: string; slug: string }[];
};

export function FilterCourse({
  selectedCategory: category,
  paths,
}: FilterCourseProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all' || value === '') {
      params.delete('category');
    } else {
      params.set('category', value);
    }

    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const options = [
    { value: 'all', label: 'جميع الدورات' },
    ...paths.map((path) => ({
      value: path.slug,
      label: path.title,
    })),
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section>
      <div className="container">
        <div className="mx-auto mb-8 flex max-w-4xl flex-col gap-3 md:flex-row">
          <Input
            type="search"
            placeholder="ابحث عن دورة"
            defaultValue={searchParams.get('search') || ''}
            onChange={handleSearchChange}
          />
          <Select
            value={category}
            onValueChange={handleCategoryChange}
            placeholder="جميع الدورات"
            width="md:w-56"
            options={options}
          />
        </div>
      </div>
    </section>
  );
}
