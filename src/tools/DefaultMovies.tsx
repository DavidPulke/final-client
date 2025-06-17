import { FunctionComponent } from "react";
import Creators from "../components/smallComp/Creators";
import DefaultMarket from "./DefaultMarket";

interface DefaultMoviesProps {

}

const DefaultMovies: FunctionComponent<DefaultMoviesProps> = () => {
    return (< >
        {/* one */}
        <div className="movie">
            <img src="https://cdn.mos.cms.futurecdn.net/hFxbSeEGgUHd9csPokBUBW-1200-80.jpg" alt="harry potter" />
            <div className="movie-info">
                <button className="btn btn-outline-warning">More Info</button>
                <h4>Harry Potter and the Deathly Hallows</h4>
                <p><strong>Running Time:</strong> 130 minutes</p>
                <p><strong>Actors:</strong> Daniel Radcliffe, Rupert Grint, Emma Watson, Ralph Fiennes</p>
                <div className="movie-score">
                    <strong>Rating:</strong> 9.1/10
                </div>
            </div>
        </div>

        {/* two */}
        <div className="movie">
            <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2018/05/Bad-Boys-3.jpg" alt="" />
            <div className="movie-info">
                <button className="btn btn-outline-warning">More Info</button>
                <h2>Bad Boys for Life 3</h2>
                <p><strong>Running Time:</strong> 124 minutes</p>
                <p><strong>Actors:</strong> Will Smith, Martin Lawrence, DJ Khaled</p>
                <div className="movie-score">
                    <strong>Rating:</strong> 8.8/10
                </div>
            </div>
        </div>


        {/* three */}
        <div className="movie">
            <img src="https://images.justwatch.com/backdrop/83182674/s1440/guide.png" alt="" />
            <div className="movie-info">
                <button className="btn btn-outline-warning">More Info</button>
                <h2>Venom</h2>
                <p><strong>Running Time:</strong> 112 minutes</p>
                <p><strong>Actors:</strong> Tom Hardy, Michelle Williams, Reid Scott</p>
                <div className="movie-score">
                    <strong>Rating:</strong> 8.6/10
                </div>
            </div>
        </div>

        <Creators />
        <DefaultMarket />
    </>);
}

export default DefaultMovies;