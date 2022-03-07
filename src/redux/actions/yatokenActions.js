import { SET_YATOKEN } from "../types.ts";

export function setYaToken (token) {
    localStorage.setItem('yaToken', token);
    return {
        type: SET_YATOKEN,
        payload: token
    }
};