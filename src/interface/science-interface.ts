export interface ScienceInterface {
  _id: string;
  user_id: string;
  title: string;
  total?: number;
  teacher: string;
  course: 1 | 2 | 3 | 4;
  semester: 1 | 2;
  createdAt?: string;
  updatedAt?: string
}