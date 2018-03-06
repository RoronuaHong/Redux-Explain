import * as todoListType from "../constans/addTodo";

const todos = (state = [], action) => {
    switch(action.type) {
        case todoListType.ADD_TODO:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case todoListType.TOGGLE_TODO:
            return state.map(todo => {
                todo.id === action.id ?
                    {
                        completed: !todo.completed
                    }
                    :
                    todo
            });
        default:
            return state;
    }
}