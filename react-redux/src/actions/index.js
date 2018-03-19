import * as todoType from "../constants";

let nextTodoId = 0;

export const addTodo = text => ({
    type: todoType.ADD_TODO,
    id: nextTodoId++,
    text
});

export const toggleTodo = id => ({
    type: todoType.TOGGLE_TODO,
    id
});

export const visibilityFilter = filter => ({
    type: todoType.SET_VISIBILITY_FILTER,
    filter
});