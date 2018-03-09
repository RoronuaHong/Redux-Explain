import { createStore } from "redux";
import rootReducers from "../reducers";

const configureStore = () => {
    const store = createStore(
        rootReducers
    );

    return store;
}

export default configureStore;