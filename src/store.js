/*
 * @Descripttion: descripttion
 * @Author: guangyi.zhang
 * @Date: 2020-02-10 09:36:26
 * @LastEditTime: 2020-03-19 10:22:43
 */
import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import models from './models';
import { createLogger } from 'redux-logger';

// 为每一个异步action 添加loading状态。
const loading = createLoadingPlugin({});
const logger = createLogger()
const store = init({
    models,
    redux: {
        middlewares: [],
    },
    plugins: [loading],
});

export default store;