import { FunctionComponent, useEffect, useRef, useState } from "react";
import Movie from "../../interfaces/Movie";
import { getAllMovies } from "../../services/movieService";
import { useNavigate } from "react-router-dom";
import MovieInfoModal from "../Modals/MovieInfoModal";

interface SearchMovieProps {

}

const SearchMovie: FunctionComponent<SearchMovieProps> = () => {
    const search = useRef<HTMLInputElement>(null);
    let [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)
    const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(false);
    const [movieId, setMovieId] = useState<string>("");

    useEffect(() => {
        getAllMovies().then((res) => {
            setMovies(res.data)
            setFilteredMovies(res.data);
        })
    }, []);

    const refresh = () => {
        setFlag(!flag);
        getAllMovies().then((res) => {
            setMovies(res.data)
            setFilteredMovies(res.data);
        })
    };

    const handleSearch = () => {

        const query = search.current?.value.toLowerCase() || "";
        const results = movies.filter((movie) =>
            movie.name.toLowerCase().includes(query)
        );
        setFilteredMovies(results);
    };

    // inn

    return (
        <div className={`search-wraper ${open ? "open" : ""}`}>
            <form className="search" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="search"
                    placeholder="Search..."
                    ref={search}
                    onChange={handleSearch}
                />
                <i onClick={() => setOpen(!open)} className="fa-solid fa-magnifying-glass"></i>
            </form>
            {search.current?.value.length && search.current?.value.length >= 1 ? <section className="movies-list">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <div onClick={() => {
                            setMovieId(movie._id as string)
                            setOpenInfoModal(!openInfoModal)
                        }} key={movie._id} className="movie-card">
                            <img src={movie.image.src || "/images/default-movie.jpg"} alt={movie.name} />
                            <h3>{movie.name}</h3>
                            <p>{movie.description?.slice(0, 80) || "No description available"}...</p>
                        </div>
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </section> : <></>}

            <MovieInfoModal
                onHide={() => setOpenInfoModal(false)}
                refresh={refresh}
                show={openInfoModal}
                movieId={movieId}
            />

        </div>
    );
};

export default SearchMovie;
