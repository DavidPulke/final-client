import Movie from "../interfaces/Movie";
import { User, UserToEdit } from "../interfaces/User";

export const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result);
            } else {
                reject("Failed to read file as string");
            }
        };

        reader.onerror = () => {
            reject("Error reading file");
        };

        reader.readAsDataURL(file);
    });
};


export const extractMovieData = (data: Movie) => {
    return {
        name: data.name,
        category: data.category,
        description: data.description,
        duration: JSON.stringify(data.duration),
        year: JSON.stringify(data.year),
        mainChars: data.mainChars,
        image: data.image,
        rate: data.rate
    }
}

export const extractUserData = (data: User): UserToEdit => {
    return {
        name: data.name,
        phone: data.phone,
        email: data.email,
        image: {
            src: data.image?.src
        },
        isCreator: data.isCreator,
    }
}

export const getSliderSettings = (itemsLength: number) => {
    return {
        areaHidden: false,
        inert: true,
        dots: false,
        infinite: itemsLength > 4, // Infinite only if we have more than 4 items
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: itemsLength > 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: itemsLength > 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: itemsLength > 1,
                },
            },
        ],
    };
};