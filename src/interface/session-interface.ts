import { ScienceInterface } from "./science-interface";

export interface SessionInterface {
  _id?: string;
  auth_id?: string;
  time: number;
  score: number;
  percent: number;
  createAt?: string;
  science_id?: ScienceInterface;
  questions: number
}