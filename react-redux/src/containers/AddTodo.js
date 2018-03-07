import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";

let AddTodo = ({ dispatch }) => {
    let input;

    return (
        <React.Fragment>
            <form
                onSubmit={e => {
                    e.preventDefault();

                    if(!input.value.trim()) {
                        return;
                    }

                    //调用action修改state的状态
                    dispatch(addTodo(input.value));

                    input.value = "";
                }}
            >
                <input
                    ref={node => {
                        input = node;
                    }}
                />
                <button
                    type="submit"
                >
                    Add Todo
                </button>
            </form>
        </React.Fragment>
    )
}

AddTodo = connect()(AddTodo);

export default AddTodo;