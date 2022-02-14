import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { poolReducer } from "./poolReducer";
import { sandboxReducer } from "./sandboxReducer";
import { tokenReducer } from "./tokenReducer";

export const rootReducer = combineReducers(
    {
        token: tokenReducer,
        sandbox: sandboxReducer,
        pools: poolReducer,
        app: appReducer
    }
);