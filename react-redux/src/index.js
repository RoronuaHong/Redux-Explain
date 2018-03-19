import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import todoApp from "./reducers";
import configureStore from "./store/configureStore";
import App from "./containers/App";
import registerServiceWorker from './registerServiceWorker';

import "./styles/css/common/reset.css";
import "./styles/css/index.css";

const store = configureStore(todoApp);

render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
