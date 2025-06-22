import { FunctionComponent, useEffect, useState } from "react";
import { RootState } from "../redux/store";
import TMDBMovies from "./smallComp/TMDBMovies";
import CreatorsMovies from "./smallComp/CreatorsMovies";
import TopMovies from "./smallComp/TopMovies";
import useUser from "../hooks/useUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchMovie from "./smallComp/SearchMovie";

const Movies: FunctionComponent = () => {

    const userData = useSelector((state: RootState) => state.usersState.currentUser);
    const { user } = useUser()
    const navigate = useNavigate()
    let [isCreator, setIsCreator] = useState<boolean>(false)



    useEffect(() => {
        setIsCreator((user?.isCreator || userData?.isCreator) as boolean)
    }, [user, userData])





    return (
        <section>
            <SearchMovie />
            <div className="main-movies">
                <TMDBMovies />
                <TopMovies />
                <CreatorsMovies />
            </div>
            {isCreator && <button className="btn btn-success add-movie-btn" onClick={() => navigate("/addMovie")}>
                <i className="fa-regular fa-square-plus"></i>
            </button>}






        </section>
    );
};

export default Movies;
