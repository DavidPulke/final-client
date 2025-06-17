import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { imageHandler } from "../services/userService";
import { errorMsg, successMsg } from "../tools/notifications/feedback";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Movie from "../interfaces/Movie";
import { addMovie } from "../services/movieService";
import { movieValidationSchema } from "../tools/yupSchema";
import PreviewModal from "./Modals/PreviewModal";
import useUser from "../hooks/useUser";


interface AddMovieProps {

}

const AddMovie: FunctionComponent<AddMovieProps> = () => {
    const userData = useSelector((state: RootState) => state.usersState.currentUser);
    const { user } = useUser()
    let [demo, setDemo] = useState<Movie>({
        name: "",
        category: [],
        description: "",
        year: JSON.stringify(new Date().getFullYear()),
        duration: "90",
        favorites: [],
        mainChars: [""],
        image: {
            src: "",
            alt: "",
            publicId: "",
        },
        rate: 5,
        creator: user?._id as string || userData?._id as string
    });

    // image ref & click
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    // access the gallery via demo image
    const handleImageClick = () => {
        fileInputRef.current?.click()
    };
    const navigate: NavigateFunction = useNavigate()


    // preview modal
    const [flag, setFlag] = useState<boolean>(false);
    const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);
    const refresh = () => {
        setFlag(!flag);

    };


    const formik: FormikValues = useFormik<Movie>({
        initialValues: demo,
        validationSchema: movieValidationSchema,
        onSubmit: async (values) => {
            try {
                // change image handle
                const input = document.querySelector('input[type="file"]') as HTMLInputElement;
                const file = input?.files?.[0];
                let image = {
                    src: values.image?.src,
                    alt: values.image?.alt,
                    publicId: values.image?.publicId,
                };
                if (file) {
                    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
                    if (!(file instanceof File) || !allowedTypes.includes(file.type)) {
                        return errorMsg("Only JPEG, PNG and JPG images are allowed.");
                    }

                    const formData = new FormData();
                    formData.append("image", file);
                    if (values.image?.publicId) {
                        formData.append("oldPublicId", values.image.publicId);
                    }

                    const res = await imageHandler(formData);
                    image = res.data.image;
                }

                await addMovie({ ...values, image, creator: user?._id as string || userData?._id as string || "", duration: JSON.stringify(values.duration) });
                successMsg("Movie added Successfully :)");
                navigate('/movies');
            } catch (error: any) {
                console.error("Error:", error);
                errorMsg(`Error: ${error?.response?.data || error.message}`);
            }
        }
    });


    // make the image usable url
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const previewUrl = URL.createObjectURL(file);

            // set demo preview
            setDemo((prev: any) => ({
                ...prev,
                image: { ...prev.image, src: previewUrl }
            }));

            // formik update
            formik.setFieldValue("image.src", previewUrl);
        }
    };




    return (
        <section id="register-container" className="container">
            <span className="flex">
                <h1 className="fire-text">Add Movie</h1>
                <i onClick={() => navigate(-1)} className="fa-solid fa-arrow-left"></i>
            </span>
            <form onSubmit={formik.handleSubmit} className="form-container text-dark">

                {/* Name */}
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInputName"
                        placeholder="Movie name"
                        name="name"
                        onChange={(e) => {
                            formik.handleChange(e);
                            setDemo({ ...demo, name: e.target.value });
                        }}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <i title={formik.errors.name} className="fa-solid text-warning fa-triangle-exclamation errorNote"></i>
                    )}
                    <label htmlFor="floatingInputName">Name *</label>
                </div>

                {/* Description */}
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInputDescription"
                        placeholder="Movie description"
                        name="description"
                        value={formik.values.description}
                        onChange={(e) => {
                            formik.handleChange(e);
                            setDemo({ ...demo, description: e.target.value });
                        }}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <i title={formik.errors.description} className="fa-solid text-warning fa-triangle-exclamation errorNote"></i>
                    )}
                    <label htmlFor="floatingInputDescription">Description *</label>
                </div>

                {/* Year */}
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInputYear"
                        placeholder="2023"
                        name="year"
                        value={formik.values.year}
                        onChange={(e) => {
                            formik.handleChange(e);
                            setDemo({ ...demo, year: e.target.value });
                        }}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.year && formik.errors.year && (
                        <i title={formik.errors.year} className="fa-solid text-warning fa-triangle-exclamation errorNote"></i>
                    )}
                    <label htmlFor="floatingInputYear">Year *</label>
                </div>

                {/* Duration */}
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="floatingInputDuration"
                        placeholder="120"
                        name="duration"
                        value={formik.values.duration}
                        onChange={(e) => {
                            formik.handleChange(e);
                            setDemo({ ...demo, duration: e.target.value });
                        }}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.duration && formik.errors.duration && (
                        <i title={formik.errors.duration} className="fa-solid text-warning fa-triangle-exclamation errorNote"></i>
                    )}
                    <label htmlFor="floatingInputDuration">Duration (min) *</label>
                </div>

                {/* Image File */}
                <div className="form-floating mb-3" >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="form-control"
                        id="imageUploadFile"
                        accept="image/*"
                        onChange={(e) => {
                            handleImageChange(e)
                            formik.handleChange(e);
                        }}
                        onBlur={formik.handleBlur}
                        name="image.src"
                    />
                    {
                        formik.touched.image && formik.errors.image && <i
                            title={formik.errors.image}
                            className="fa-solid text-warning fa-triangle-exclamation errorNote" > </i>}

                    <label htmlFor="imageUpload" > Upload Image </label>
                </div>


                <div className="flex gap-4 align-items-start">
                    {/* Main Actors */}
                    <div className="mb-3 w-50">
                        <label className="form-label text-light">Main Actors *</label>

                        {formik.values.mainChars.map((actor: string, index: number) => (
                            <div key={index} className="d-flex gap-2 mb-2">
                                <input
                                    type="text"
                                    name={`mainChars[${index}]`}
                                    className="form-control"
                                    placeholder={`Actor ${index + 1}`}
                                    value={actor}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        if (formik.values.mainChars.length > 1) {
                                            const updatedActors = [...formik.values.mainChars];
                                            updatedActors.splice(index, 1);
                                            formik.setFieldValue("mainChars", updatedActors);
                                        }
                                    }}
                                    disabled={formik.values.mainChars.length <= 1}
                                    title={formik.values.mainChars.length <= 1 ? "Must have at least 1 actor" : "Remove actor"}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => formik.setFieldValue("mainChars", [...formik.values.mainChars, ""])}
                            disabled={formik.values.mainChars.length >= 4}
                        >
                            Add Actor
                        </button>

                        {formik.values.mainChars.length >= 4 && (
                            <div className="text-warning mt-1 small">Maximum 3 actors allowed.</div>
                        )}
                    </div>


                    {/* Categories */}
                    <div className="mb-3 text-light">
                        <label className="form-label">Categories *</label>
                        <div className="d-flex flex-wrap gap-3">
                            {["Action", "Drama", "Comedy", "Sci-Fi", "Fantasy", "Romance", "Horror", "Adventure"].map((category) => {
                                const isChecked = formik.values.category?.includes(category);
                                const reachedMax = formik.values.category?.length >= 3;

                                return (
                                    <div key={category} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={category}
                                            name="category"
                                            value={category}
                                            checked={isChecked}
                                            disabled={!isChecked && reachedMax} // disable if already 3 selected
                                            onChange={(e) => {
                                                let updated = [...formik.values.category];
                                                if (e.target.checked) {
                                                    updated.push(category);
                                                } else {
                                                    updated = updated.filter((c) => c !== category);
                                                }
                                                formik.setFieldValue("category", updated);
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor={category}>
                                            {category}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        {formik.touched.category && typeof formik.errors.category === "string" && (
                            <div className="text-warning mt-1 small">{formik.errors.category}</div>
                        )}
                    </div>


                </div>


                {/* buttons */}
                <div className="flex mt-3">
                    <button type="submit" className="btn btn-outline-primary" disabled={!formik.isValid || !formik.dirty}>
                        Add Movie
                    </button>
                    <button type="button" onClick={() => setOpenPreviewModal(!openPreviewModal)} className="btn btn-outline-warning" disabled={!formik.isValid || !formik.dirty}>
                        Preview <i className="fa-regular fa-eye"></i>
                    </button>
                </div>

                {/* Live Demo */}
                <div className="form-demo-wraper mt-4">
                    <div className="user-demo-card">
                        <img onClick={handleImageClick} src={demo.image.src || "/images/manCoding.webp"} alt="default" />
                        <div className="user-demo-content lh-1 p-2">
                            <p className="demo-text">Name: {demo.name}</p>
                            <p className="demo-text">Year: {demo.year}</p>
                            <p className="demo-text">Description: {demo.description}</p>
                            <p className="demo-text">Duration: {demo.duration} minutes</p>
                        </div>
                    </div>
                </div>
            </form>


            <PreviewModal
                onHide={() => setOpenPreviewModal(false)}
                refresh={refresh}
                show={openPreviewModal}
                data={{ ...formik.values, image: { src: demo.image.src } }}
            />
        </section>
    );
}

export default AddMovie;