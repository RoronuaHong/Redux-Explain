import React from "react";
import Todo from "../components/Todo";
import getVisibleTodos from "../reducers/getVisibleTodos";
import { toggleTodo } from "../actions";
import { connect } from "react-redux";

const TodoList = ({ handlerClick, todos }) => (
    <ul>
        {
            todos.map(todo => (
                <Todo
                    key={ todo.id }
                    { ...todo }
                    handlerClick={ () => handlerClick(todo.id) }
                />
            ))
        }
    </ul>
);

const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilters)
});

const mapDispatchToProps = dispatch => ({
    handlerClick: id => dispatch(toggleTodo(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
