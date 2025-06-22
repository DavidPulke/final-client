import { User } from "./User";

export interface Message {
    userId: string,
    message: string,
    time: Date,
    likes: string[]
}


export interface Chat {
    _id?: string;
    text: string;
    from: User;
    to: string;
    createdAt: Date;
}