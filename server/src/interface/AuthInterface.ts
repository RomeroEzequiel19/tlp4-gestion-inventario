export interface IRegister {
    username: string;
    password: string;
    email: string;
    done: boolean;
    rol: number;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ICreateJWTResponse {
    token: string;
}

export interface Payload {
    user: string
}