import axios from "axios"
import Movie from "../interfaces/Movie";
const api: string = `${process.env.REACT_APP_API}movies`




// login
export function login(data: { email: string, password: string }) {
    return axios.post(`${api}/login`, data)
};

// get all movies
export function getAllMovies() {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    return axios.get(api, { headers: { Authorization: token } })
};

// get top movies
export function getTopMovies() {
    return axios.get(`${api}/topMovies`)
};

// get 3 top movies
export function getThreeTopMovies() {
    return axios.get(`${api}/topMovies/mini`)
};

// get all creators movies
export function getCreatorsMovies() {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    return axios.get(`${api}/creators`, { headers: { Authorization: token } })
};


// get all creators movies other then TMDB
export function getOtherCreatorsMovies() {
    return axios.get(`${api}/creatorsMovies`)
};

// get a specific movie
export function getMovie(movieId: string, token?: string) {
    return axios.get(`${api}/${movieId}`, {
        headers: {
            Authorization: token
        }
    })
};


// get creator movies
export function getCreatorMovies(id: string) {
    return axios.get(`${api}/creator/${id}`)
};


// get movies by ids
export function getMoviesByIds(ids: string[]) {
    return axios.post(`${api}/byIds`, { movieIds: ids })
};

// comment on a movie
export function commentMovie(movieId: string, userId: string, message: string) {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    const time = new Date()
    return axios.post(`${api}/comments/${movieId}`, { userId, message, time, token }, {
        headers: {
            Authorization: token
        }
    })
};

// favorite a movie
export function favoriteMovie(movieId: string, userId: string, flag: boolean) {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

    return axios.patch(`${api}/favorite/${movieId}`, { userId, flag }, {
        headers: {
            Authorization: token
        }
    })
};

// add movie
export function addMovie(data: Movie) {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

    return axios.post(api, data, {
        headers: {
            Authorization: token
        }
    })
};

// edit movie
export function editMovie(movieId: string, data: Movie) {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

    return axios.put(`${api}/${movieId}`, data, {
        headers: {
            Authorization: token
        }
    })
};

// delete movie
export function deleteMovie(movieId: string) {
    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

    return axios.delete(`${api}/${movieId}`, {
        headers: {
            Authorization: token
        }
    })
};


// get full time
export const getTime = (date: Date) => {
    const hours = new Date(date).getHours().toString().padStart(2, "0");
    const minutes = new Date(date).getMinutes().toString().padStart(2, "0");
    const day = new Date(date).getDate().toString().padStart(2, "0");
    const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
    const year = new Date(date).getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export const getHoursMinutes = (date: Date): string => {
    const hours = new Date(date).getHours().toString().padStart(2, "0");
    const minutes = new Date(date).getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};









