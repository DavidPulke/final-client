import { FunctionComponent, useEffect, useState } from "react";
import DefaultMovies from "../tools/DefaultMovies";
import { getThreeTopMovies, getTopMovies } from "../services/movieService";
import Movie from "../interfaces/Movie";
import MovieInfoModal from "./Modals/MovieInfoModal";
import Creators from "./smallComp/Creators";

interface TopMoviesShortProps {

}

const TopMoviesShort: FunctionComponent<TopMoviesShortProps> = () => {
    let [movies, setMovies] = useState<Movie[]>([]);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(false);
    const [movieId, setMovieId] = useState<string>("");

    useEffect(() => {
        getThreeTopMovies()
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err))
    }, []);

    const refresh = () => {
        setFlag(!flag);
        getThreeTopMovies()
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err))
    };


    return (<section className="top-movies-container">
        <h1 className="fire-text">Top Movies</h1>
        <div className="movies">

            {movies.length > 0 ? movies.map((movie: Movie) => {
                return <div className="movie" key={movie._id}>
                    <img src={movie.image.src} alt={movie.image.alt} />
                    <div className="movie-info">
                        <button
                            onClick={() => {
                                setOpenEditModal(true);
                                setMovieId(movie._id as string);
                            }}
                            className="btn btn-warning mt-2"
                        >
                            More Info
                        </button>

                        <h4>{movie.name}</h4>
                        <p><strong>Description:</strong> {movie.description}</p>
                        <p><strong>Running Time:</strong> {movie.duration}</p>
                        <p><strong>Actors:</strong> {movie.mainChars.join(", ")}</p>
                        <div className="movie-score">
                            <strong>Rating:</strong> {movie.rate}
                        </div>
                    </div>
                </div>
            }) : <DefaultMovies />}
            <Creators />
        </div>


        <MovieInfoModal
            onHide={() => setOpenEditModal(false)}
            refresh={refresh}
            show={openEditModal}
            movieId={movieId}
        />
    </section>);
}

export default TopMoviesShort;