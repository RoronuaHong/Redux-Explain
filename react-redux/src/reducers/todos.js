import * as todoType from "../constants";

const todos = (state = [], action) => {
    switch(action.type) {
        case todoType.ADD_TODO:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                 }
            ]
        case todoType.TOGGLE_TODO:
            return state.map(todo => 
                (todo.id === action.id) ?
                {
                    ...todo,
                    completed: !todo.completed
                }
                :
                todo
            );
        default:
            return state;
    }
}

export default todos;
