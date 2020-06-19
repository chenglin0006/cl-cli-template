/*
 * @Descripttion: descripttion
 * @Author: guangyi.zhang
 * @Date: 2020-02-10 09:36:26
 * @LastEditTime: 2020-04-20 16:57:00
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import provider_zhCN from 'antd/es/locale/zh_CN';
import Login from './app/login/index';
import Home from './app/home/index';

const Routes = () => {
	return (
		<Router>			
			<Switch>
				<Route path="/login" component={Login} />
				<Route path="/" component={Home} />			
			</Switch>
		</Router>
	);
}

ReactDOM.render(
	<ConfigProvider locale={provider_zhCN}>
		<Provider store={store}>
			<Routes />
		</Provider>
	</ConfigProvider>,
	document.getElementById('app')
);
