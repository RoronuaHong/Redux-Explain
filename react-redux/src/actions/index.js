import * as todoListType from "../constans/addTodo";

//addTodo
let nextTodoId = 0;

export const addTodo = text => {
    return {
        type: todoListType.ADD_TODO,
        id: nextTodoId++,
        text
    }
}

export const setVisibilityFilter = filter => {
    return {
        type: todoListType.SET_VISIBILITY_FILTER,
        filter
    }
}

export const toggleTodo = id => {
    return {
        type: todoListType.TOGGLE_TODO,
        id
    }
}