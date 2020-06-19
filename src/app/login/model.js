/*
 * @Descripttion: descripttion
 * @Author: guangyi.zhang
 * @Date: 2020-01-16 18:03:08
 * @LastEditTime: 2020-03-18 17:33:45
 */
import { message } from 'antd';
import { Tools, Http } from '../../util';

export default {
    state: {
        userId: '',
        loaded: false,
    },
    effects: {
        async asyncLogin(data) {
            const res = await Http.post('/product/itemSku/queryInitInfo.do', data);
            if (res.code === 0) {
                message.success('登录成功');
                Tools.setCookie('userId', res.result.data.userId, 30 * 60);
                Tools.setCookie('userName', res.result.data.userName, 30 * 60);
                Tools.setCookie('COP_TOKEN', res.result.token, 30 * 60);
                window.location.href = '/welcome';
            } else {
                message.error(res.msg || '登录失败');
            }
        },
    },
};
