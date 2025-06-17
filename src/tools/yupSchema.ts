import * as Yup from "yup";

export const movieValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(256, "Name must be at most 256 characters")
        .required("Movie name is required"),

    category: Yup.array()
        .of(Yup.string().required("Each category must be a valid string"))
        .min(1, "At least one category is required").max(3, "Maximum of 3 categories!")
        .required("Category is required"),

    description: Yup.string()
        .min(5, "Description must be at least 5 characters")
        .max(2048, "Description must be at most 2048 characters")
        .required("Description is required"),

    year: Yup.number()
        .min(1880, "Year must be no earlier than 1880")
        .max(new Date().getFullYear(), `Year must be no later than ${new Date().getFullYear()}`)
        .required("Year is required"),

    duration: Yup.string()
        .min(1, "Duration must be at least 1 minute")
        .required("Duration is required"),

    mainChars: Yup.array()
        .of(Yup.string().required("Each character must be a valid string"))
        .min(1, "At least one main character is required")
        .required("Main characters are required"),

    image: Yup.object({
        url: Yup.string().url("Must be a valid URL"),
        alt: Yup.string().optional(),
        publicId: Yup.string().optional(),
    }),
});
