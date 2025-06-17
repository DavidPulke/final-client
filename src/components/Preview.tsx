import { FunctionComponent, useEffect, useState } from "react";
import Movie from "../interfaces/Movie";
import CharacterCard from "./smallComp/CharacterCard";

interface PreviewProps {
    onHide: Function;
    refresh: Function;
    data: Movie;

}

const Preview: FunctionComponent<PreviewProps> = ({ onHide, refresh, data
}) => {

    let [movie, setMovie] = useState<Movie>()

    useEffect(() => {
        setMovie(data)

    }, [data]);


    return (<section className="movie-info-page">
        {movie && <div className="movie">
            <div className="movie-header">

                <img src={movie.image.src} alt={movie.image.alt} />
                <div className="info-links">
                    <span className="flex-column">
                        <i className="fa-regular fa-clock text-primary"></i>
                        <span className="favAmount">{movie.duration}m</span>
                    </span>

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

        </div>}
    </section>);
}

export default Preview;