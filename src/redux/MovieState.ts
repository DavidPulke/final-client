import Movie from "../interfaces/Movie";

// App State
export class MoviesState {
    public movies: Movie[] = [];
}

// Action Type
export enum MoviesActionType {
    AddMovie = "AddMovie",
    UpdateMovie = "UpdateMovie",
    DeleteMovie = "DeleteMovie",
    SetAllMovies = "SetAllMovies",
    FilterMovies = "FilterMovies",
}

// Action
export interface MoviesAction {
    type: MoviesActionType;
    payload: any;
}

// Action Creators
export function addMovieAction(movie: Movie): MoviesAction {
    return { type: MoviesActionType.AddMovie, payload: movie };
}

export function updateMovieAction(movie: Movie): MoviesAction {
    return { type: MoviesActionType.UpdateMovie, payload: movie };
}

export function deleteMovieAction(_id: string): MoviesAction {
    return { type: MoviesActionType.DeleteMovie, payload: _id };
}

export function setAllMoviesAction(movies: Movie[]): MoviesAction {
    return { type: MoviesActionType.SetAllMovies, payload: movies };
}

export function filterMoviesAction(filteredMovies: Movie[]): MoviesAction {
    return { type: MoviesActionType.FilterMovies, payload: filteredMovies };
}

// Reducer
export function moviesReducer(
    currentState: MoviesState = new MoviesState(),
    action: MoviesAction
): MoviesState {
    const newState = { ...currentState, movies: [...currentState.movies] };

    switch (action.type) {
        case MoviesActionType.AddMovie:
            newState.movies.push(action.payload);
            break;

        case MoviesActionType.UpdateMovie:
            const indexToUpdate = newState.movies.findIndex(movie => movie._id === action.payload._id);
            if (indexToUpdate !== -1) {
                newState.movies[indexToUpdate] = action.payload;
            }
            break;

        case MoviesActionType.DeleteMovie:
            newState.movies = newState.movies.filter(movie => movie._id !== action.payload);
            break;

        case MoviesActionType.SetAllMovies:
            newState.movies = action.payload;
            break;

        case MoviesActionType.FilterMovies:
            newState.movies = action.payload;
            break;

        default:
            break;
    }

    return newState;
}
