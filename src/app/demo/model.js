import { message } from 'antd';
import { Tools, Http } from '../../util';
import Service from './Service';

export default {
    state: {
        updatePasswordStatus: false,
        initialVal: {}, //初始化页面查询参数以及查询参数保留
    },
    reducers: {
        getList(state, data) {
            return {
                ...state,
                memberListStatus: true,
                memberListCode: data.code,
                memberListData: data.data,
                memberListPage: data.page
            };
        },
        getDetail(state, res) {
            return {
                ...state,
                memberDetailStatus: true,
				memberDetailCode: res.code,
				memberDetailData: res.data
            }
        },
        getOptionCityData(state, data) {
            return {
                ...state,
				citys: data
            }
        },
        getOptionAreaData(state, data) {
            return {
                ...state,
				areas: data
            }
        },
        clearCityAndAreaOption(state) {
            return {
                ...state,
                citys: [],
                areas: []
            }
        },
        setInitSearchValue(state, data) {
            console.log(data, 'data')
            return {
                ...state,
                initialVal: data
            }
        }

    },
    effects: {
        async asyncGetList(params, rootState) {
            const data = await Service.getList(params);
            this.getList(data);
            return data.result;
        },
        async asyncGetDetail(data, rootState) {
            const res = await Http.post('/customer/detail.do', data);
            if (res.code === 0) {
                this.getDetail(res)
            } else {
                message.error(res.msg || '登出失败');
            }
        },
        async asyncGetOptionData(data, rootState) {
            const citys = [{
                id: 'shanghaishi',
                name: '上海市'
            },{
                id: 'tianjin',
                name: '天津市'
            }]
            const areas = [{
                id: 'pudong',
                name: '浦东新区'
            },{
                id: 'minghan',
                name: '闵行区'
            }]
            if (data === 'provinces') { 
                this.clearCityAndAreaOption()
                this.getOptionCityData(citys)
            }
            if (data === 'citylist') this.getOptionAreaData(areas)
        }
    },
};