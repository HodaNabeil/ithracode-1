import { TrackDetailDTO } from '@/types/path/path.dto';
import { CourseItem } from './course-item';

interface TrackItemProps {
  track: TrackDetailDTO;
}

export function TrackItem({ track }: TrackItemProps) {
  return (
    <div className="relative  mr-3 pr-8 pb-8 last:pb-0 text-right">
      <div className="mb-4">
        <h3 className="text-3xl font-extrabold text-foreground mb-4">
          {track.title}
        </h3>
        <p className="text-[16px] leading-[28px] font-medium text-muted-foreground mb-4">
          {track.summary}
        </p>
      </div>

      <ul className="flex flex-col">
        {track.courses.map((course, index) => (
          <CourseItem
            key={index}
            course={course}
            isLast={track.courses.length - 1 === index}
          />
        ))}
      </ul>
    </div>
  );
}
