import { 
    HIDE_GET_POOLS_SPINNER, 
    HIDE_SEND_TASKS_SPINNER, 
    HIDE_SPINNER, 
    RESET_ERROR, 
    SET_ERROR, 
    SET_SPINNER, 
    SHOW_GET_POOLS_SPINNER, 
    SHOW_SEND_TASKS_SPINNER, 
    SHOW_SPINNER
} from "../types";

const initialState = {latestError: null, spinners: {poolsLoading: false, tasksSending: false}};

export const appReducer = (state=initialState, action) => {
    switch (action.type) {
        case SHOW_GET_POOLS_SPINNER:
            return {...state, poolsLoading: true}
        case HIDE_GET_POOLS_SPINNER:
            return {...state, poolsLoading: false}
        case SHOW_SEND_TASKS_SPINNER:
            return {...state, tasksSending: true}
        case HIDE_SEND_TASKS_SPINNER:
            return {...state, tasksSending: false}
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