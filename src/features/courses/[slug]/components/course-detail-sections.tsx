import type { ReactNode } from 'react';
import {
  getCourseObjectives,
  getCourseOutline,
  getCourseRequirementsSlice,
  getCourseTargetAudience,
} from '@/features/courses/services/course.service';
import { ObjectivesCourse } from './Objectives';
import { CourseContent } from './CourseContent';
import { TargetAudience } from './TargetAudience';
import { Requirements } from './Requirements';

async function renderCourseDetailSlice<T>(
  slug: string,
  load: (s: string) => Promise<T | null>,
  render: (data: T) => ReactNode,
): Promise<ReactNode> {
  const data = await load(slug);
  if (data == null) return null;
  return render(data);
}

export async function ObjectivesCourseSection({ slug }: { slug: string }) {
  return renderCourseDetailSlice(slug, getCourseObjectives, (objectives) => (
    <ObjectivesCourse objectives={objectives} />
  ));
}

export async function CourseContentSection({ slug }: { slug: string }) {
  return renderCourseDetailSlice(slug, getCourseOutline, (outline) => (
    <CourseContent sections={outline.sections} courseSlug={outline.slug} />
  ));
}

export async function TargetAudienceSection({ slug }: { slug: string }) {
  return renderCourseDetailSlice(slug, getCourseTargetAudience, (targets) => (
    <TargetAudience targets={targets} />
  ));
}

export async function RequirementsSection({ slug }: { slug: string }) {
  return renderCourseDetailSlice(slug, getCourseRequirementsSlice, (slice) => (
    <Requirements
      requirements={slice.requirements}
      prerequisites={slice.prerequisites}
    />
  ));
}
