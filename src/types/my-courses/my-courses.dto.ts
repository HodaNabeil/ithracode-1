// types/my-courses/my-courses.dto.ts

export type MyCourseLectureDTO = {
  id: string;
  title: string;
  duration: number;
  isCompleted: boolean;
  attachmentsCount: number;
};

export type MyCourseSectionDTO = {
  id: string;
  title: string;
  position: number;
  lectures: MyCourseLectureDTO[];
};

export type MyCourseLecturesDTO = {
  title: string;
  sections: MyCourseSectionDTO[];
};
