import { QuestionInterface } from "@/interface/question-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface QuestionState {
  loading: boolean;
  questions: QuestionInterface[] | null;
  questionCurrentPage: number;
  questionTotalPages: number,
  id: string | null
}


const initialState: QuestionState = {
  loading: false,
  questions: null,
  questionCurrentPage: 0,
  questionTotalPages: 0,
  id: null
};


const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        getQuestions: (state, action: PayloadAction<{ questions: QuestionInterface[], questionCurrentPage: number, questionTotalPages: number, id: string }>) => {
            state.questions = action.payload.questions,
            state.loading = false,
            state.questionCurrentPage = action.payload.questionCurrentPage,
            state.questionTotalPages = action.payload.questionTotalPages,
            state.id = action.payload.id
        },
        removeQuestion: (state, action: PayloadAction<string>) => {
            if(state.questions) {
                state.questions = state.questions.filter(question => question._id !== action.payload)
            }
        }
    }
})


export const { getQuestions, removeQuestion } = questionSlice.actions
export default questionSlice.reducer