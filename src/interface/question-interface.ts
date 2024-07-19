export interface QuestionInterface {
    _id: string,
    science_id: string,
    correct_answer: string,
    question: string,
    options: string[],
    auth_id: string
}