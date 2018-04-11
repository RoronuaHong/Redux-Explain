import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilters from "./visibilityFilters";

const rootReducers = combineReducers({
    todos,
    visibilityFilters
});

export default rootReducers;