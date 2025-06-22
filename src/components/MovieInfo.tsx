import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMovie, favoriteMovie, getMovie } from "../services/movieService";
import Movie from "../interfaces/Movie";
import Comments from "./smallComp/Comments";
import { errorMsg, successMsg } from "../tools/notifications/feedback";
import { User } from "../interfaces/User";
import { useSelector } from "react-redux";
import useUser from "../hooks/useUser";
import { RootState } from "../redux/store";
import CircularRating from "./smallComp/CircleRating";
import CharacterCard from "./smallComp/CharacterCard";

interface MovieInfoProps {
    onHide: Function;
    refresh: Function;
    movieId: string;

}

const MovieInfo: FunctionComponent<MovieInfoProps> = ({ onHide, refresh, movieId
}) => {
    const navigate = useNavigate()
    const { user } = useUser();
    const userData = useSelector((state: RootState) => state.usersState.currentUser);
    let [movie, setMovie] = useState<Movie>()
    let [favorite, setFavorite] = useState<boolean>(false)
    let [favAmount, setFavAmount] = useState<number>(0)
    let [isOwner, setIsOwner] = useState<boolean>(false);

    useEffect(() => {
        // get movie from db & chack if he is favorite
        if (movieId) {
            getMovie(movieId).then((res) => {
                let favorites = res.data.favorites
                setFavAmount(favorites.length)
                if (favorites.includes(user?._id, userData?._id)) {
                    setFavorite(true);
                }
                setMovie(res.data)
            }).catch((err) => console.log(err))
        }

    }, [user, movieId, userData?._id]);

    useEffect(() => {
        if (movie && (user || userData)) {
            setIsOwner(
                ((user?._id || userData?._id) === movie.creator) ||
                user?.isAdmin === true ||
                userData?.isAdmin === true
            );
        }
    }, [movie, user, userData]);

    const handleFavorite = (userId: string, movieId: string) => {
        if (!user && !userData) errorMsg("Login required")
        if (!favorite) {
            favoriteMovie(userId, movieId, favorite).then(() => {
                setFavorite(!favorite)
                setFavAmount(favAmount + 1)
                successMsg(`Thank you for Favorite ${movie?.name} `)
            }).catch((err) => console.log(err))
        } else {
            favoriteMovie(userId, movieId, favorite).then(() => {
                setFavorite(!favorite)
                setFavAmount(favAmount - 1)
                successMsg(`You removed ${movie?.name} from your Favorites `)
            }).catch((err) => console.log(err))
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this movie? This action cannot be undone.");

        if (!confirmDelete) return;

        try {
            await deleteMovie(movieId);
            successMsg(`"${movie?.name}" has been deleted successfully.`);
            refresh();
            onHide();
        } catch (err: any) {
            console.error("Delete error:", err);
            errorMsg("An error occurred while deleting the movie. Please try again.");
        }
    };


    return (<section className="movie-info-page">
        {movie && <div className="movie">
            <div className="movie-header">
                <CircularRating value={movie.rate} />
                <img src={movie.image.src} alt={movie.image.alt} />
                <div className="info-links">
                    <span className="flex-column">
                        {favorite ? <i onClick={() => handleFavorite(movieId, user?._id as string || userData?._id as string)
                        } className="fa-solid fa-bookmark text-warning"></i> : <i onClick={() => handleFavorite(movieId, user?._id as string || userData?._id as string)
                        } className="fa-regular fa-bookmark text-warning"></i>}
                        <span className="favAmount">{favAmount}</span>
                    </span>
                    <span className="flex-column">
                        <i className="fa-regular fa-clock text-primary"></i>
                        <span className="favAmount">{movie.duration}m</span>
                    </span>
                    {/* owner setup */}
                    {isOwner && <i onClick={handleDelete} className="fa-solid fa-trash text-danger"></i>}
                    {isOwner && <i onClick={() => navigate(`/editMovie/${movieId}`)} className="fa-regular fa-pen-to-square text-warning"></i>}
                </div>
            </div>


            <hr />
            <h2>{movie.name}</h2>
            <p>{movie.description}</p>

            <hr />  <h3>Actors <i className="fa-solid fa-user-group text-success mb-3"></i></h3>
            <div className="main-chars">
                {movie.mainChars && movie.mainChars.length > 0 ? (
                    movie.mainChars.map((char: string) => (
                        <CharacterCard key={char} name={char} />
                    ))
                ) : (
                    <p>Couldn't find the main characters</p>
                )}
            </div>



            <hr />
            <div className="commments">
                <h3>Comments <i className="fa-solid fa-comments text-primary"></i></h3>
                <Comments user={user as User} userData={userData} movieId={movieId} />
            </div>

        </div>}
    </section>);
}

export default MovieInfo;