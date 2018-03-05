import React from "react";
import PropTypes from "react-types";

const Todo = ({ onClick, completed, text }) => (
    <li
        onClick={ onClick }
        style={{ textDecoration: completed ? "line-throgh" : "none" }}
    >
        { text }
    </li>
);

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: Proptypes.bool.isRequired,
    text: Proptypes.string.isRequired
}

export default Todo;