import { SET_YATOKEN } from "../types.ts";

const initialState = {yaToken: localStorage.getItem('yaToken')};

export const tokenReducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_YATOKEN:
            return {...state, yaToken: action.payload}
        default:
            return state
    }
}