import { PathListDTO } from '@/types/path/path.dto';
import { PathsList } from './paths-list';

export function PathsContainer({ paths }: { paths: PathListDTO[] }) {
  return (
    <section>
      <div className="container space-y-8">
        <PathsList paths={paths} />
      </div>
    </section>
  );
}
