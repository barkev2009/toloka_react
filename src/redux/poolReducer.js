import { GET_POOLS, REFRESH_POOLS } from "./types";

const initialState = {pools: []};

export const poolReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_POOLS:
            return {...state, pools: action.payload}
        case REFRESH_POOLS:
            return {...state, pools: action.payload}
        default:
            return state
    }
}