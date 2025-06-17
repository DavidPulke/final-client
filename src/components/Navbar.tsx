import { FunctionComponent, useEffect, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { User } from "../interfaces/User";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setCurrentUserAction } from "../redux/UsersState";

interface NavbarProps {
    userData: User | undefined
}

const Navbar: FunctionComponent<NavbarProps> = () => {
    const userData = useSelector((state: RootState) => state.usersState.currentUser);
    const { user } = useUser()
    let [open, setOpen] = useState<boolean>(false)
    const dispatch: AppDispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate()
    const handleLoggout = () => {
        localStorage.removeItem("user");
        dispatch(setCurrentUserAction(undefined));
        navigate("/")
        window.history.go(0)
    }


    return (<nav className="top-nav">
        <Link to={"/"} className="logo">PulkeMovies</Link>




        <div className="user-icon">
            <div className="balance">
                {!user && !userData ? <Link to={"/login"} className="link">Login <i className="fa-solid fa-arrow-right-to-bracket"></i></Link> : <Link to={"/market"} className="balance link" title="PulCoins" ><div className="balance-icon"><i className="fa-solid fa-coins"></i></div>
                    <span>{userData?.pulcoins ? userData?.pulcoins as number : user?.pulcoins as number || 0}</span></Link>}
            </div>
            <img onClick={() => setOpen(!open)} src={userData?.image?.src || user?.image?.src || "/images/manCoding.webp"} alt={userData?.image?.alt || user?.image?.src || "Default logo"} title={userData?.name || user?.name || "Default Icon"} />

            {user || userData ? <div className={open ? "user-tools" : "close"}>

                <Link to={`/profile/${user?._id || userData?._id}`}>
                    <button className="btn btn-outline-success w-100">Profile</button>
                </Link>
                <Link to={`/editUser/${user?._id || userData?._id}`}>
                    <button className="btn btn-outline-warning w-100">Edit</button>
                </Link>
                <button onClick={() => handleLoggout()} className="btn btn-outline-danger">Logout</button>

            </div> : <></>}


        </div>
    </nav>);
}

export default Navbar;