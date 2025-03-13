export type ExamBundleProps = {
  __typename?: "ExaminationBundle";
  examinationbundle_id: string;
  examinationbundle_name: string;
  examinationbundle_amount: number;
  examinationbundle_start_date: Date | string;
  examinationbundle_end_date: Date | string;
  examinationbundle_max_subjects: number;
  examination_name: string;
  subject_count: number;
  examinationbundle_examination: string;
  enrolled: number;
  examinationbundle_createdon?: string;
  examinationbundle_updatedon?: string;
  examinationbundle_updatedby?: string;
  examinationbundle_isdeleted?: boolean;
  examinationbundle_isblocked?: boolean;
};

export type ExamCourseProps = {
  __typename?: "Course";
  course_id: string;
  course_createdOn: string;
  course_user_id: string;
  course_subject_id: string;
  course_chosen_bundle: string;
  course_progress: number;
  course_status: string;
  course_current_chapter?: string;
  course_current_progress_percentage: number;
  subject_id: string;
  subject_name: string;
  examBundle_id: string;
  examBundle_name: string;
  examBundle_start_date: Date | string;
  examBundle_end_date: string;
  chapter_id?: string;
  chapter_name?: string;
};

export interface VideoPlayerProps {
  src: string;
  moduleProgress?: number;
  autoPlay?: boolean;
  className?: string;
  poster?: string;
  theatreMode?: boolean;
  setTheatreMode?: React.Dispatch<React.SetStateAction<boolean>>;
  onReady?: () => void;
  onError?: (error: unknown) => void;
}
