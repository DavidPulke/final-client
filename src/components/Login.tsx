import { FunctionComponent, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup"
import { successMsg, errorMsg } from "../tools/notifications/feedback";
import { loginInitialValues } from "../tools/InitialValues";
import { getStorageUser, getUserDetails, login, setStorageUser } from "../services/userService";
import { setCurrentUserAction } from "../redux/UsersState";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import TransitionPage from "./smallComp/TransitionPage";


interface LoginProps {

}

const Login: FunctionComponent<LoginProps> = () => {
    let [showPassword, setShowPassword] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate()
    const formik: FormikValues = useFormik<{ email: string, password: string }>({
        initialValues: loginInitialValues,
        validationSchema: yup.object({
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
        }),

        onSubmit: async (values) => {
            try {
                setIsProcessing(true)
                const loginRes = await login(values);
                const storedUser = getStorageUser();
                setStorageUser({ ...storedUser, token: loginRes.data, theme: { ...storedUser.theme, name: "Default Theme", src: "https://res.cloudinary.com/diyzgivpq/image/upload/v1750112806/grediant-background_gxexio.jpg" } });
                if (loginRes.data) {
                    const userDetailsRes = await getUserDetails(loginRes.data);
                    if (userDetailsRes) {
                        dispatch(setCurrentUserAction(userDetailsRes.data));
                    } else {
                        setIsProcessing(false)
                        console.error("User details not found");
                    }
                }
                successMsg("Logged in Successfully :)");
                navigate('/');
            } catch (error: any) {
                setIsProcessing(false)
                console.error("Error:", error);
                errorMsg(`Error: ${error?.response?.data || error.message}`);
            }
        }


    })


    return (<section className="container">
        <h1 className="fire-text">Login</h1>
        {isProcessing && <TransitionPage message={`Logging you in :)`} />}
        <form onSubmit={formik.handleSubmit} className="form-container text-dark">

            {/* email */}
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInputEmail" placeholder="JhonDoe@gmail.com"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && <i
                    title={formik.errors.email}
                    className="fa-solid text-warning fa-triangle-exclamation errorNote"></i>}

                <label htmlFor="floatingInputEmail">Email *</label>
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
            </div>
            <div className="flex mt-2">
                <button disabled={!formik.dirty || !formik.isValid} type="submit" className="btn btn-outline-primary">Login</button>
                <p className="text-light">New here? <Link to={"/register"}>Create you'r account</Link></p>
            </div>

        </form>
    </section>);
}

export default Login;