import { FunctionComponent, useEffect, useState } from "react";
import { User } from "../../interfaces/User";
import { getCreators } from "../../services/userService";
import { Link } from "react-router-dom";

interface CreatorsProps {

}

const Creators: FunctionComponent<CreatorsProps> = () => {
    let [creators, setCreators] = useState<User[]>([])
    useEffect(() => {
        getCreators().then((res) => setCreators(res.data)).catch((err) => console.log(err)
        )
    }, [])

    return (
        <div className="creators-container">
            <h2 className="fire-text">Creators</h2>
            <div className="creators-container">
                {creators.length && creators.map((creator: User) => <div className="creator" title={creator.name} key={creator._id}>
                    <Link to={`/profile/${creator._id}`}> <img src={creator.image?.src} alt={creator.image?.alt} /></Link>
                </div>)}
            </div>
        </div>);
}

export default Creators;