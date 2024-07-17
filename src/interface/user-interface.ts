export interface AuthInterface {
    _id: string,
    phone: string,
    password: string,
    role: 'user' | 'teacher' | 'admin',
}

export interface UserInterface {
    _id: string,
    name?: string,
    age?: number,
    group?: string,
    photo?: string,
    chatId: number,
    action: string,
    auth: AuthInterface,
    status: boolean
}