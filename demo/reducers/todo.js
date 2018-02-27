import * as todoTypes from "../constants/todo";

const initialState = [];

export function todos(state = initialState, action) {
     switch(action.type) {
        case todoTypes.ADDTODOS:
            return {
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            };
        case todoTypes.DELTODOS:
            return state.map((todo, index) => {
                action.index === index ? 
                    {
                        ...state.slice(0, index),
                        ...state.slice(index + 1)
                    }
                    :
                    state
            });
        case todoTypes.TOGTODOS:
            return state.map((todo, index) => {
                action.index === index ?
                    {
                        text: todo.text,
                        completed: !todo.completed
                    }
                    :
                    state
            });
        default:
            return state;
     }
}