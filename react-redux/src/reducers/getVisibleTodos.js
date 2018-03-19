import * as todoType from "../constants";

const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case todoType.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case todoType.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        case todoType.SHOW_ALL:
        default:
            return todos;
    }
}

export default getVisibleTodos;
