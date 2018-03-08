import { createStore } from "redux";
import combineReducers from "../reducers";

const createStores = (initialState) => {
    const store = createStore(
        combineReducers
    );

    return store;
}

export default createStores;
