/*
 * @Descripttion: descripttion
 * @Author: guangyi.zhang
 * @Date: 2020-01-13 14:27:13
 * @LastEditTime: 2020-03-23 15:28:03
 */
import * as React from 'react';
import { Modal, Input } from 'antd';
import Icon from '@ant-design/icons'
import PasteBoard from './PasteBoard';

export default class PasteInput extends React.Component {
    constructor(props) {
        super(props);
        this.copyInput = this.copyInput.bind(this);
        this.colseInput = this.colseInput.bind(this);
        this.state = {
            visible: false
        }
    }

    copyInput() {
        this.setState({
            visible: !this.state.visible
        })
    }

    colseInput(val = '') {
        this.setState({
            visible: !this.state.visible,
        })
        this.props.onChange(val);
    }
    render() {
        return [
            <Modal key="PasteInputModal" closable={false} destroyOnClose={true} visible={this.state.visible} footer={null}>
                <PasteBoard update={this.colseInput} text={this.props.value}/>
            </Modal>,
            <Input key="PasteInput" addonAfter={<Icon type="plus" onClick={this.copyInput} />} onPaste={() => { return false; }}  {...this.props} />
        ]
    }
}