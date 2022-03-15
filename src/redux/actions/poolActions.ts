import { poolAction } from './../interfaces/poolInterfaces';
import axios from "axios";
import { CLOSE_POOL, GET_POOLS, OPEN_POOL, SET_ACTIVE_POOL } from "../types";
import { resetError, setError, setInitialSpinner, showSpinner, hideSpinner } from "./appActions";
import { readImagesFromPool } from './imageActions';


export function getPools(token: string, sandbox: boolean) {
    return async dispatch => {
        dispatch(showSpinner('poolsLoading'));
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
                    response.data.items.forEach(
                        item => {
                            if (!item.all_tasks_done) {
                                dispatch(setInitialSpinner(item.id));
                                dispatch(setInitialSpinner(`img_${item.id}`));
                            }
                            dispatch(readImagesFromPool(token ,sandbox, item.id));
                        }
                    )
                    dispatch({
                        type: GET_POOLS,
                        payload: response.data.items
                    });
                } else {
                    dispatch(setError(response.data))
                }
                dispatch(hideSpinner('poolsLoading'));
            }
        );     
    }
}

export function openClosePool(token: string, sandbox: boolean, poolId: string, action: 'open' | 'close') {
    return async dispatch => {
        dispatch(showSpinner(poolId));
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
                        payload: poolId
                    });
                } else {
                    dispatch(setError(response.data));
                }
            
            dispatch(hideSpinner(poolId));  
            }
        );   
    }
}

export function setActivePool(pool_id: string) : poolAction {
    return {
        type: SET_ACTIVE_POOL,
        payload: pool_id
    }
}

