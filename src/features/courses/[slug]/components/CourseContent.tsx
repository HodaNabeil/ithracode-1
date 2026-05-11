'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Video, List } from 'lucide-react';
import { CourseSectionHeader } from './CourseSectionHeader';
import { cn } from '@/lib/utils';

import { formatDuration } from '@/lib/formatters';
import { Link } from '@/components/shared/link';

interface Lecture {
  id: string;
  title: string;
  videoDuration: number | null;
  position: number;
  isFree: boolean;
}

interface Section {
  id: string;
  title: string;
  duration: number | null;
  position: number;
  lectures: Lecture[];
}

interface CourseContentProps {
  sections: Section[];
  courseSlug: string;
}

export function CourseContent({ sections, courseSlug }: CourseContentProps) {
  const totalLectures = sections.reduce(
    (acc, section) => acc + section.lectures.length,
    0,
  );

  const totalDurationMinutes = sections.reduce(
    (acc, section) => acc + (section.duration || 0),
    0,
  );

  return (
    <section className="section-gap" dir="rtl">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <CourseSectionHeader
            title="محتوى الدورة"
            icon={List}
            subtitle="دورة منظمة تماما"
            iconClassName="text-gray-500"
          />

          <div
            className={cn(
              'text-secondary-foreground',
              ' flex items-center gap-2  text-base',
            )}
          >
            <span>{formatDuration(totalDurationMinutes, 'ar', true)}</span>

            <span className="text-slate-600">.</span>
            <span>{sections.length} قسم</span>
            <span className="text-slate-600">.</span>
            <span>{totalLectures} محاضرة</span>
          </div>
        </div>

        {/* Accordion */}
        <div className="max-w-4xl ml-auto">
          <Accordion type="single" collapsible className="w-full">
            {sections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="border-b border-white/10 bg-transparent last:border-0"
              >
                <AccordionTrigger
                  className={cn(
                    'bg-transparent border-none px-0 py-6',
                    'hover:no-underline group transition-all duration-300',
                  )}
                >
                  <span className="text-lg font-semibold mb-0 inline grow">
                    <span>
                      ({formatDuration(section.duration ?? 0, 'en', false)})
                    </span>
                    {section.title}
                  </span>
                </AccordionTrigger>

                <AccordionContent className="overflow-hidden">
                  <ul className="space-y-4 pt-4 pb-4">
                    {section.lectures.map((lecture) => (
                      <li
                        key={lecture.id}
                        className={cn(
                          'flex items-center justify-between',
                          'group last:border-0',
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Video className="w-5 h-5 text-secondary-foreground" />
                          <span className=" text-base text-secondary-foreground ">
                            {lecture.title}
                          </span>
                        </div>

                        <Link
                          href={`/my-courses/${courseSlug}/learn/lecture/${lecture.id}`}
                          className={cn(
                            'bg-[#0095ff] hover:bg-[#007acc]',
                            'text-primary rounded-full',
                            'px-4 py-1 flex items-center justify-center',
                            'text-sm font-medium',
                            'transition-all duration-300 no-underline!',
                          )}
                        >
                          مشاهدة
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
