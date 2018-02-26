/**
 * 简单的createStore
 */
function createStore(reducer) {
    let state,
        listeners = [];
    /**
     * 获取state
     */
    const getState = () => state;
    /**
     * 订阅功能
     */
    const subscribe = (listener) => {
        listeners.push(listener);

        //unsubscribe
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }
    /**
     * 发布功能
     */
    const dispatch = (action) => {
        state = reducer(state, action);

        listeners.forEach(listener => listener());
    }

    dispatch({});

    return {
        getState,
        subscribe,
        dispatch
    }
}

function Counter(state = 0, action) {
    switch(action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}

const indexs = () => {
    console.log("abcdefg");
}

const store = createStore(Counter);

store.subscribe(indexs);

store.dispatch({
    type: "INCREMENT"
});

store.dispatch({
    type: "INCREMENT"
});

console.log(store.getState());
