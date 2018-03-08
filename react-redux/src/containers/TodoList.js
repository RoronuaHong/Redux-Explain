import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleTodo } from "../actions";
import getVisibleTodos from "../reducers/getVisibleTodos";

import Todo from "../components/Todo";

const TodoList = ({ todos, onTodoClick }) => (
    <ul>
        {
            todos.map(todo => (
                <Todo 
                    key={ todo.id } 
                    { ...todo } 
                    onClick={() =>
                        onTodoClick(todo.id) 
                    }
                />
            ))
        }
    </ul>
);

const mapStateToProps = state => {
    return {
        todos: getVisibleTodos(state.todos, state.VisibilityFilter)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id))
        }
    }
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired
        }).isRequired
    ).isRequired,
    onTodoClick: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);
