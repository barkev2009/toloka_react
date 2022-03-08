import { poolAction } from './../interfaces/poolInterfaces';
import { CLOSE_POOL, GET_POOLS, OPEN_POOL, SET_ACTIVE_POOL } from "../types";
import { poolState } from "../interfaces/poolInterfaces";

const initialState : poolState = {pools: [], activePool: ''};

export const poolReducer = (state : poolState = initialState, action : poolAction): poolState => {
    switch (action.type) {
        case GET_POOLS:
            return {...state, pools: action.payload}
        case OPEN_POOL:
            return {...state, pools: state.pools.map(item => item.id === action.payload ? {...item, status: 'OPEN'} : item)}
        case CLOSE_POOL:
            return {...state, pools: state.pools.map(item => item.id === action.payload ? {...item, status: 'CLOSED'} : item)}
        case SET_ACTIVE_POOL:
            return {...state, activePool: action.payload}
        default:
            return state
    }
}