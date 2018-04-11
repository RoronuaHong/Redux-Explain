import * as actionTypes from "../constants";

const visibilityFilters = (state = "SHOW_ALL", action) => {
    switch(action.type) {
        case actionTypes.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export default visibilityFilters;   
