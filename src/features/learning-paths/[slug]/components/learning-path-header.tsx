import { PathDetailDTO } from '@/types/path/path.dto';

interface LearningPathHeaderProps {
  data: Pick<PathDetailDTO, 'title' | 'summary'>;
}

export function LearningPathHeader({ data }: LearningPathHeaderProps) {
  return (
    <section>
      <div className="  element-center flex-col    text-center  mb-16 space-y-4 container">
        <span className="text-primary font-medium">مسارات التعلم</span>
        <h1 className="leading-[1.2] lg:text-5xl lg:leading-[1.23] mb-8">
          {data.title}
        </h1>
        <p className="text-lg lg:text-2xl max-w-prose leading-[1.6]">
          {data.summary}
        </p>
      </div>
    </section>
  );
}
