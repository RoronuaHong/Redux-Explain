import * as todoTypes from "../constants";

const todos = (state = [], action) => {
    console.log(action);
    switch(action.type) {
        case todoTypes.ADD_TODO:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case todoTypes.TOGGLE_TODO:
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
