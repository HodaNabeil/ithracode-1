import React from 'react';
import { formatDuration } from '@/lib/formatters';
import {
  BarChart2,
  PlayCircle,
  Layout,
  Code,
  Infinity,
  Clock,
} from 'lucide-react';
import { auth } from '@/lib/auth';
import AddToCartButton from './AddToCartButton';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { APP_ROUTES } from '@/constant/enums';
import { getCourseHeroSlice } from '@/features/courses/services/course.service';
import { getIsUserEnrolledInCourse } from '@/features/courses/services/enrollment.service';

interface CourseHeroProps {
  slug: string;
}

export const CourseHero = async ({ slug }: CourseHeroProps) => {
  const hero = await getCourseHeroSlice(slug);
  if (!hero) return null;

  const {
    title,
    description,
    level = 'مبتدئ',
    duration,
    lecturesCount,
    id: courseId,
    slug: courseSlug,
    firstLectureId,
  } = hero;

  const durationLabel = duration ? formatDuration(duration, 'ar', true) : '';
  const overviewItems = [
    { icon: BarChart2, label: `مستوى ${level}:` },
    ...(durationLabel
      ? [
          {
            icon: PlayCircle,
            label: `${durationLabel} (HD video)`,
          },
        ]
      : []),
    { icon: Layout, label: `${lecturesCount} محاضرة` },
    { icon: Code, label: 'التطبيقات العملية' },
    { icon: Infinity, label: 'الوصول للدورة مدى الحياة' },
    { icon: Clock, label: 'تعلم بالسرعة التي تناسبك' },
  ] as const;
  const session = await auth();
  let isInCart = false;
  let isEnrolled = false;

  if (session?.user?.id) {
    const userId = session.user.id;
    const [enrolled, cartItem] = await Promise.all([
      getIsUserEnrolledInCourse(userId, courseId),
      prisma.cartItem.findFirst({
        where: {
          courseId,
          cart: { userId },
        },
      }),
    ]);
    isEnrolled = enrolled;
    isInCart = !!cartItem;
  } else {
    const cookieStore = await cookies();
    const guestCart = cookieStore.get('guest_cart')?.value;

    if (guestCart) {
      const cartItems: string[] = JSON.parse(guestCart);
      isInCart = cartItems.includes(courseId);
    }
  }

  const learnLink = firstLectureId
    ? `${APP_ROUTES.MY_COURSES}/${courseSlug}/${APP_ROUTES.LEARN}/${APP_ROUTES.LECTURE}/${firstLectureId}`
    : `${APP_ROUTES.MY_COURSES}/${courseSlug}`;

  return (
    <section className=" section-gap">
      <div
        className="container items-center md:items-start 
      flex flex-col lg:flex-row justify-between xl:justify-around gap-2 
      relative"
      >
        <div className="text-center md:text-right max-w-xl! pt-5 lg:pt-24">
          <div>
            <h1
              className="text-3xl md:text-4xl xl:text-5xl font-bold 
                 text-primary tracking-tight  leading-tight "
            >
              {title}
            </h1>

            <p className="text-xl md:text-2xl leading-7 md:leading-9 my-5 text-muted-foreground">
              {description}
            </p>
          </div>

          {isEnrolled ? (
            <Button
              asChild
              className="px-6 h-11 w-full md:w-fit rounded-xl text-base flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
            >
              <Link href={learnLink}>
                <span>ابدأ التعلم الآن</span>
                <PlayCircle className="w-5 h-5" />
              </Link>
            </Button>
          ) : (
            <AddToCartButton
              courseId={courseId}
              userId={session?.user?.id}
              initialIsInCart={isInCart}
            />
          )}
        </div>

        {/* Info Card Section */}
        <div className="mt-7 w-full lg:w-[300px] rounded-md border border-border bg-card text-card-foreground">
          <div className="p-6 md:p-10 lg:p-12 whitespace-nowrap">
            <h2 className="font-semibold text-xl text-primary tracking-wide">
              نظرة عامة على الدورة
            </h2>
            <div className="h-[5px] bg-linear-to-r from-primary to-primary w-16 mt-4 mb-10"></div>

            <ul className="space-y-4 font-normal text-foreground">
              {overviewItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-base">
                  <item.icon className="size-5 text-primary shrink-0" />
                  <span className="text-base font-medium">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
