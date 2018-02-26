/**
 * Created by SlimHong on 2018/02/25
 */
import { combineReducers } from "../../src/combineReducers";

function reducer(state={ "hello": "world" }, action) {
    switch(action.type) {
        case "action1":
            return Object.assign({}, state, action);
        case "action2":
            return Object.assign({}, state, action);
        default:
            return state;
    }
}

function counter(state = 0, action) {
    switch(action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}

const todoApp = combineReducers({
    reducer,
    counter
});

export default todoApp;