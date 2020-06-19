import * as React from 'react';
import { Tag, Button } from 'antd';
import classnames from 'classnames';
import style from './style.module.less';

export default class PasteBoard extends React.Component {
    constructor(props) {
        super(props);
        this.onPaste = this.onPaste.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onOk = this.onOk.bind(this);
        this.state = {
            text: this.props.text
        }
    }

    onDelete(e) {
        const val = this.state.text.split(',') || [];
        const temp = val.filter((_val) => _val !== e).join(',');
        this.setState({
            text: temp
        });
    }

    onClear() {
        this.setState({
            text: ''
        })
    }

    onOk() {
        this.props.update(this.state.text)
    }

    onPaste(e) {
        const val = e.clipboardData.getData('text').replace(/\n/g,",").split('，').join(',');
        let pasteVal= val.split(',').filter((item) => {
            if (item && item.trim()) {
                return item
            }
        }).join(',')
        let repeatVal = this.state.text ? `${this.state.text},${pasteVal}` : pasteVal
        let finallyVal = [...new Set(repeatVal.split(','))]
        this.setState({
            text: finallyVal ? finallyVal.join(',') : ''
        })
    }

    renderTag(data = []) {
        return data&&data.filter((_data) => _data && _data !== '').map((_data) => (<Tag closable onClose={() => { this.onDelete(_data) }} key={_data}>{ _data }</Tag>))
    }

    render() {
        return (
            <div>
                <div className={classnames({
                    "ant-input": true,
                    [style.PasteBoard] : true
                })} onPaste={this.onPaste}>
                    { this.renderTag(this.state.text&&this.state.text.split(',')) }
                </div>
                <div className={style.PasteBoardBtn}>
                    <Button className={style.PasteBoardBtnOk} type="primary" onClick={this.onOk}>确认</Button>
                    <Button className={style.PasteBoardBtnClear} onClick={this.onClear}>清除</Button>
                </div>
            </div>
        )
    }
}