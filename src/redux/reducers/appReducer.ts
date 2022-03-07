import { appState, appAction } from './../interfaces/appInterfaces';
import { 
    HIDE_SPINNER, 
    RESET_ERROR, 
    SET_ERROR, 
    SET_SPINNER, 
    SHOW_SPINNER
} from "../types";

const initialState : appState = {latestError: null, spinners: {poolsLoading: false, tasksSending: false}};

export const appReducer = (state : appState = initialState, action : appAction) : appState => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, latestError: action.payload}
        case RESET_ERROR:
            return {...state, latestError: null}
        case SET_SPINNER:
        case HIDE_SPINNER:
            return {...state, spinners: {...state.spinners, [action.payload]: false}}
        case SHOW_SPINNER:
            return {...state, spinners: {...state.spinners, [action.payload]: true}}
        default:
            return state
    }
}