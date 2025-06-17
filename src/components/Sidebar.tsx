import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import MiniChat from "../tools/MiniChat";
import { useSelector } from "react-redux";
import useUser from "../hooks/useUser";
import { RootState } from "../redux/store";

interface SidebarProps {

}

const Sidebar: FunctionComponent<SidebarProps> = () => {
    const userData = useSelector((state: RootState) => state.usersState.currentUser);
    const { user } = useUser()

    return (<nav className="side-nav">
        <ul>
            <li> <Link to={"/"} >
                <i className="fa-solid fa-house mb-1"></i>
                Home</Link>
            </li>
            <li> <Link to={"/movies"}>
                <i className="fa-solid fa-film"></i>
                Movies</Link>
            </li>
            <li> <Link to={"/about"}>
                <i className="fa-solid fa-circle-info"></i>
                About</Link>
            </li> {userData || user ? <>
                <li><Link to={"/favorites"}>
                    <i className="fa-solid fa-bookmark"></i>
                    Favorites</Link>
                </li>
                <li ><Link to={"/market"}>
                    <i className="fa-solid fa-coins"></i>
                    Market</Link>
                </li>
                {user?.isAdmin || userData?.isAdmin && <li><Link to={"/chat"}>
                    <i className="fa-regular fa-message"></i>
                    Chat</Link>
                </li>}

            </> : <></>}
        </ul>

        <MiniChat />
    </nav>);
}

export default Sidebar;