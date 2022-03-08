import { combineReducers } from "redux";
import { appReducer } from "./reducers/appReducer";
import { imagesReducer } from "./reducers/imagesReducer";
import { poolReducer } from "./reducers/poolReducer";
import { sandboxReducer } from "./reducers/sandboxReducer";
import { tokenReducer } from "./reducers/tokenReducer";

export const rootReducer = combineReducers(
    {
        token: tokenReducer,
        sandbox: sandboxReducer,
        pools: poolReducer,
        app: appReducer,
        images: imagesReducer
    }
);