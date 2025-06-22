import { FunctionComponent, useEffect, useState } from "react";
import { User } from "../../interfaces/User";
import { getCreators } from "../../services/userService";
import { Link } from "react-router-dom";

interface CreatorsProps {

}

const Creators: FunctionComponent<CreatorsProps> = () => {
    let [creators, setCreators] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getCreators().then((res) => {
            setCreators(res.data);
            setIsLoading(false);
        }).catch((err) => console.log(err)
        )
    }, [])

    return (
        <div className="creators-container">
            <h2 className="fire-text">Creators</h2>
            {isLoading && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            }
            <div className="creators-container">
                {creators.length ? creators.map((creator: User) => <div className="creator" title={creator.name} key={creator._id}>
                    <Link to={`/profile/${creator._id}`}> <img src={creator.image?.src} alt={creator.image?.alt} /></Link>
                </div>) : isLoading === false && setTimeout(() => {
                    setIsLoading(false)
                }, 3000) && <h3>Oops something went wrong :\</h3>}
            </div>
        </div>);
}

export default Creators;