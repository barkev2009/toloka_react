import { CLOSE_POOL, GET_POOLS, OPEN_POOL, REFRESH_POOLS, SET_ACTIVE_POOL } from "../types";

const initialState = {pools: [], activePool: ''};

export const poolReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_POOLS:
            return {...state, pools: action.payload}
        case REFRESH_POOLS:
            return {...state, pools: action.payload}
        case OPEN_POOL:
            return {...state, pools: {items: state.pools.items.map(item => item.id === action.payload ? {...item, status: 'OPEN'} : item)}}
        case CLOSE_POOL:
            return {...state, pools: {items: state.pools.items.map(item => item.id === action.payload ? {...item, status: 'CLOSED'} : item)}}
        case SET_ACTIVE_POOL:
            return {...state, activePool: action.payload}
        default:
            return state
    }
}