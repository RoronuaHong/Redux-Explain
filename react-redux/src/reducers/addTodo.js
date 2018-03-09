import * as todoListType from "../constants/TodoList";

let addTodoId = 0;

const addTodo = (state = [], action) => {
    switch(action.type) {
        case todoListType.ADD_TODO:
            return [
                ...state,
                {
                    id: addTodoId++,
                    text: action.text,
                    completed: false
                }
            ]
        default:
            return state;
    }
}

export default addTodo;