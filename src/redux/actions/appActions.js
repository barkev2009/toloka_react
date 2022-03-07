import { 
    HIDE_SPINNER, 
    RESET_ERROR, 
    SET_ERROR, 
    SET_SPINNER, 
    SHOW_SPINNER 
} from "../types"

export function setError(errorMessage) {
    return {
        type: SET_ERROR,
        payload: errorMessage
    }
}

export function resetError(errorMessage) {
    return {
        type: RESET_ERROR
    }
}

export function setInitialSpinner(spinnerName) {
    return {
        type: SET_SPINNER,
        payload: spinnerName
    }
}

export function showSpinner(spinnerName) {
    return {
        type: SHOW_SPINNER,
        payload: spinnerName
    }
}

export function hideSpinner(spinnerName) {
    return {
        type: HIDE_SPINNER,
        payload: spinnerName
    }
}