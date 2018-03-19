import * as todoType from "../constants";

const visibilityFilter = (state = todoType.SHOW_ALL, action) => {
    switch(action.type) {
        case todoType.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export default visibilityFilter;
