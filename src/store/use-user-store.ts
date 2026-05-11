import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
  image?: string | null;
}

interface UserState {
  user: User | null;
  enrolledCourses: string[];
  setUser: (user: User | null) => void;
  setEnrolledCourses: (courseIds: string[]) => void;
  logout: () => void;
  isEnrolled: (courseId: string) => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      enrolledCourses: [],
      setUser: (user) => set({ user }),
      setEnrolledCourses: (courseIds) => set({ enrolledCourses: courseIds }),
      logout: () => set({ user: null, enrolledCourses: [] }),
      isEnrolled: (courseId) => get().enrolledCourses.includes(courseId),
    }),
    { name: 'user-storage' }, // بيحفظ البيانات في الـ LocalStorage عشان لو عمل Refresh
  ),
);
