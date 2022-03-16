import { tokenState, tokenAction } from './../interfaces/tokenInterfaces';
import { SET_YATOKEN, SET_YADISK_TOKEN } from "../types";

const initialState : tokenState = {
    yaToken: localStorage.getItem('yaToken'),
    yaDiskToken: localStorage.getItem('yaDiskToken')
};

export const tokenReducer = (state : tokenState = initialState, action : tokenAction) : tokenState => {
    switch (action.type) {
        case SET_YATOKEN:
            return {...state, yaToken: action.payload}
        case SET_YADISK_TOKEN:
            return {...state, yaDiskToken: action.payload}
        default:
            return state
    }
}