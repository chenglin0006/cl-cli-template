/*
 * @Descripttion: descripttion
 * @Author: guangyi.zhang
 * @Date: 2020-02-18 17:11:14
 * @LastEditTime: 2020-04-21 15:49:47
 */
import React, { Component } from 'react';
import { filterData } from './filterData';
import { connect } from 'react-redux';
import { columns } from './columns';
import CommonList from '../../../components/list/index';
import Example from '../../../components/test/index';
import './index.less';

class Member extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchParams: {}
		}
	}
    //查询初始列表数据
	getTableData = (params) => {
        this.props.demo.setInitSearchValue(params);
		this.setState({searchParams: params});
		this.props.demo.asyncGetList(params);
    }
    //获取选项列表
	getOptionData(params) {
		this.props.getMemberSelect(params);
		this.props.getProvince(); //获取省
    }
    // 级联选择框动态获取子下拉项
    optionHandleChange = (type, data) => {
        this.props.demo.asyncGetOptionData(type.enumName)
    }
    // 获取导出接口
    exportTable = () => {
        console.log('this is call export data')
    }
    //多选批量操作
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
    }
	render() {
		let tableDataSource = this.props.MemberList && this.props.MemberList.memberListData;
        let pagination = this.props.MemberList && this.props.MemberList.memberListPage;
        const option = {
            citys: this.props.citys,
            areas: this.props.areas
        }
        // 新增、批量操作等功能按钮
        const listBtns = [{
            action: this.exportTable,
            linkUrl: './edit',
            name: '新增',
            type: 'link' // 页面跳转
        },
        {
            action: this.exportTable,
            loading: false,
            name: '批量操作',
        }]
        const exportBtn = {
            loading: false,
            action: this.exportTable
        }
        // 初始化参数
        const initialVal = this.props.initialVal || {}
        // 批量操作 没有批量操作false
        const rowSelection = {
            selectedRowKeys: [],
            onChange: this.onSelectChange,
        };
		return (
			<div className="member">
				<CommonList
					getCommonList={this.getTableData}
                    getCommonSelect={this.getOptionData}
                    filterData={filterData(option)}
                    initialVal={initialVal}
					columns={columns}
					tableDataSource={tableDataSource}
					tableLoading={this.props.loading}
					pagination={pagination}
                    handleChange={this.optionHandleChange}
                    listBtns={listBtns}
                    exportBtn={exportBtn}
                    rowSelection={rowSelection}
				/>
                <Example name="zhansan"></Example>
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {
			MemberList: state.demo.MemberList,
            loading: state.loading.effects.demo.asyncGetList,
            citys: state.demo.citys,
            areas: state.demo.areas,
            initialVal: state.demo.initialVal
		}
	},
	(dispatch) => {
		return {
			demo: dispatch.demo
		}
	}
)(Member);