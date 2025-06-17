import { useFormik } from "formik";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Link, NavigateFunction, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup"
import { Image, User, UserToEdit } from "../interfaces/User";
import { editUser, getStorageUser, getUser, getUserDetails, imageHandler, setStorageUser } from "../services/userService";
import { errorMsg, successMsg } from "../tools/notifications/feedback";
import { useDispatch } from "react-redux";
import { setCurrentUserAction } from "../redux/UsersState";
import { AppDispatch } from "../redux/store";



interface EditUserProps {

}

const EditUser: FunctionComponent<EditUserProps> = () => {

    let { userId } = useParams()
    const dispatch: AppDispatch = useDispatch();
    let [user, setUser] = useState<User>()



    let [demo, setDemo] = useState<any>({
        name: "",
        phone: "",
        email: "",
        image: { src: "" }
    });

    useEffect(() => {
        getUser(userId as string).then((res) => setUser(res.data)).catch((err) => console.log(err)
        )
    }, [userId])

    useEffect(() => {
        if (user != undefined) {
            setDemo(user)
        }
    }, [user])

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    // access the gallery via demo image
    const handleImageClick = () => {
        fileInputRef.current?.click()
    };






    const navigate: NavigateFunction = useNavigate()

    const formik: any = useFormik<UserToEdit>({
        initialValues: user ? {
            name: user?.name as string,
            phone: user?.phone as string,
            email: user?.email as string,
            image: user?.image as Image
        } : demo,
        enableReinitialize: true,
        validationSchema: yup.object({
            name:
                yup.string().required("name is required").min(2, "Name must be at least 2 characters")
            ,
            phone: yup.string().required("Phone number is required").matches(/^05\d{8}$/, "Phone number must be a valid Israeli number"),
            email: yup
                .string()
                .required("Email is required")
                .email("Must be a valid email address").matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "email most be a valid email address"),
            image: yup.object({
                url: yup.string().url("Must be a valid URL"),
                alt: yup.string().optional(),
                publicId: yup.string().optional(),
            }),
        }),

        onSubmit: async (values: any) => {
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

                // edit user
                const editedRes = await editUser(userId as string, {
                    ...values,
                    image,
                });
                if (editedRes.data) {
                    const storedUser = getStorageUser()
                    setStorageUser({ ...storedUser, token: editedRes.data })
                    const userDetailsRes = await getUserDetails(editedRes.data);
                    if (userDetailsRes) {
                        dispatch(setCurrentUserAction(userDetailsRes.data));
                    } else {
                        console.error("User details not found");
                    }
                }

                successMsg("User has been edited successfully :)");
                navigate(-1);

            } catch (error: any) {
                console.error("Error:", error);
                errorMsg(`Error: ${error?.response?.data || error.message}`);
            }
        }



    })


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




    return (<section id="edit-user-container" className="container">
        <span className="flex">
            <h1 className="fire-text">Edit user</h1>
            <i onClick={() => navigate(-1)} className="fa-solid fa-arrow-left"></i>
        </span>
        <form onSubmit={formik.handleSubmit} className="form-container text-dark">

            {/* name */}
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInputName" placeholder="Jhon Doe"
                    value={formik.values.name}
                    onChange={(e) => {
                        formik.handleChange(e);
                        setDemo({ ...demo, name: e.target.value })

                    }}
                    name="name"
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && <i
                    title={formik.errors.name}
                    className="fa-solid text-warning fa-triangle-exclamation errorNote"></i>}

                <label htmlFor="floatingInputName">name *</label>
            </div>
            {/* phone */}
            <div className="form-floating mb-3">
                <input type="phone" className="form-control" id="floatingInputPhone"
                    value={formik.values.phone} placeholder="050-123-4567"
                    onChange={(e) => {
                        setDemo({ ...demo, phone: e.target.value })
                        formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    name="phone"
                />
                {formik.touched.phone && formik.errors.phone && <i
                    title={formik.errors.phone}
                    className="fa-solid text-warning fa-triangle-exclamation errorNote"></i>}

                <label htmlFor="floatingInputPhone">Phone *</label>
            </div>
            {/* email */}
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                    value={formik.values.email}
                    onChange={(e) => {
                        setDemo({ ...demo, email: e.target.value })
                        formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    name="email"
                />
                {formik.touched.email && formik.errors.email && <i
                    title={formik.errors.email}
                    className="fa-solid text-warning fa-triangle-exclamation errorNote"></i>}

                <label htmlFor="floatingInput">Email address *</label>
            </div>


            <div className="flex mt-3">

                <button disabled={!formik.dirty || !formik.isValid} type="submit" className="btn btn-outline-warning">Edit</button>
                {!user?.isCreator && <p className="text-light">Want to become a  <Link to={"/becomeCreator"}>creator?</Link></p>}

            </div>


            {/* live demo */}
            <div className="form-demo-wraper">

                <div className="user-demo-card">
                    <img onClick={handleImageClick} src={demo.image.src || "/images/manCoding.webp"} alt="default image" />

                    <div className="user-demo-content lh-1 p-2">
                        <p className="demo-text">Name: {demo.name}</p>
                        <p className="demo-text">Phone: {demo.phone}</p>
                        <p className="demo-text">Email: {demo.email}</p>
                    </div>
                </div>



                <div className="form-floating mb-3" >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="form-control"
                        id="imageUpload"
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

            </div>

        </form>


    </section>);
}

export default EditUser;