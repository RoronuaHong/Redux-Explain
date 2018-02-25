/**
 * Created by SlimHong on 2018/02/25
 */

import isPlainObject from "lodash/isPlainObject";

export function getUndefinedStateErrorMessage(key, action) {
    const actionType = action && action.type;
    const actionName = (actionType && `${actionType.toString()}`) || "an action";

    return (
        `Given action ${actionName}, reducer "${key}" returned undefined. ` +
        `To ignore an action, you must explicitly return the previous state. ` +
        `If you want this reducer to hold no value, you can return null instead of undefined.`
    );
}

export function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedCache) {
    const reducerKeys = Object.keys(reducers);
    const argumentName = action && action.type === ActionTypes.INIT ?
        "preloadState argument passed to createStore"
        :
        "previous state received by the reducer";

    if(reducerKeys.length === 0) {
        return (
            "Store does not have a valid reducer. Make sure the argument passed " +
            "to combineReducers is an object whose values are reducers."
        );
    }

    if(!isPlainObject(inputState)) {
        return (
            `The ${argumentName} has unexpected type of "` +
            ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] +
            `". Expected argument to be an object with the following ` +
            `keys: "${reducerKeys.join('", "')}"`
        );
    }

    const unexpectedKeys = Object.keys(inputState).filter(key =>
        !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]
    );

    unexpectedKeys.forEach(key => {
        unexpectedKeyCache[key] = true;
    });

    if(unexpectedKeys.length > 0) {
        return (
            `Unexpected ${unexpectedKeys.length > 1 ? 'keys' : 'key'} ` +
            `"${unexpectedKeys.join('", "')}" found in ${argumentName}. ` +
            `Expected to find one of the known reducer keys instead: ` +
            `"${reducerKeys.join('", "')}". Unexpected keys will be ignored.`
        );
    }
}

export function assertReducerShape(reducers) {
    Object.keys(reducers).forEach(key => {
        const reducer = reducers[key];
        const initialState = reducer(undefined, { type: ActionTypes.INIT });

        if(typeof initialState === "undefined") {
            throw new Error(
                `Reducer "${key}" returned undefined during initialization. ` +
                `If the state passed to the reducer is undefined, you must ` +
                `explicitly return the initial state. The initial state may ` +
                `not be undefined. If you don't want to set a value for this reducer, ` +
                `you can use null instead of undefined.`
            );
        }

        const type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');

        if(typeof reducer(undefined, { type }) === "undefined") {
            throw new Error(
                `Reducer "${key}" returned undefined when probed with a random type. ` +
                `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +
                `namespace. They are considered private. Instead, you must return the ` +
                `current state for any unknown actions, unless it is undefined, ` +
                `in which case you must return the initial state, regardless of the ` +
                `action type. The initial state may not be undefined, but can be null.`
            );
        }
    });
}