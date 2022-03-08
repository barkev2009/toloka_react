import { 
    SET_YADISK_ID, 
    SET_YATOKEN, 
    SET_YADISK_URL, 
    SET_YADISK_SECRET, 
    SET_YADISK_TOKEN 
} from './../types';
import axios from 'axios';
import { tokenAction } from './../interfaces/tokenInterfaces';
import { resetError, setError } from './appActions';

export function setYaToken (token: string) : tokenAction {
    localStorage.setItem('yaToken', token);
    return {
        type: SET_YATOKEN,
        payload: token
    }
};

export function setYaDiskID (ID: string) : tokenAction {
    localStorage.setItem('yaDiskID', ID);
    return {
        type: SET_YADISK_ID,
        payload: ID
    }
};

export function setYaDiskSecret (secret: string) : tokenAction {
    localStorage.setItem('yaDiskSecret', secret);
    return {
        type: SET_YADISK_SECRET,
        payload: secret
    }
};

export function setYaDiskUrl(ID: string, secret: string) {
    return async dispatch => {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/getYaDiskURL/',
            params: {
                ID,
                secret
            }
        }).then(
            response => {
                dispatch(
                    {
                        type: SET_YADISK_URL,
                        payload: response.data
                    }
                )
            }
        )
    }
}

export function setYaDiskToken(ID: string, secret: string, code: string) {
    return async dispatch => {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/getYaDiskToken/',
            params: {
                ID,
                secret,
                code
            }
        }).then(
            response => {
                if (response.data.status === 'SUCCESS') {
                    dispatch(resetError());
                    localStorage.setItem('yaDiskToken', response.data.payload)
                    dispatch(
                        {
                            type: SET_YADISK_TOKEN,
                            payload: response.data.payload
                        }
                    );
                } else {
                    dispatch(setError(JSON.stringify(response.data)))
                }                
            }
        )
    }
}