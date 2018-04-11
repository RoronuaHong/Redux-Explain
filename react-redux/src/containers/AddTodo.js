import React from "react";
import { addTodo } from "../actions";
import { connect } from "react-redux";

const AddTodo = ({ dispatch }) => {
    let input;

    return (
        <React.Fragment>
            <form 
                onSubmit={e => {
                    e.preventDefault();
                    if(!input.value.trim()) {
                        return;
                    }

                    dispatch(addTodo(input.value));

                    input.value = "";
                }}
            >
                <input 
                    ref={ node => input = node }
                />
                <button
                    type="submit"
                >
                    Add Todo
                </button>
            </form>
        </React.Fragment>
    );
}

export default connect()(AddTodo);
