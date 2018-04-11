import React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configureStores";
import AsyncApp from "./AsyncApp";

const store = configureSTore();

const Root = () => (
    <Provider store={ store }>
        <AsyncApp />
    </Provider>
);

export default Root;