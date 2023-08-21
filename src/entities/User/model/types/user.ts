export interface User {
    id: string;
    username: string;
    email: string;
}

export interface UsersSchema {
    users: User[];
    isLoading: boolean,
    error?: string,
    authData?: User,
}