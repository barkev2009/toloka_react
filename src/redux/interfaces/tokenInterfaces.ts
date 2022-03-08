export interface tokenState {
    yaToken: string,
    yaDiskUrl: string | null,
    yaDiskID: string | null,
    yaDiskSecret: string | null,
    yaDiskToken: string | null
}

export interface tokenAction {
    type: string,
    payload: string
}