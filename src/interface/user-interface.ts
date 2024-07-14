export interface UserInterface {
    _id: string,
    name?: string,
    age?: number,
    phone?: string,
    group?: string,
    photo?: string,
    password?: string,
    role: 'user' | 'teacher' | 'admin',
    chatId: number,
    action: string
}