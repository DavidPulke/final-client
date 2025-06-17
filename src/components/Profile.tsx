import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../interfaces/User";
import { getUserNoToken } from "../services/userService";
import { getCreatorMovies } from "../services/movieService";
import Movie from "../interfaces/Movie";
import Slider from "react-slick";
import { getSliderSettings } from "../tools/imageHandler";
import MovieInfoModal from "./Modals/MovieInfoModal";
import Creators from "./smallComp/Creators";
import Themes from "./smallComp/Themes";
import useUser from "../hooks/useUser";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ProfileProps {

}

const Profile: FunctionComponent<ProfileProps> = () => {
    const { userId } = useParams();
    const userData = useSelector((state: RootState) => state.usersState.currentUser);
    const { user } = useUser()
    let [userS, setUserS] = useState<User>();
    let [movies, setMovies] = useState<Movie[]>([]);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(false);
    const [movieId, setMovieId] = useState<string>("");

    useEffect(() => {
        getUserNoToken(userId as string)
            .then((res) => {
                setUserS(res.data)
            }).catch((err) => console.log(err))

        getCreatorMovies(userId as string)
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err))
    }, [userId])

    const refresh = () => {
        setFlag(!flag);
        getCreatorMovies(userId as string)
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err))
    };


    return (<section className="profile">
        <h1>Profile</h1>
        {userS ? <div className="user-card mb-3">
            <img src={userS.image?.src} alt={userS.image?.alt} />
            <div className="user-data">
                <h4><strong>Name: </strong>{userS.name}</h4>
                <h4><strong>Email: </strong>{userS.email}</h4>
                <h4><strong>Creator: </strong>{userS.isCreator ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</h4>
                <h4><strong>Movies: </strong>{movies.length || 0} 🎬</h4>
            </div>

        </div> : <h3>User Not Found</h3>}
        {(user?._id === userId || userData?._id === userId) && <Themes />}

        {movies.length > 0 && <div className="user-movies">
            <h2 className="fire-text">{userS?.name} Movies</h2>
            <Slider {...getSliderSettings(movies.length)}>
                {movies.map((movie: Movie) => (
                    <div className="carousel-movie-card" key={movie._id}>
                        <img src={movie.image.src} alt={movie.image.alt} className="carousel-movie-img" />
                        <div className="carousel-movie-info">
                            <h3>{movie.name}</h3>
                            <button
                                onClick={() => {
                                    setOpenEditModal(true);
                                    setMovieId(movie._id as string);
                                }}
                                className="btn btn-warning mt-2"
                            >
                                More Info
                            </button>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>}

        <Creators />
        <MovieInfoModal
            onHide={() => setOpenEditModal(false)}
            refresh={refresh}
            show={openEditModal}
            movieId={movieId}
        />

    </section>);
}

export default Profile;