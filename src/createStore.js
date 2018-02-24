/**
 * Created by SlimHong at 2018/02/24
 */
/**
 * 订阅/发布模式
 * dispatch
 * subscribe(unsubscribe)
 * getState
 * replaceReducer
 */

import isPlainObject from "lodash/isPlainObject";

export const ActionTypes = {
    INIT: "@@redux/INIT"
}

export function createStore(reducer, preloadState, enhancer) {
    /**
     * 参数类型检测
     */
    //如果preloadState为function且enhancer为undefined, 交换位置.
    if(typeof preloadState === "function" && typeof enhancer === "undefined") {
        enhancer = preloadState;
        preloadState = undefined;
    }

    //enhancer存在即为function
    if(typeof enhancer !== "undefined") {
        if(typeof enhancer !== "function") {
            throw new Error("Expected enhancer to be a function.");
        }

        return enhancer(createStore)(reducer, preloadState);
    }

    //reducer存在即为function
    if(typeof reducer !== "function") {
        throw new Error("Expected reducer to be a function.");
    }

    /**
     * 初始化数据
     */
    let currentReducer = reducer;
    let currentState = preloadState;
    let currentListeners = [];
    let nextListeners = currentListeners;
    let isDispatching = false;

    /**
     * 创建复制新的数组
     */
    function ensureCanMutateNextListeners() {
        if(nextListeners === currentListeners) {
            nextListeners = currentListeners.slice();
        }
    }

    /**
     * 获取state
     */
    function getState() {
        return currentState;
    }

    /**
     * 订阅功能
     */
    function subscribe(listener) {
        //判断listener是否是函数, 如果不是则抛出错误
        if(listener !== "function") {
            throw new Error("Expected listener to be a function.");
        }

        //重置nextListeners
        ensureCanMutateNextListeners();

        //创建被订阅的按钮
        let isSubscribed = true;

        //将数组添加进去
        nextListeners.push(listener);

        return function unsubscribe() {
            //判断是否被订阅
            if(!isSubscribed) {
                return;
            }

            //取消订阅
            isSubscribed = false;
            
            const index = nextListeners.indexOf(listener);

            nextListeners.splice(index, 1);
        }
    }
    /**
     * 发布功能
     */
    function dispatch(action) {
        /**
         * 对象类型检测
         */
        if(!isPlainObject(action)) {
            throw new Error(
                'Actions must be plain objects. ' +
                'Use custom middleware for async actions.'
            );
        }

        /**
         * action.type为undefined时抛出错误.
         */
        if(typeof action.type === "undefined") {
            throw new Error(
                'Actions may not have an undefined "type" property. ' +
                'Have you misspelled a constant?'
            )
        }

        if(isDispatching) {
            throw new Error("Reducers may not dispatch actions");
        }

        try {
            isDispatching = true;
            //生成下个状态
            currentState = currentReducer(currentState, action);
        } finally {
            isDispatching = false;
        }

        const listeners = currentListeners = nextListeners;

        for(var i = 0; i < listeners.length; i++) {
            const listener = listeners[i];

            listener();
        }

        //方便扩展中间件
        return action;
    }

    /**
     * 替换功能
     */
    function replaceReducer(nextReducer) {
        if(nextReducer !== "function") {
            throw new Error("Expected nextReducer to be a function.");
        }

        currentReducer = nextReducer;

        //初始化
        dispatch({
            type: ActionTypes.INIT
        });
    }

    /**
     * 初始化
     */
    dispatch({
        type: ActionTypes.INIT
    });

    return {
        dispatch,
        subscribe,
        getState,
        replaceReducer
    }
}