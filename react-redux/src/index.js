// import React from "react";
// import { render } from "react-dom";
// import { Provider } from "react-redux";
// import configureStore from "./store/configureStore";
// import App from "./containers/App";
// import registerServiceWorker from "./registerServiceWorker";

// const store = configureStore();

// registerServiceWorker();

// render(
//     <Provider store={ store }>
//         <App />
//     </Provider>,
//     document.querySelector("#root")
// );

// import React from "react";
// import { render } from "react-dom";
// import Root from "./containers/Root";

import { 
    createStore, 
    combineReducers 
} from "redux";

import React, { Component } from "react";
import reactDOM from "react-dom";

const todo = (state, action) => {
    switch(action.type) {
        case "ADD_TODO":
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case "TOGGLE_TODO":
            return (state.id === action.id) ?
                {
                    ...state,
                    completed: !state.completed
                }
                :
                state;
        default:
            return state;
    }
}

const todos = (state = [], action) => {
    switch(action.type) {
        case "ADD_TODO":
            return [
                ...state,
                todo(undefined, action)
            ];
        case "TOGGLE_TODO":
            return state.map(t => todo(t, action));
        default:
            return state;
    }
}

const visibilityFilter = (state = "SHOW_ALL", action) => {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state;
    }
}

const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case "SHOW_ACTIVE":
            return todos.filter(t => !t.completed);
        case "SHOW_COMPLETED":
            return todos.filter(t => t.completed);
        case "SHOW_ALL":
        default:
            return todos;
    }
}

const Todo = ({ onClick, text, completed }) => (
    <li
        onClick={ onClick }
        style={{
            textDecoration: completed ? "line-through" : "none",
            color: "#f93",
            cursor: "pointer"
        }}
    >
        { text }
    </li>
);

const TodoList = ({ todos, onTodoClick }) => (
    <ul>
        {
            todos.map(todo =>
                <Todo
                    key={ todo.id }
                    { ...todo }
                    onClick={ () => onTodoClick(todo.id) }
                />
            )
        }
    </ul>
);

const AddTodo = ({ handleClick }) => {
    let input;

    return(
        <div>
            <input
                ref={ node => input = node }
            />
            <button
                onClick={() => {
                    handleClick(input.value);

                    input.value = "";
                }}
            >
                Add Todo
            </button>
        </div>
    )
}

const Link = ({ 
    active,
    children,
    onFilterClick
}) => (
    active ?
        <span>{ children }</span>
        :
        <a 
            href="#"
            onClick={e => {
                e.preventDefault();
                onFilterClick();
            }}
        >
            { children }
        </a>
);

class FilterLink extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        });
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {
            filter,
            children
        } = this.props,
            state = store.getState();

        return (
            <Link
                active={filter === state.visibilityFilter}
                onFilterClick={() => {
                    store.dispatch({
                        type: "SET_VISIBILITY_FILTER",
                        filter
                    })
                }}
            >
                { children }
            </Link>
        )
    }
}

const Footer = () => (
    <p>
        {"SHOW: "}
        <FilterLink
            filter="SHOW_ALL"
        >
            All
            </FilterLink>
        {", "}
        <FilterLink
            filter="SHOW_ACTIVE"
        >
            Active
            </FilterLink>
        {", "}
        <FilterLink
            filter="SHOW_COMPLETED"
        >
            Completed
        </FilterLink>
    </p>
);

let nextTodoId = 0;
const TodoApp = ({ todos, visibilityFilter }) => {
    let visibleTodos = getVisibleTodos(todos, visibilityFilter);

    return (
        <div>
            <AddTodo 
                handleClick={text => {
                    if (!text.trim()) {
                        return;
                    }
                    store.dispatch({
                        type: "ADD_TODO",
                        id: nextTodoId++,
                        text,
                        completed: false
                    });
                }}
            />
            <TodoList 
                todos={ visibleTodos }
                onTodoClick={id => {
                    store.dispatch({
                        type: "TOGGLE_TODO",
                        id
                    });
                }}
            />
            <Footer 
                visibilityFilter={ visibilityFilter }
                onFilterClick={filter => 
                    store.dispatch({
                        type: "SET_VISIBILITY_FILTER",
                        filter
                    })
                }
            />
        </div>
    );
}

const rootReducers = combineReducers({
    todos,
    visibilityFilter
});

const store = createStore(rootReducers);

const render = () => {
    reactDOM.render(
        <TodoApp 
            { ...store.getState() }
        />,
        document.querySelector("#root")
    );
}

store.subscribe(render);
render();

// const combineReducers = reducers => {
//     //返回一个reducer
//     return (state = {}, action) => {
//         //使用reducers返回一个对象Object存储获取到的下一个state
//         return Object.keys(reducers).recuce((nextState, key) => {
//             nextState[key] = reducers[key](state[key], action);

//             return nextState;
//         }, {});
//     }
// }

// render(
//     <Root />,
//     document.querySelector("#root")
// )
