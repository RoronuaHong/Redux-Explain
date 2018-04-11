import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducers from "../reducers/reducers";

const loggerMiddleware = createLogger();

export const configureStore = (preloadedState) => {
    return createStore(
        rootReducers,
        preloadedState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
}