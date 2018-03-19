import React from "react";
import { connect } from "react-redux";
import getVisibleTodos from "../reducers/getVisibleTodos";
import { toggleTodo } from "../actions";
import Todo from "../components/Todo";

const TodoList = ({ todos, todoClick }) => {
    return (
        <ul>
             {
                todos.map(todo => (
                    <Todo 
                        key={ todo.id }
                        { ...todo }
                        onClick={() => todoClick(todo.id)}
                    />
                ))
            }
        </ul>
    )
};

const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = dispatch => ({
    todoClick: id => dispatch(toggleTodo(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
