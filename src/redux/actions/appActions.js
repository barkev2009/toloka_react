import { HIDE_SPINNER, RESET_ERROR, SET_ERROR, SHOW_SPINNER } from "../types"

export function showSpinner() {
    return {
        type: SHOW_SPINNER
    }
}

export function hideSpinner() {
    return {
        type: HIDE_SPINNER
    }
}

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