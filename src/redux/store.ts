import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { moviesReducer } from "./MovieState";
import { usersReducer } from "./UsersState";

const reducer = combineReducers({
    moviesState: moviesReducer,
    usersState: usersReducer,
});

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default store;

