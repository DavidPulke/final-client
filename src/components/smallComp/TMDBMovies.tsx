import { FunctionComponent, useEffect, useState } from "react";
import { getCreatorMovies } from "../../services/movieService";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import Movie from "../../interfaces/Movie";
import { setAllMoviesAction } from "../../redux/MovieState";
import { RootState } from "../../redux/store";
import MovieInfoModal from "../Modals/MovieInfoModal";
import { getSliderSettings } from "../../tools/imageHandler";

interface TMDBMoviesProps {

}

const TMDBMovies: FunctionComponent<TMDBMoviesProps> = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.moviesState.movies);

    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(false);
    const [movieId, setMovieId] = useState<string>("");

    useEffect(() => {
        getCreatorMovies(process.env.TMDB_ID || "TMDB")
            .then((res) => dispatch(setAllMoviesAction(res.data) as any))
            .catch((err) => console.log(err));
    }, [dispatch]);

    const refresh = () => {
        setFlag(!flag);
        getCreatorMovies(process.env.TMDB_ID || "")
            .then((res) => dispatch(setAllMoviesAction(res.data) as any))
            .catch((err) => console.log(err));
    };



    return (
        <section className="movie-carousel-container">
            <h1 className="fire-text">TMDB Movies</h1>
            {movies.length > 0 ? (
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
            ) : (
                <h3>Ooops Something went wrong :\</h3>
            )}

            <MovieInfoModal
                onHide={() => setOpenEditModal(false)}
                refresh={refresh}
                show={openEditModal}
                movieId={movieId}
            />
        </section>
    );
}

export default TMDBMovies;