import React, { Component } from 'react';
import { filterData } from './filterData';
import { connect } from 'react-redux';
import Edit from '../../../components/edit/index';
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
    // 提交数据
    submitData = () => {
        console.log('this is call export data')
    }
    //初始化非级联下拉选项
    componentDidMount() {
        console.log('this is call option data')
    }
	render() {
        const option = {
            citys: this.props.citys,
            areas: this.props.areas
        }
        // 初始化参数
        const initialVal = this.props.initialVal
		return (
			<div className="member">
				<Edit
                    getOptionData={this.optionHandleChange}
                    filterData={filterData(option)}
                    initialVal={initialVal}
                    submitData={this.submitData}
                    history={this.props.history}
				/>
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