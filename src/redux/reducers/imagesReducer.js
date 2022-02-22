import { READ_IMAGES_FROM_POOL } from "../types";

const initialState = {images: []};

export const imagesReducer = (state=initialState, action) => {
    switch (action.type) {
        case READ_IMAGES_FROM_POOL: // expecting action.payload as {pool_id: string, images: []}
            if ([...state.images].filter(item => item.pool_id === action.payload.pool_id).length === 0) { //if pool_id from payload does not exist in the state
                return {images: [...state.images, action.payload]}
            } else {
                return {images: [
                    ...[...state.images].filter(item => item.pool_id !== action.payload.pool_id).concat(action.payload)
                ]}
            }           
        default:
            return state
    }
}