import * as todoListType from "../constants/TodoList";

export const addTodo = state => {
    return {
        type: todoListType.ADD_TODO,
        state
    }
}