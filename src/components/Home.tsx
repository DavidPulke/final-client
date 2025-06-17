import { FunctionComponent } from "react";
import Creators from "./smallComp/Creators";
import TopMovies from "./smallComp/TopMovies";



interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    return (<section >
        {/* top 3 movies */}
        <TopMovies />
        <div className="container flex-column">
            <Creators />
        </div>

        {/* companys collection */}


        {/* selling merchendies */}
    </section>);
}

export default Home;