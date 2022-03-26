export interface tokenState {
    yaToken: string,
    yaDiskToken: string | null
}

export interface tokenAction {
    type: string,
    payload: string
}