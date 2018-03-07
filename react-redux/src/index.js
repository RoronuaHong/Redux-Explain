import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import todoApp from "./reducers";
import configureStore from "./store/configureStore";
import App from "./components/App";
import registerServiceWorker from './registerServiceWorker';

let store = configureStore(todoApp);

render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
