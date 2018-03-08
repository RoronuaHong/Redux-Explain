import React from "react";
import AddTodo from "../containers/AddTodo";
import TodoList from "../containers/TodoList";

const App = () => (
    <React.Fragment>
        <AddTodo />
        <TodoList />
    </React.Fragment>
);

export default App;
