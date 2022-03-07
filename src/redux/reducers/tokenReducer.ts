import { tokenState, tokenAction } from './../interfaces/tokenInterfaces';
import { SET_YATOKEN } from "../types";

const initialState : tokenState = {yaToken: localStorage.getItem('yaToken')};

export const tokenReducer = (state : tokenState = initialState, action : tokenAction) : tokenState => {
    switch (action.type) {
        case SET_YATOKEN:
            return {...state, yaToken: action.payload}
        default:
            return state
    }
}