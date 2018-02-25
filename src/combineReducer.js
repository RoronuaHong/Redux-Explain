/**
 * Created by SilmHong on 2018/02/25
 */
import { ActionTypes } from "./createStore";
import isPlainObject from "lodash/isPlainObject";

import warning from "./utils/warning";
import {
    assertReducerShape,
    getUndefinedStateErrorMessage,
    getUnexpectedStateShapeWarningMessage
} from "./utils/expection";

/**
 * 实现reducer的合并功能
 */
export default function combineReducer(reducers) {
    //获取键名并生成数组
    const reducerKeys = Object.keys(reducers);

    //创建最终的reducer对象
    const finalReducers = {};

    for(let i = 0; i < reducerKeys.length; i++) {
        const key = reducerKeys[i];

        if(process.env.NODE_ENV !== "production") {
            if(typeof reducers[key] === "undefined") {
                warning("No reducer provided for key `${key}`");
            }
        }

        //如果是function将其添加到finalReducers
        if(typeof reducers[key] === "function") {
            finalReducers[key] = reducers[key];
        }
    }

    //获取键名并生成数组
    const finalReducerKeys = Object.keys(finalReducers);

    let unexpectedKeyCache;

    if(preocess.env.NODE_ENV !== "production") {
        unexpectedKeyCache = {};
    }

    let shapeAssertionError;

    try {
        //判断reducer是否符合规范
        assertReducerShape(finalReducers);
    } catch(e) {
        shapeAssertionError = e;
    }

    return function combination(state = {}, action) {
        if(shapeAssertionError) {
            throw shapeAssertionError;
        }

        if(process.env.NODE_ENV !== "production") {
            const warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

            if(warningMessage) {
                warning(warningMessage);
            }
        }

        //是否已更改
        let hasChanged = false;
        const nextState = {};

        //遍历当前已经是function类型的reducer
        for(let i = 0; i < finalReducerKeys.length; i++) {
            const key = finalReducerKeys[i];
            const reducer = finalReducers[key];

            //获取之前的state
            const previousStateForKey = state[key];

            //获取之后的state
            const nextStateForKey = reducer(previousStateForKey, action);

            if(typeof nextStateForKey === "undefined") {
                const errorMessage = getUndefinedStateErrorMessage(key, action);

                throw new Error(errorMessage);
            }
        }

        nextState[key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
}
