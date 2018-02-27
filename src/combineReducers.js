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
 * 实现combineReducer的功能
 */
export function combineReducers(reducers) {
    //获取键名并生成数组
    const reducerKeys = Object.keys(reducers);

    //创建最终的reducers存放对象
    const finalReducers = {};

    for (let i = 0; i < reducerKeys.length; i++) {
        const key = reducerKeys[i];

        if(process.env.NODE_ENV !== "production") {
            if(typeof reducers[key] === "undefined") {
                warning(`No reducer provided for key "${key}"`);
            }
        }

        if(typeof reducers[key] === "function") {
            finalReducers[key] = reducers[key];
        }
    }

    //获取类型为function的reducer的键名生成数组
    const finalReducerKeys = Object.keys(finalReducers);

    let unexpectedKeyCache;

    if(process.env.NODE_ENV !== "production") {
        unexpectedKeyCache = {};
    }

    let shapeAssertionError;

    try {
        assertReducerShape(finalReducers);
    } catch(e) {
        shapeAssertionError = e;
    }

    //返回combination
    return function combination(state={}, action) {
        if(shapeAssertionError) {
            throw shapeAssertionError;
        }

        //获取相应的数据
        if(process.env.NODE_ENV !== "production") {
            const warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
            if(warningMessage) {
                warning(warningMessage);
            }
        }

        //创建一个变量hasChanged判断state是否改变过
        let hasChanged = false;
        const nextState = {};

        for(let i = 0; i < finalReducerKeys.length; i++) {
            //获取键名
            const key = finalReducerKeys[i];

            //根据键名获取相应的reducer函数
            const reducer = finalReducers[key];

            //根据键名获取相应的state
            const previousStateForKey = state[key];

            //获取下一个state
            const nextStateForKey = reducer(previousStateForKey, action);

            //如果下一个状态为undefined, 抛出异常
            if(typeof nextStateForKey === "undefined") {
                const errorMessage = getUndefinedStateErrorMessage(key, action);
                throw new Error(errorMessage);
            }

            //存储下一个state
            nextState[key] = nextStateForKey;

            //判断nextStateForKey是否与previousStateForKey相等
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }

        //若改变返回nextState, 否则返回state
        return hasChanged ? nextState : state;
    }
}
