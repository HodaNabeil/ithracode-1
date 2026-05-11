import React from 'react';
import { PathSectionDTO } from '@/types/path/path.dto';

export default function PathSections({
  sections,
}: {
  sections: PathSectionDTO[];
}) {
  return (
    <section className="mt-14">
      <div className="container">
        {sections?.map((section) => (
          <div key={section.id} className="">
            {section.type === 'TITLE' && (
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                {section.content}
              </h3>
            )}
            {section.type === 'PARAGRAPH' && (
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
