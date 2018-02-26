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
} from "./utils/exception";

/**
 * 实现reducer的合并功能
 */
export function combineReducers(reducers) {
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

    if(process.env.NODE_ENV !== "production") {
        unexpectedKeyCache = {};
    }

    //判断reducer是否符合规范
    let shapeAssertionError;

    try {
        //判断reducer是否符合规范
        assertReducerShape(finalReducers);
    } catch(e) {
        shapeAssertionError = e;
    }

    return function combination(state={}, action) {
        if(shapeAssertionError) {
            throw shapeAssertionError;
        }

        //不在生产环境下生成
        if(process.env.NODE_ENV !== "production") {
            const warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
            
            if(warningMessage) {
                warning(warningMessage);
            }
        }

        var hasChanged = false;
        const nextState = {};

        for(let i = 0; finalReducers.length > 0; i++) {
            const key = finalReducerKeys[key];
            const reducer = finalReducers;
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);

            if(typeof nextStateForKey === "function") {
                const errorMessage = getUndefinedStateErrorMessage(keey, action);
                
                throw errorMessage;
            }

            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }

        return hasChanged ? nextState : state;
    }
}
