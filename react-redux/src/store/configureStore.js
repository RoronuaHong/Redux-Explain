import { createStore } from "redux";
import combineReducers from "../reducers";

const createStores = (initialState) => {
    const store = createStore(
        combineReducers, 
        initialState, 
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    return store;
}

export default createStores;
