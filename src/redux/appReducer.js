import { HIDE_SPINNER, RESET_ERROR, SET_ERROR, SHOW_SPINNER } from "./types";

const initialState = {poolsLoading: false, latestError: null};

export const appReducer = (state=initialState, action) => {
    switch (action.type) {
        case SHOW_SPINNER:
            return {...state, poolsLoading: true}
        case HIDE_SPINNER:
            return {...state, poolsLoading: false}
        case SET_ERROR:
            return {...state, latestError: action.payload}
        case RESET_ERROR:
            return {...state, latestError: null}
        default:
            return state
    }
}