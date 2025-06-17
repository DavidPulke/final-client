import { FunctionComponent, useEffect, useState } from "react";
import Movie from "../interfaces/Movie";
import { getAllMovies } from "../services/movieService";
import { getAllUsers } from "../services/userService";
import { User } from "../interfaces/User";

interface AboutProps { }

const About: FunctionComponent<AboutProps> = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [movieCount, setMovieCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        getAllMovies()
            .then((res) => setMovies(res.data))
            .catch((err) => console.log(err));
        getAllUsers()
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err));
    }, []);

    // Count-up animation
    useEffect(() => {
        let movieInterval = setInterval(() => {
            setMovieCount((prev) => {
                if (prev < movies.length) return prev + 1;
                clearInterval(movieInterval);
                return movies.length;
            });
        }, 10);

        let userInterval = setInterval(() => {
            setUserCount((prev) => {
                if (prev < users.length) return prev + 1;
                clearInterval(userInterval);
                return users.length;
            });
        }, 100);
    }, [movies, users]);

    return (
        <section className="about-section">
            <h1>
                About <span className="text-logo">PulkeMovies</span>
            </h1>

            <div className="about-text">
                <p>
                    Welcome to <strong>PulkeMovies</strong>, your ultimate destination for movie lovers!
                    Here, you'll find the latest and greatest in cinema — from blockbusters to hidden indie gems.
                </p>
                <p>
                    Our growing community allows users to register, rate, review, and build personal watchlists.
                    Admins can manage content and keep the library up to date.
                </p>
                <p>
                    Whether you're here to discover new films, revisit classics, or simply stay updated — we've got you covered.
                    PulkeMovies is constantly expanding and improving, and we'd love you to be part of our journey!
                </p>
            </div>

            <div className="statistics-container">
                <div className="stat-box">
                    <div className="stat-value">🎬 {movieCount}</div>
                    <div className="stat-label">Total Movies</div>
                </div>
                <div className="stat-box">
                    <div className="stat-value">👥 {userCount}</div>
                    <div className="stat-label">Registered Users</div>
                </div>
                <div className="stat-box">
                    <div className="stat-value">⭐ 956</div>
                    <div className="stat-label">Reviews Written</div>
                </div>
                <div className="stat-box">
                    <div className="stat-value">🎭 8</div>
                    <div className="stat-label">Genres Supported</div>
                </div>
            </div>
        </section>
    );
};

export default About;
