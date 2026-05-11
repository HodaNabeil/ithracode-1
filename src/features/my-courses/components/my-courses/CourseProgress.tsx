'use client';

import React from 'react';

interface CourseProgressProps {
  progress: number;
  className?: string;
}

export const CourseProgress = ({
  progress,
  className = '',
}: CourseProgressProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="h-[2px] w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-primary to-primary/80 rounded-full transition-all duration-1000 ease-out shadow-xs shadow-primary/20"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between items-center text-xs font-bold">
        <span className="text-primary">تم إكمال %{progress}</span>
      </div>
    </div>
  );
};
