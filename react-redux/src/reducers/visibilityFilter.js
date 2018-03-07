import * as todoListType from "../constants/TodoList";

export const visibilityFilter = (state = "SHOW_ALL", action) => {
    switch(action.type) {
        case todoListType.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export default visibilityFilter;
