import { tokenAction } from './../interfaces/tokenInterfaces';
import { SET_YATOKEN } from "../types";

export function setYaToken (token : string) : tokenAction {
    localStorage.setItem('yaToken', token);
    return {
        type: SET_YATOKEN,
        payload: token
    }
};