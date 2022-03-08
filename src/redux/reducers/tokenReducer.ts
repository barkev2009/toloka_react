import { tokenState, tokenAction } from './../interfaces/tokenInterfaces';
import { SET_YADISK_ID, SET_YADISK_URL, SET_YATOKEN, SET_YADISK_SECRET, SET_YADISK_TOKEN } from "../types";

const initialState : tokenState = {
    yaToken: localStorage.getItem('yaToken'),
    yaDiskID: localStorage.getItem('yaDiskID'),
    yaDiskSecret: localStorage.getItem('yaDiskSecret'),
    yaDiskToken: localStorage.getItem('yaDiskToken'),
    yaDiskUrl: null
};

export const tokenReducer = (state : tokenState = initialState, action : tokenAction) : tokenState => {
    switch (action.type) {
        case SET_YATOKEN:
            return {...state, yaToken: action.payload}
        case SET_YADISK_URL:
            return {...state, yaDiskUrl: action.payload}
        case SET_YADISK_ID:
            return {...state, yaDiskID: action.payload}
        case SET_YADISK_SECRET:
            return {...state, yaDiskSecret: action.payload}
        case SET_YADISK_TOKEN:
            return {...state, yaDiskToken: action.payload}
        default:
            return state
    }
}