import React from 'react';
import { TrackDetailDTO } from '@/types/path/path.dto';
import { TrackItem } from './track-item';

interface PathTracksProps {
  tracks: TrackDetailDTO[];
}

export function PathTracks({ tracks }: PathTracksProps) {
  return (
    <section className="mt-14">
      <div
        className="overflow-y-auto flex-1 md:pr-2 scrollbar-thin  container
      scrollbar-thumb-secondary scrollbar-track-secondary/10 \
      hover:scrollbar-thumb-secondary/80 transition-colors"
      >
        {tracks.map((track, index) => (
          <TrackItem key={index} track={track} />
        ))}
      </div>
    </section>
  );
}
