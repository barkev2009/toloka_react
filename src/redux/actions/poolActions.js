import axios from "axios";
import { CLOSE_POOL, GET_POOLS, OPEN_POOL, REFRESH_POOLS, SEND_CHECKED_TASKS, SET_ACTIVE_POOL } from "../types";
import { hideSpinner, resetError, setError, showSpinner } from "./appActions";


export function getPools(token, sandbox) {
    return async dispatch => {
        dispatch(showSpinner());
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/pools',
            params: {
                token,
                sandbox
            }
            }).then(response => {
                if ('code' in response.data ) {
                    dispatch(setError(response.data))
                } else if ('items' in response.data) {
                    dispatch(resetError())
                    dispatch({
                        type: GET_POOLS,
                        payload: {
                            items: response.data.items
                        }
                    });
                } else {
                    dispatch(setError(response.data))
                }
            dispatch(hideSpinner());
            });     
    }
}

export function refreshPools(token, sandbox) {
    return async dispatch => {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/pools',
            params: {
                token,
                sandbox
            }
            }).then(response => {
            dispatch({
                    type: REFRESH_POOLS,
                    payload: {
                        items: response.data.items.filter(item => item.status !== 'ARCHIVED')
                    }
                });
            });     
    }
}

export function openClosePool(token, sandbox, poolId, action) {
    return async dispatch => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/pools/' + action,
            params: {
                token,
                sandbox,
                pool_id: poolId,
            }
            }).then(response => {
                if (response.data.status === 'SUCCESS') {
                    dispatch(resetError());
                    dispatch({
                        type: action === 'open' ? OPEN_POOL : CLOSE_POOL,
                    });
                    dispatch(refreshPools(token, sandbox));  
                } else {
                    dispatch(setError(response.data));
                }
            
            // dispatch(refreshPools(token, sandbox));  
            });   
    }
}

export function setActivePool(pool_id) {
    return {
        type: SET_ACTIVE_POOL,
        payload: pool_id
    }
}

export function sendCheckedTasks(sandbox, token, items) {
    return async dispatch => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/send_checked_tasks/',
            data: {
                sandbox,
                token,
                items
            }
        }).then(
            response => {
                dispatch({
                    type: SEND_CHECKED_TASKS
                })
            }
        )
    } 
}