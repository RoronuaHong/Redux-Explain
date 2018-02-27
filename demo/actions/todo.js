import * as todoTypes from "../constants/todo";

export function addTodos(data) {
    return {
        type: todoTypes.ADDTODOS,
        data
    }
}

export function delTodos(data) {
    return {
        type: todoTypes.DELTODOS,
        data
    }
}

export function togTodos(data) {
    return {
        type: todoTypes.TOGTODOS,
        data
    }
}