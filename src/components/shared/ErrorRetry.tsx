'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

interface ErrorRetryProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorRetry({
  message = 'حدث خطأ. يرجى المحاولة مرة أخرى لاحقًا.',
  onRetry,
  className = '',
}: ErrorRetryProps) {
  const router = useRouter();
  return (
    <div
      className={`flex flex-col element-center py-4 px-4 text-center gap-1 ${className}`}
    >
      <p className="text-destructive text-sm">{message}</p>
      <Button
        variant="link"
        onClick={onRetry ? onRetry : () => router.refresh()}
        className="text-sm text-primary hover:text-primary/80 hover:no-underline font-medium underline"
      >
        إعادة التحميل
      </Button>
    </div>
  );
}
