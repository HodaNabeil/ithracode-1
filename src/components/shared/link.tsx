'use client';

import { extractErrorMessage } from '@/lib/error-extractor';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { ComponentProps, forwardRef, useCallback, useRef } from 'react';

interface LinkProps extends Omit<ComponentProps<typeof NextLink>, 'prefetch'> {
  /**
   * Whether to enable hover prefetching
   * @default true
   */
  prefetchOnHover?: boolean;
  /**
   * Custom delay before prefetching starts (in milliseconds)
   * @default 100
   */
  prefetchDelay?: number;
}

/**
 * Custom Link component that prefetches on hover instead of viewport entry
 *
 * This component wraps Next.js Link and disables automatic viewport prefetching,
 * instead implementing hover-based prefetching for better performance control.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      prefetchOnHover = true,
      prefetchDelay = 100,
      onMouseEnter,
      onMouseLeave,
      href,
      ...props
    },
    ref,
  ) => {
    const router = useRouter();
    const prefetchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        // Call the original onMouseEnter if provided
        onMouseEnter?.(event);

        if (prefetchOnHover && href) {
          // Clear any existing timeout
          if (prefetchTimeout.current) {
            clearTimeout(prefetchTimeout.current);
          }

          // Set a new timeout for prefetching
          prefetchTimeout.current = setTimeout(() => {
            try {
              router.prefetch(href.toString());
            } catch (error) {
              console.warn(
                'Failed to prefetch route:',
                href,
                extractErrorMessage(error, 'Failed to prefetch'),
              );
            }
          }, prefetchDelay);
        }
      },
      [onMouseEnter, prefetchOnHover, href, prefetchDelay, router],
    );

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        // Call the original onMouseLeave if provided
        onMouseLeave?.(event);

        // Clear the prefetch timeout if user leaves before delay
        if (prefetchTimeout.current) {
          clearTimeout(prefetchTimeout.current);
        }
      },
      [onMouseLeave],
    );

    return (
      <NextLink
        ref={ref}
        href={href}
        prefetch={false} // Disable automatic viewport prefetching
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    );
  },
);

Link.displayName = 'Link';
