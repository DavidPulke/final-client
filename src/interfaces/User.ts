export interface User {
    _id?: string,
    name: string,
    phone: string,
    email: string,
    password: string,
    image?: Image,
    favorites?: [string];
    pulcoins?: Number,
    isCreator?: boolean,
    isAdmin?: boolean,
    isVerified?: boolean,
    logginAttempts?: string[],
}

export interface UserToEdit {
    name: string,
    phone: string,
    email: string,
    image?: Image
    isCreator?: boolean;
}

export interface Image {
    src?: string,
    alt?: string,
    publicId?: string,
}