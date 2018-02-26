/**
 * Created by SlimHong on 2018/02/26
 */
import { createStore } from "../src/createStore";
import combineReducers from "./reducers";

/**
 * 创建store
 */
const store = createStore(combineReducers);

const render = () => {
    console.log(12345);
}

store.subscribe(render);

store.dispatch({
    type: "INCREMENT"
});

store.dispatch({
    type: "INCREMENT"
});

store.dispatch({
    type: "INCREMENT"
});

console.log(store.getState());
