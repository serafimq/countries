export interface LoginSchema {
    email: string;
    password: string;
    isLoading: boolean;
    error?: string;
}

export interface LoginByEmailProps {
    email: string;
    password: string;
}

export type InputPropName = keyof LoginByEmailProps;