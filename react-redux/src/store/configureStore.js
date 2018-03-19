import { createStore } from "redux";
import rootReducders from "../reducers";

const configureStore = () => {
    const store = createStore(
        rootReducders
    );

    return store;
}

export default configureStore;
