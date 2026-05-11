import { PathCardSkeleton } from './PathCardSkeleton';

export function PathsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <PathCardSkeleton key={i} />
      ))}
    </div>
  );
}
