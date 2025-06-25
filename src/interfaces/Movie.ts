export default interface Movie {
    _id?: string;
    name: string;
    description: string;
    externalId?: number;
    trailer?: string;
    duration: string;
    category: string[];
    mainChars: string[];
    year: string;
    creator: string;
    rate: number;
    favorites?: string[];
    image: {
        src: string;
        alt: string;
        publicId?: string | null;
    };
    comments?: Comment[]
}


export interface Comment {
    animation: boolean;
    token: string,
    userId: string,
    message: string,
    time: Date,
    likes: string[]
}


