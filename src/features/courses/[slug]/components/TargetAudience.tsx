import { User } from 'lucide-react';
import React from 'react';
import { CourseSectionHeader } from './CourseSectionHeader';

interface TargetAudienceProps {
  targets?: string[];
  title?: string;
  subtitle?: string;
}

export const TargetAudience = ({
  targets = [],
  title = 'لمن هذه الدورة؟',
  subtitle = 'الطالب المستهدف',
}: TargetAudienceProps) => {
  if (!targets || targets.length === 0) return null;

  return (
    <section className="section-gap">
      <div className="container ">
        <CourseSectionHeader
          title={title}
          subtitle={subtitle}
          icon={User}
          iconClassName="text-gray-500"
        />

        {/* Targets List */}
        <ul className="flex flex-col items-center gap-6 w-full">
          {targets.map((target, index) => (
            <li
              key={index}
              className="group flex items-center justify-start gap-4 w-full"
            >
              {/* Icon replaced the dash */}
              <User className="size-5 text-foreground" />

              {/* Text on the Left */}
              <p className="text-base  text-foreground">{target}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
