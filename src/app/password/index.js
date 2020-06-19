import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons'
import sha1 from 'js-sha1';
const FormItem = Form.Item;
class UpdatePassword extends Component {
    formRef = React.createRef()
	constructor(props) {
		super(props);

		this._updatePasswordHandle = this._updatePasswordHandle.bind(this);
		this._handleCancel = this._handleCancel.bind(this);

		this.state = {
			visible: this.props.visible || false
		}
	}

	_updatePasswordHandle() {
        this.formRef.current.validateFields().then(values => {
            this._handleCancel();
            for(let i in values) {
                values[i] = sha1(values[i]);
            }
            this.props.updatePassword(values);
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
	}

	_handleCancel() {
		this.setState({visible: false});
		this.props.handleCancel();
	}

	render() {
		return (
			<Modal
	          	title= "密码重置"
	          	visible= {this.state.visible}
	          	onOk= {this._updatePasswordHandle}
	          	onCancel= {this._handleCancel}
	        >
	          	<Form ref={this.formRef}>
	          		<FormItem name="oldPassword" rules={[{ required: true, message: '旧密码不能为空!' }]}>
                      <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入旧密码" autoComplete="true" />
			        </FormItem>
			        <FormItem name="password" rules={[{ required: true, message: '新密码不能为空!' }]}>
                        <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入新密码" autoComplete="true"/>
			        </FormItem>
			        <FormItem name="confirmPassword" rules={[{ required: true, message: '再次输入新密码不能为空!' }]}>
                        <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请再次输入新密码" autoComplete="true"/>
			        </FormItem>
	          	</Form>
	        </Modal>
		);
	}
}

const WrappedUpdatePassword = UpdatePassword;
export default WrappedUpdatePassword;
