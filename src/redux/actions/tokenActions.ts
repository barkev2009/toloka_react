import { 
    SET_YATOKEN, 
    SET_YADISK_TOKEN 
} from './../types';
import { tokenAction } from './../interfaces/tokenInterfaces';

export function setYaToken (token: string) : tokenAction {
    localStorage.setItem('yaToken', token);
    return {
        type: SET_YATOKEN,
        payload: token
    }
};

export function setYaDiskToken(token: string) {
    localStorage.setItem('yaDiskToken', token)
    return {
        type: SET_YADISK_TOKEN,
        payload: token
    }
}