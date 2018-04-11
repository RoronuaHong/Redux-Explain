import React from "react";

const Todo = ({ handlerClick, completed, text }) => {
    return (
        <li
            onClick={ handlerClick }
            style={{
                textDecoration: completed ? "line-through" : "none",
                cursor: "pointer"
            }}
        >
            { text }
        </li>
    )
}

export default Todo;
