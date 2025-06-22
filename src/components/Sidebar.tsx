import { FunctionComponent, useState } from "react";
import { NavLink } from "react-router-dom";
import MiniChat from "../tools/MiniChat";
import { useSelector } from "react-redux";
import useUser from "../hooks/useUser";
import { RootState } from "../redux/store";

interface SidebarProps {

}

const Sidebar: FunctionComponent<SidebarProps> = () => {
    const userData = useSelector((state: RootState) => state.usersState.currentUser);
    const { user } = useUser()
    const [open, setOpen] = useState<boolean>(false)

    return (<nav className="side-nav">
        <ul className="big-nav">
            <li> <NavLink to={"/"} >
                <i className="fa-solid fa-house mb-1"></i>
                Home</NavLink>
            </li>
            <li> <NavLink to={"/movies"}>
                <i className="fa-solid fa-film"></i>
                Movies</NavLink>
            </li>
            <li> <NavLink to={"/about"}>
                <i className="fa-solid fa-circle-info"></i>
                About</NavLink>
            </li> {userData || user ? <>
                <li><NavLink to={"/favorites"}>
                    <i className="fa-solid fa-bookmark"></i>
                    Favorites</NavLink>
                </li>
                <li ><NavLink to={"/market"}>
                    <i className="fa-solid fa-coins"></i>
                    Market</NavLink>
                </li>
                {(user?.isAdmin || userData?.isAdmin) && <li><NavLink to={"/chat"}>
                    <i className="fa-regular fa-message"></i>
                    Chat</NavLink>
                </li>}

            </> : <></>}
        </ul>

        {/* phone nav */}
        <div className="phone-nav-wraper">
            <ul className={`phone-nav ${open ? "open" : "close"}`}>
                <li> <NavLink to={"/"} >
                    <i className="fa-solid fa-house mb-1"></i>
                    Home</NavLink>
                </li>
                <li> <NavLink to={"/movies"}>
                    <i className="fa-solid fa-film"></i>
                    Movies</NavLink>
                </li>
                <li> <NavLink to={"/about"}>
                    <i className="fa-solid fa-circle-info"></i>
                    About</NavLink>
                </li> {userData || user ? <>
                    <li><NavLink to={"/favorites"}>
                        <i className="fa-solid fa-bookmark"></i>
                        Favorites</NavLink>
                    </li>
                    <li ><NavLink to={"/market"}>
                        <i className="fa-solid fa-coins"></i>
                        Market</NavLink>
                    </li>
                    {(user?.isAdmin || userData?.isAdmin) && <li><NavLink to={"/chat"}>
                        <i className="fa-regular fa-message"></i>
                        Chat</NavLink>
                    </li>}
                </> : <></>}

            </ul>
            {open ? <i onClick={() => setOpen(false)} className="fa-regular fa-circle-left close-btn text-warning"></i> : <i onClick={() => setOpen(true)} className="fa-regular fa-circle-right open-btn text-warning"></i>}
        </div>


        <MiniChat />
    </nav>);
}

export default Sidebar;