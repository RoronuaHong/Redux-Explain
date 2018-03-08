import * as todoListType from "../constants/TodoList";

const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case todoListType.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case todoListType.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        case todoListType.SHOW_ALL:
        default:
            return todos;
    }
}

export default getVisibleTodos;