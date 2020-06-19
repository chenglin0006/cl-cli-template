/*
 * @Descripttion: descripttion
 * @Author: guangyi.zhang
 * @Date: 2020-03-18 16:56:20
 * @LastEditTime: 2020-03-18 17:07:37
 */
import { message } from 'antd';
import { Tools, Http } from '../../util';

export default {
    state: {
        updatePasswordStatus: false,
    },
    reducers: {
        setLoadStatus(state, data) {
            return {
                ...state,
                updatePasswordStatus: true,
				updatePasswordCode: data.code,
				updatePasswordMessage: data.msg
            };
        },

    },
    effects: {
        async asyncUserLogout(data) {
            const res = await Http.post('/logout.do');
            if (res.code === 0) {
                Tools.delCookie('userId');
                Tools.delCookie('userName');
                Tools.delCookie('COP_TOKEN');
                window.location.href = '/login';
            } else {
                message.error(res.msg || '登出失败');
            }
        },
        async asyncUpdatePassword(data) {
            const res = await Http.post('/user/updatePassword.do');
            if (res.code === 0) {
                this.setLoadStatus(res)
            } else {
                message.error(res.msg || '登出失败');
            }
        },
    },
};