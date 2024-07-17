export interface ScienceInterface {
    _id: string,
    user_id: string,
    title: string,
    total?: number,
    teacher: string,
    course: 1 | 2 | 3 | 4,
}