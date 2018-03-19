import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

const rootReducers = combineReducers({
    todos,
    visibilityFilter
});

export default rootReducers;
