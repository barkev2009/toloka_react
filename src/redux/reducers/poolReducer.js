import { GET_POOLS, REFRESH_POOLS, SET_ACTIVE_POOL } from "../types";

const initialState = {pools: [], activePool: ''};

export const poolReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_POOLS:
            return {...state, pools: action.payload}
        case REFRESH_POOLS:
            return {...state, pools: action.payload}
        case SET_ACTIVE_POOL:
            return {...state, activePool: action.payload}
        default:
            return state
    }
}