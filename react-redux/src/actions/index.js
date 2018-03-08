import * as todoListType from "../constants/TodoList";

let nextTodoId = 0;

//添加Todo的action
export const addTodo = text => {
    return {
        type: todoListType.ADD_TODO,
        id: nextTodoId++,
        text
    }
}

//设置Todo可见性的setVisibilityFilter
export const setVisibilityFilter = filter => {
    return {
        type: todoListType.SET_VISIBILITY_FILTER,
        filter
    }
}

export const toggleTodo = id => {
    console.log(id);
    return {
        type: todoListType.TOGGLE_TODO,
        id
    }
}
