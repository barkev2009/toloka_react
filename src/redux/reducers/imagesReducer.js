import { CHECK_IMAGES_SIZE, CHECK_NAME_PATTERN, CHECK_WHITE_AREA, READ_IMAGES_FROM_POOL, REMOVE_DUPLICATE_NAMES, SET_DECISION } from "../types";

const initialState = {images: []};

export const imagesReducer = (state=initialState, action) => {
    switch (action.type) {
        case READ_IMAGES_FROM_POOL: // expecting action.payload as [imageData]
            let newImages = []
            action.payload.forEach(
                item => {
                    if (!state.images.map(img => img.id).includes(item.id)) {
                        newImages.push(item)
                    }
                }
            )
            return {...state, images: [...state.images, ...newImages]}
        case REMOVE_DUPLICATE_NAMES: // expecting action.payload as string(pool_id), currently sets 'reject' decision to duplicates from state
            const poolImages = state.images.filter(item => item.details.pool_id === action.payload);
            const otherImages = state.images.filter(item => item.details.pool_id !== action.payload);
            let uniqueNames = [];
            let newData = [];
            poolImages.forEach(
                item => {
                    if (!uniqueNames.includes(item.name)) {
                        uniqueNames.push(item.name);
                        newData.push(item)
                    } else {
                        item.decision = 'reject';
                        newData.push(item);
                    }
                }
            )
            return {...state, images: [...newData, ...otherImages]}
        case CHECK_NAME_PATTERN: // expecting action.payload as [imageData]
            const otherImagesCheckPattern = state.images.filter(item => item.details.pool_id !== action.payload[0].details.pool_id);
            return {...state, images: [...otherImagesCheckPattern, ...action.payload]}
        case CHECK_IMAGES_SIZE: // expecting action.payload as [imageData]
            const otherImagesCheckSize = state.images.filter(item => item.details.pool_id !== action.payload[0].details.pool_id);
            return {...state, images: [...otherImagesCheckSize, ...action.payload]}
        case CHECK_WHITE_AREA: // expecting action.payload as [imageData]
            const otherImagesCheckArea = state.images.filter(item => item.details.pool_id !== action.payload[0].details.pool_id);
            return {...state, images: [...otherImagesCheckArea, ...action.payload]}
        case SET_DECISION: // expecting action.payload as {imgId, decisionString}
            let decisionImage = state.images.filter(item => item.id === action.payload.imgId)[0]
            decisionImage.decision = action.payload.decisionString
            return {...state, images: [...state.images.map(item => item.id !== action.payload.imgId ? item : decisionImage)]}
        default:
            return state
    }
}