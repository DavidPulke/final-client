import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import * as yup from "yup"
import { registerInitialValues } from "../tools/InitialValues";
import { User } from "../interfaces/User";
import { getStorageUser, getUserDetails, register, setStorageUser } from "../services/userService";
import { errorMsg, successMsg } from "../tools/notifications/feedback";
import WhyRegister from "./smallComp/WhyRegister";
import { useDispatch } from "react-redux";
import { setCurrentUserAction } from "../redux/UsersState";
import { AppDispatch } from "../redux/store";
import TransitionPage from "./smallComp/TransitionPage";


interface RegisterProps {

}

const Register: FunctionComponent<RegisterProps> = () => {
    let [showPassword, setShowPassword] = useState<boolean>(false)
    const dispatch: AppDispatch = useDispatch();


    let [demo, setDemo] = useState<any>({
        name: "",
        phone: "",
        email: "",
        image: ""
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const navigate: NavigateFunction = useNavigate()

    const formik: FormikValues = useFormik<User>({
        initialValues: registerInitialValues,
        validationSchema: yup.object({
            name:
                yup.string().required("name is required").min(2, "Name must be at least 2 characters")
            ,
            phone: yup.string().required("Phone number is required").matches(/^05\d{8}$/, "Phone number must be a valid Israeli number"),
            email: yup
                .string()
                .required("Email is required")
                .email("Must be a valid email address").matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "email most be a valid email address"),
            password: yup
                .string()
                .required("Password is required")
                .min(9, "Password must be at least Nine characters")
                .max(20, "Password must be at most Twenty characters")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/,
                    "Password must include an uppercase letter, a lowercase letter, a number, and one of the following characters: !@#$%^&*-"
                ),
            image: yup.object({
                url: yup.string().url("Must be a valid URL"),
                alt: yup.string().optional(),
                publicId: yup.string().optional(),
            }),
        }),

        onSubmit: async (values) => {
            try {
                setIsProcessing(true)
                const registerRes = await register(values);
                const storedUser = getStorageUser();
                setStorageUser({ ...storedUser, token: registerRes.data, theme: { ...storedUser.theme, name: "Default Theme", src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1750112806/grediant-background_gxexio.jpg" } });


                if (registerRes.data) {
                    const userDetailsRes = await getUserDetails(registerRes.data);
                    if (userDetailsRes) {
                        dispatch(setCurrentUserAction(userDetailsRes.data));
                    } else {
                        console.error("User details not found");
                    }
                }

                successMsg("Registered Successfully :)");
                navigate('/');
            } catch (error: any) {
                setIsProcessing(false)
                console.error("Error:", error);
                errorMsg(`Error: ${error?.response?.data || error.message}`);
            }
        }


    })




    return (<section id="register-container" className="container">
        <h1 className="fire-text">Register</h1>
        {isProcessing && <TransitionPage message={`Creating your user ${formik.values.name} :)`} />}
        <form onSubmit={formik.handleSubmit} className="form-container text-dark">

            {/* name */}
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInputName" placeholder="Jhon Doe"
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
                {formik.touched.name && formik.errors.name && <small className="text-danger">{formik.errors.name}</small>}
            </div>
            {/* phone */}
            <div className="form-floating mb-3">
                <input type="phone" className="form-control" id="floatingInputPhone" placeholder="050-123-4567"
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
                {formik.touched.phone && formik.errors.phone && <small className="text-danger">{formik.errors.phone}</small>}
            </div>
            {/* email */}
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
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
                {formik.touched.email && formik.errors.email && <small className="text-danger">{formik.errors.email}</small>}
            </div>
            {/* password */}
            <div className="form-floating">
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />

                {formik.touched.password && formik.errors.password && <i
                    title={formik.errors.password}
                    className="fa-solid text-warning fa-triangle-exclamation errorNote"></i>}

                <i onClick={() => setShowPassword(!showPassword)} className={`fa-${showPassword ? "solid" : "regular"} fa-eye password-btn`} title="Show Password"></i>
                <label htmlFor="floatingPassword">Password *</label>
                {formik.touched.password && formik.errors.password && <small className="text-danger">{formik.errors.password}</small>}
            </div>

            <div className="flex mt-3">
                <button disabled={!formik.dirty || !formik.isValid} type="submit" className="btn btn-outline-primary">Register</button>
                <p className="text-light">Already have an account? <Link to={"/login"}>Login</Link></p>
            </div>


            {/* live demo */}
            <div className="form-demo-wraper">

                <div className="user-demo-card">
                    <img src={demo.image || "/images/manCoding.webp"} alt="default image" />
                    <div className="user-demo-content lh-1 p-2">
                        <p className="demo-text">Name: {demo.name}</p>
                        <p className="demo-text">Phone: {demo.phone}</p>
                        <p className="demo-text">Email: {demo.email}</p>
                    </div>
                </div>

                {/* why register */}
                <WhyRegister />

            </div>

        </form>


    </section>);
}

export default Register;