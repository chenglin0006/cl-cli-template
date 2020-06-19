import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Layout, Dropdown, Breadcrumb} from 'antd';
import { connect } from 'react-redux';
import {menus} from './menu';
import WrappedUpdatePassword from '../password/';
import { Tools } from '../../util';
import logoImage from '../../images/logo.jpg';
import {MenuFoldOutlined, MenuUnfoldOutlined, AppstoreOutlined, UserOutlined} from '@ant-design/icons'
import Router from './router'
import routerConfig from './routerConfig'
import './index.less';

const {Sider, Header,Content} = Layout;
const {SubMenu} = Menu;

class Home extends Component {
	constructor(props) {
		super(props);

		this._trigger = this._trigger.bind(this);
		this._getMenus = this._getMenus.bind(this);
		this._getOpenKes = this._getOpenKes.bind(this);
		this._onOpenChange = this._onOpenChange.bind(this);
		this._onSelect = this._onSelect.bind(this);
		this._getRootSubmenKeys = this._getRootSubmenKeys.bind(this);
		this._logout = this._logout.bind(this);
		this._resetPassword = this._resetPassword.bind(this);
		this._updatePassword = this._updatePassword.bind(this);

		this.state = {
			collapsed: false, //当前侧边栏收起状态
			openKeys: this._getOpenKes() || ['welcome'], //当前展开的SubMenu菜单项key数组
			rootSubmenuKeys: this._getRootSubmenKeys(menus) || [],
			isShowResetPasswrod: false
		}
	}

	_trigger() {
		this.setState({
			collapsed: !this.state.collapsed
		})
	}

	_getRootSubmenKeys(menus) {
		let rootSubmen = [];
		for(let i=0; i<menus.length; i++) {
			menus[i]['url'] ? rootSubmen.push(menus[i]['url']) : null;
		}
		return rootSubmen;
	}

	// 递归生成菜单
	_getMenus(menus) {
	    return menus.map((item) => {
	      	if (item.children) {
		        return (
		          	<SubMenu
			            key={item.url}
			            title={<span><AppstoreOutlined /><span>{item.name}</span></span>}
			        >
		           		{this._getMenus(item.children)}
		          	</SubMenu>
		        )
	      	}
	      	return (
		        <Menu.Item key={item.url}>
		          	<Link to={item.url}>
		            	<AppstoreOutlined /><span>{item.name}</span>
		          	</Link>
		        </Menu.Item>
	      	)
	    })
	}

	_getOpenKes() {
		let pathname = location.pathname;
		if(pathname.substring(1, pathname.length)) {
			let pathArr = pathname.split('/');
			pathArr.shift();
			pathArr.pop();
			return pathArr;
		}
	}

	_onSelect({ key }) {
		//通过key来判断当前菜单是否被subMenu包裹
		let arr = key.split('/');
		if(arr.length === 2) {
			this.setState({
				openKeys: []
			})
		}
	}

	_onOpenChange(openKeys) {
		const that = this;
	    const latestOpenKey = openKeys.find(function(key) {
	    	return that.state.openKeys && that.state.openKeys.indexOf(key) === -1
	    });
	    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
	      	that.setState({ openKeys });
	    } else {
		    that.setState({
		        openKeys: latestOpenKey ? [latestOpenKey] : [],
		    });
	    }
	}

	_logout() {
		this.props.home.asyncUserLogout();
	}

	_resetPassword() {
		this.setState({
			isShowResetPasswrod: true,
		});
	}

	_updatePassword(values) {
		this.props.home.asyncUpdatePassword(values);
    }
    
    goLink = (item) => {
        if (item.link) {this.props.history.push(item.link)}
    }

	render() {
		//默认被选中的菜单
		let defaultSelectedKeys = [];
		let pathname = location.pathname;
		if(pathname.substring(1, pathname.length)) {
			let pathArr = pathname.split('/');
			let path = pathname.split('/');
			pathArr.shift();
			pathArr.pop();
			pathArr.push(pathname.replace(/\/((new)|(edit)|(detail))$/, '/list'));
			defaultSelectedKeys = pathArr;
		}

		//防止当菜单收起时，子菜单会停留在页面上，不消失
		let menuProps = !this.state.collapsed ? {
			openKeys: this.state.openKeys,
        	onOpenChange: this._onOpenChange
		} : {}

		let contentPadding = 15, contentMargin = 12;
		if(window.location.pathname && ['/welcome', '/permission'].indexOf(window.location.pathname) > -1) {
			contentPadding = 0;
			contentMargin = 0;
		}

		//获取用户名
		let username = Tools.getCookie('fullName');
		const menu = (
			<Menu>
			  <Menu.Item>
				<a onClick={this._resetPassword}>
					重置密码
				</a>
			  </Menu.Item>
			  <Menu.Item>
				<a onClick={this._logout}>
				  退出
				</a>
			  </Menu.Item>
			</Menu>
        );
        const breadcrumb = routerConfig.filter((item) => item.path === window.location.pathname)
		return (
			<Layout className="container">
				<Sider
					trigger= {null}
					collapsible
					collapsed= {this.state.collapsed}
					className="ant-layout-sider-ie9"
				>
					<div className="logoContainer" style={{overflow:'hidden'}}>
          				{this.state.collapsed ? '' : <span className="title" ref="memberTitle">DEMO</span>}
					</div>
					<Menu
						theme= "dark"
						mode= {this.state.collapsed ? 'vertical' : 'inline'}
						selectedKeys= {defaultSelectedKeys}
						onSelect= {this._onSelect}
						{...menuProps}
					>
						{this._getMenus(menus)}
					</Menu>
				</Sider>
				<Layout className="ant-layout-ie9">
					<Header className="header">
                        {!this.state.collapsed ? <MenuFoldOutlined onClick={this._trigger} /> : <MenuUnfoldOutlined onClick={this._trigger} />}
                        <Breadcrumb separator=">" style={{ margin: '16px 10px', display: 'inline' }}>
                            {breadcrumb.length !== 0 && breadcrumb[0].breadcrumbs.map((item) =>  <Breadcrumb.Item onClick={() => this.goLink(item)}>{item.name}</Breadcrumb.Item>)}
                        </Breadcrumb>
                        <div className="userContainer">
							<Dropdown overlay={menu} placement="bottomRight">
								<div className="userInfo" onMouseEnter={() => this.setState({isShowUserOption: true})}>
									<UserOutlined />
									<span>{username}</span>
								</div>
							</Dropdown>
			            	{this.state.isShowResetPasswrod &&
			            		<WrappedUpdatePassword
			            			visible={this.state.isShowResetPasswrod}
			            			handleCancel={() => this.setState({isShowResetPasswrod:false})}
			            			updatePassword={this._updatePassword}
			            		/>
			            	}
			            </div>
					</Header>
					<Layout style={{background:'#eee'}}>
						<Content style={{background:'#fff',padding:contentPadding,margin:contentMargin, minHeight:"auto", position:"relative"}}>
                           {Router.genRouter()}
                        </Content>
					</Layout>
				</Layout>
			</Layout>
		);
	}
}

export default connect(
	(state) => {
		return {
			homes: state.home,
		};
	},
	(dispatch) => (dispatch) => {
		return {
			home: dispatch.home
		};
	}
)(Home);
