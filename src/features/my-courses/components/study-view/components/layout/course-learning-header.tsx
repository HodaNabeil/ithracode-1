'use client';

import React from 'react';
import { Logo } from '@/components/shared/header/Logo';
import { ProgressDropdown } from '../lecture-details/ProgressDropdown';

interface CourseLearningHeaderProps {
  courseTitle: string;
  completedCount: number;
  totalCount: number;
}

export function CourseLearningHeader({
  courseTitle,
  completedCount,
  totalCount,
}: CourseLearningHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/8 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Right Section: Logo and Course Title */}
        <div className="flex items-center gap-4">
          <Logo className=" h-13 w-auto" />
          <h1 className="text-sm text-primary font-bold truncate max-w-[400px]">
            {courseTitle}
          </h1>
        </div>

        {/* Left Section: Progress, Review, Share */}
        <div className="flex items-center gap-1 md:gap-4">
          {/* Progress Dropdown */}
          <ProgressDropdown
            completedCount={completedCount}
            totalCount={totalCount}
          />
        </div>
      </div>
    </header>
  );
}
