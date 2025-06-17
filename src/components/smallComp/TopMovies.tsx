import { FunctionComponent, useEffect, useState } from "react";
import { getTopMovies } from "../../services/movieService";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import Movie from "../../interfaces/Movie";
import MovieInfoModal from "../Modals/MovieInfoModal";
import { getSliderSettings } from "../../tools/imageHandler";

interface TopMoviesProps {

}

const TopMovies: FunctionComponent<TopMoviesProps> = () => {
    const dispatch = useDispatch();
    let [movies, setMovies] = useState<Movie[]>([])

    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(false);
    const [movieId, setMovieId] = useState<string>("");

    useEffect(() => {
        getTopMovies()
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err));
    }, [dispatch]);

    const refresh = () => {
        setFlag(!flag);
        getTopMovies()
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err));
    };


    return (
        <section className="movie-carousel-container">
            <h1 className="fire-text">Top Movies <i className="fa-solid fa-fire"></i></h1>
            {movies.length > 0 ? (
                <Slider {...getSliderSettings(movies.length)}>
                    {movies.map((movie: Movie, index) => (
                        <div className="carousel-movie-card" key={movie._id}>
                            <span className="logo movie-rank-num">{index + 1}</span>
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

export default TopMovies;