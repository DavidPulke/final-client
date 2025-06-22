import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useUser from "../hooks/useUser";
import { RootState } from "../redux/store";
import { getMoviesByIds } from "../services/movieService";
import Movie from "../interfaces/Movie";
import MovieInfoModal from "./Modals/MovieInfoModal";
import { getUserNoToken } from "../services/userService";

interface FavoritesProps {

}

const Favorites: FunctionComponent<FavoritesProps> = () => {
    const { user } = useUser();
    const userData = useSelector((state: RootState) => state.usersState.currentUser);
    let [flag, setFlag] = useState<boolean>(false);
    let [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const favorites = user?.favorites || userData?.favorites;
        if (!favorites) return;

        getMoviesByIds(favorites)
            .then(async (res) => {
                const updatedMovies = await Promise.all(
                    res.data.map(async (movie: Movie) => {
                        try {
                            const userRes = await getUserNoToken(movie.creator);
                            return { ...movie, creator: userRes.data.name };
                        } catch (error) {
                            return movie;
                        }
                    })
                );
                setMovies(updatedMovies);
                setIsLoading(false)
            })
            .catch((err) => console.log(err));
    }, [user?.favorites, userData?.favorites]);




    // modal handlers
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    let [movieId, setMovieId] = useState<string>('');
    let refresh = () => {
        setFlag(!flag);
        const favorites = user?.favorites || userData?.favorites;
        if (!favorites) return;

        getMoviesByIds(favorites)
            .then(async (res) => {
                const updatedMovies = await Promise.all(
                    res.data.map(async (movie: Movie) => {
                        try {
                            const userRes = await getUserNoToken(movie.creator);
                            return { ...movie, creator: userRes.data.name };
                        } catch (error) {
                            return movie;
                        }
                    })
                );
                setMovies(updatedMovies);
                setIsLoading(false)
            })
            .catch((err) => console.log(err));
    };

    return (<section>
        <h1 className="fire-text">Favorites</h1>
        {isLoading && <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        }
        <div className="movies favorites">
            {movies.length > 0 ? movies.map((movie: Movie) => {
                return <div className="movie" key={movie._id}>
                    <img src={movie.image.src} alt={movie.image.alt} />
                    <div className="movie-info">
                        <button onClick={() => {
                            setOpenEditModal(true)
                            setMovieId(movie._id as string)
                        }} className="btn btn-outline-warning">More Info</button>
                        <h2 className="fire-text">{movie.name}</h2>
                        <p><strong>Description:</strong> {movie.description}</p>
                        <p><strong>Running Time:</strong>{movie.duration}</p>
                        <p><strong>Creator:</strong> {movie.creator}</p>
                        <p><strong>Actors:</strong> {movie.mainChars.join(", ")}</p>
                        <div className="movie-score">
                            <strong>Rating:</strong> {(movie.rate).toFixed(1)}
                        </div>
                    </div>
                </div>
            }) : isLoading === false && setTimeout(() => {
                setIsLoading(false)
            }, 3000) && <h3>You need to favorite movies to see them here :\</h3>}
        </div>

        <MovieInfoModal onHide={() => setOpenEditModal(false)} refresh={refresh} show={openEditModal} movieId={movieId} />
    </section>);
}

export default Favorites;