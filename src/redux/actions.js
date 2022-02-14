import axios from "axios";
import { CHANGE_SANDBOX, CLOSE_POOL, GET_POOLS, HIDE_SPINNER, OPEN_POOL, REFRESH_POOLS, RESET_ERROR, SET_ERROR, SET_YATOKEN, SHOW_SPINNER } from "./types";

export function setYaToken (token) {
    localStorage.setItem('yaToken', token);
    return {
        type: SET_YATOKEN,
        payload: token
    }
};

export function changeSandbox() {
    return {
        type: CHANGE_SANDBOX
    }
}

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
            dispatch({
                    type: GET_POOLS,
                    payload: {
                        items: response.data.items.filter(item => item.status !== 'ARCHIVED')
                    }
                });
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

export function showSpinner() {
    return {
        type: SHOW_SPINNER
    }
}

export function hideSpinner() {
    return {
        type: HIDE_SPINNER
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

export function setError(errorMessage) {
    return {
        type: SET_ERROR,
        payload: errorMessage
    }
}

export function resetError(errorMessage) {
    return {
        type: RESET_ERROR
    }
}