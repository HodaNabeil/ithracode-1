import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function useRole(requiredRole: 'ADMIN' | 'TEACHER' | 'STUDENT') {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push('/login');
    return null;
  }

  if (session.user.role !== requiredRole) {
    router.push('/unauthorized');
    return null;
  }

  return session;
}
