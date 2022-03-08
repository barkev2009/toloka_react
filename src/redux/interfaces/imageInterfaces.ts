export interface imageState {
    images: imageObject[]
}

export interface imageObject {
    id: string,
    [key: string] : any,
}

export interface imageAction {
    type: string,
    [payload: string]: any
}