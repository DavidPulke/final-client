import React, { useState } from "react";
import { Link } from "react-router-dom";


const WhyRegister: React.FC = () => {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    return (<div className="whyRegister">
        <h2>Why Should I Register?</h2>
        <ul>
            <li>Get full access to the site and become an official member of the PulkeMovies community.</li>
            <li>Collect PulCoins and use them to unlock fun features, upgrades, and exclusive virtual items related to your favorite movies!</li>
            <li className="read-more">For more information visit the <Link to={"/about"}>About</Link> page </li>
            <div className="extra-info">
                <li>Help shape the movie rankings — your ratings impact how movies are ranked on our platform.</li>
            </div>
        </ul>
        <p>
            Registration is free — and no real money involved. Just pure fun for movie lovers!
        </p>
    </div>)
};

export default WhyRegister;
