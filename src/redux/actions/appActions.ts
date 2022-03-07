import { appAction } from './../interfaces/appInterfaces';
import { 
    HIDE_SPINNER, 
    RESET_ERROR, 
    SET_ERROR, 
    SET_SPINNER, 
    SHOW_SPINNER 
} from "../types"

export function setError(errorMessage : string) : appAction {
    return {
        type: SET_ERROR,
        payload: errorMessage
    }
}

export function resetError() : appAction {
    return {
        type: RESET_ERROR
    }
}

export function setInitialSpinner(spinnerName: string) : appAction {
    return {
        type: SET_SPINNER,
        payload: spinnerName
    }
}

export function showSpinner(spinnerName: string) : appAction {
    return {
        type: SHOW_SPINNER,
        payload: spinnerName
    }
}

export function hideSpinner(spinnerName: string) : appAction {
    return {
        type: HIDE_SPINNER,
        payload: spinnerName
    }
}