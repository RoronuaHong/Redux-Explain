import * as todoTypes from "../constants";

let nextTodoId = 0;
export const addTodo = text => ({
    type: todoTypes.ADD_TODO,
    id: nextTodoId++,
    text
});

export const toggleTodo = id => ({
    type: todoTypes.TOGGLE_TODO,
    id
});

export const setVisibilityFilter = filter => {
    return {
        type: todoTypes.SET_VISIBILITY_FILTER,
        filter
    }
}