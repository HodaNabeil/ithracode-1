import { unstable_cache as nextCache } from 'next/cache';
import { cache as reactCache } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => Promise<any>;

/**
 * A wrapper around Next.js unstable_cache and React cache.
 * Supports static key parts or a factory function that generates key parts from arguments.
 */
export function cache<T extends Callback>(
  cb: T,
  keyPartsOrFactory: string[] | ((...args: Parameters<T>) => string[]),
  options: { revalidate?: number | false; tags?: string[] },
) {
  const memoizedCb = reactCache(cb);

  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const keyParts =
      typeof keyPartsOrFactory === 'function'
        ? keyPartsOrFactory(...args)
        : keyPartsOrFactory;

    return nextCache(memoizedCb, keyParts, options)(...args);
  };
}
