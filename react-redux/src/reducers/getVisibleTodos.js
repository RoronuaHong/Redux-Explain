import * as actionType from "../constants";

const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case actionType.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case actionType.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        case actionType.SHOW_ALL:
        default:
            return todos;
    }
}

export default getVisibleTodos;
