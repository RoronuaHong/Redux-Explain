import React from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import FilterLink from "./FilterLink";

const App = () => (
    <React.Fragment>
        <AddTodo />
        <TodoList />
        <FilterLink />
    </React.Fragment>
);

export default App;
