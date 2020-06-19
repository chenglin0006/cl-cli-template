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