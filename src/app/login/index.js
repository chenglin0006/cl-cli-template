/*
 * @Descripttion: descripttion
 * @Author: guangyi.zhang
 * @Date: 2020-02-10 09:36:26
 * @LastEditTime: 2020-03-19 09:22:56
 */
import React, { Component } from 'react';
import sha1 from 'js-sha1';
import Toast from '../../components/prompt/toast';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LockImage from '../../images/icon_lock.png';
import PhoneImage from '../../images/icon_phone.png';
import './index.less';
class Login extends Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);

		this.state = {
			username: '',
			password: '',
		}
	}

	login() {
		let username = this.state.username;
		let password = sha1(this.state.password);
		this.props.login.asyncLogin(username, password);
	}

	handleUserChange(e) {
		let value = e.target.value;
		this.setState({
			username: value
		})
	}

	handlePasswordChange(e) {
		let value = e.target.value;
		this.setState({
			password: value
		})
	}

	render() {
		return (
			<div className="login">
				<div className="bg"></div>
				<div className="loginContainer">
					<div className="inputContainer">
						<img htmlFor="username" src={PhoneImage} alt="用户名" />
						<input type="text" id="username" placeholder="请输入用户名" value={this.state.username} onChange={this.handleUserChange.bind(this)} />
					</div>
					<div className="inputContainer">
						<img htmlFor="password" src={LockImage} alt="密码" />
						<input type="password" id="password" placeholder="请输入密码"  value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
					</div>
					<button onClick={this.login}>登录</button>
				</div>
			</div>
		);
	}
}

export default connect(
	(state) => {
		return {}
	},
	(dispatch) => {
		return {
			login: dispatch.login
		}
	}
)(Login);
