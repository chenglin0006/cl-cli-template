import React, { Component } from 'react';
import { Table, Form, Button } from 'antd';
import { Link } from 'react-router-dom';
import Filter from '../filter/index';
import { Tools } from '../../util'
import './index.less';
class CommonList extends Component {
	constructor(props) {
		super(props);
		this.curPage = Tools.getUrlArg('curPage', true) || 1;
		this.pageSize = Tools.getUrlArg('pageSize', true) || 10;
		this.state = {
			curPage: this.curPage,
			pageSize: this.pageSize,
			searchParams: ''
		}
	}
	_onChangePage = (pagination) => {
		let currentPage = pagination.current;
		let searchParams = this.state.searchParams;
		if(searchParams) {
			searchParams['curPage'] = currentPage;
			searchParams['pageSize'] = pagination.pageSize;
		}

		this.setState({
			curPage: currentPage,
			searchParams: searchParams,
			pageSize: pagination.pageSize
		});
		this.props.getCommonList(searchParams);
	}
	//	重置表单
	_handleReset = () => {
		this.setState({
			curPage: 1,
			searchParams: {
				curPage: 1,
				pageSize: this.state.pageSize
			}
		});
		this.props.getCommonList({
			curPage: 1,
			pageSize: this.state.pageSize
		});
	}
	// 对日期格式的处理，放在业务组件
	_handleSearch = (items) => {
		let params = {
			curPage: 1,
			pageSize: this.state.pageSize
		}
		Object.keys(items).map((item) => {
			if (items[item]) params[item] = items[item];
		})
		this.setState({
			searchParams: params
		});
		this.props.getCommonList(params);
    }

	componentdidMount() {
		// 首次进入初始化查询参数，获取列表信息
		const params = {
			curPage: this.state.curPage,
			pageSize: this.state.pageSize
		}
		this.setState({
			searchParams:  { ...params }
		});
		this.props.getCommonList({ ...params });
		this.props.getOptionData && this.props.getOptionData();
	}

	render() {
		const { pagination, tableLoading, tableDataSource, isHideFilter, listBtns=[], rowSelection  } = this.props;
        return (
			<div>
				{!isHideFilter && <Filter
						filterData={this.props.filterData} 
						handleSearch={this._handleSearch} 
						handleReset={this._handleReset}
                        handleChange={this.props.handleChange}
                        exportBtn={this.props.exportBtn}
                        initialVal={this.props.initialVal}
					/>
				}
				{
					listBtns.length !== 0 && <div className="listBtns">
						{
							listBtns.map((item, index) => {
								if (item.type === 'link') {
									return <Link key={index} to={item.linkUrl}><Button type="primary">{item.name}</Button></Link>
								} else {
									return <Button key={index} type="default" onClick={item.action}>{item.loading ? <Icon type="loading" /> : item.name}</Button>
								}
							})
						}
					</div>
				}
				<Table
					columns={this.props.columns}
					dataSource={tableDataSource}
					rowKey={(item) => item.id}
					loading={tableLoading}
                    onChange={this._onChangePage}
                    rowSelection={rowSelection || false}
					pagination={{
						position: 'bottom',
						showQuickJumper: true,
						defaultCurrent: 1,
						showSizeChanger: true,
						defaultPageSize: Number(this.state.pageSize),
						current: pagination ? pagination.curPage : '',
						total: pagination ? pagination.totalNum : '',
						showTotal: total => `共 ${total} 条`
					}}
					scroll={this.props.scroll}
				/>
			</div>
		);
	}
}

CommonList.propTypes = {

}

export default CommonList;