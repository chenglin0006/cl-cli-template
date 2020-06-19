import React, {Component} from 'react';
import {Form, Input, Button, Select, DatePicker, InputNumber, Checkbox, Switch} from 'antd';
import PropTypes from 'prop-types';
import './index.less';
const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;


export default class Edit extends Component {
    formRef = React.createRef()
    constructor(props) {
        super(props);
        this.state = {
            provinces: [],
            endDate: ''
        };
    }

    //联动下拉 获取子option，重置子selected
    resetSelect = (item, value) => {
        item.childSelectIds && item.childSelectIds.map((item) => {
            this.formRef.current.setFieldsValue({
                [item] : ''
            })
        })
        this.props.getOptionData(item, value)
    }

    _handelRegister = () => {
        this.formRef.current.validateFields().then(values => {
            let datas = this.props.newData;
            if (datas) {
                datas.forEach((data) => {
                    if (data.type === 'checkbox') {
                    let value = values[data.id];
                    values[data.id] = value ? 1 : 0;
                    }
                    if (data.type === 'switch') {
                    let value = values[data.id];
                    values[data.id] = value ? 1 : 0;
                    }
                    if (data.type === 'select') {
                    let value = values[data.id];
                    values[data.id] = value === 'undefined' ? undefined : value;
                    }
                });
            }
            this.props.submitData(values);
        }).catch(errors => {
            console.log(errors)
        })
    }

    _handleBack = () => {
        this.props.history.goBack();
    }

    _getFormItem = (option) => {
        switch (option.type) {
        case 'select':
            return (
            <Select>
                {option.isHidePleaseSelect ? null : <Option key="undefined" value="undefined">请选择</Option>}
                {option.data && option.data.map((item, key) => <Option key={key} value={item.id}>{item.name}</Option>)}
            </Select>
            );
            break;
        case 'datepicker':
            return <DatePicker format="YYYY-MM-DD"/>;
            break;
        case 'switch':
            return <Switch checkedChildren="是" unCheckedChildren="否"/>;
            break;
        case 'showTime':
            return <Input disabled placeholder={Tools.fmtDate(new Date())}/>;
            break;
        case 'showEndDate':
            return <Input disabled placeholder={this.state.endDate}/>;
            break;
        case 'textarea':
            return <TextArea rows={4}/>;
            break;
        case 'number':
            return <InputNumber min={option.min} max={option.max} placeholder={option.placeholder} style={option.styles}/>;
            break;
        case 'checkbox':
            return <Checkbox/>;
            break;
        default:
            return <Input placeholder={option.placeholder} disabled={option.isDisabled} type={option.type == 'password' ? 'password' : ''}/>;
        }
    }

    _getFields = () => {
        return this.props.filterData.map((option, i) => {
            if (option.isHide === 'true') {//隐藏的条目
                return (
                    <div key={i} style={{display: 'none'}}></div>
                );
            } else if (option.type === 'cascader') {
                return option.linkage && option.linkage.map((item) => {
                    return <FormItem key={item.id} label={item.name} name={item.id} rules={item.rules}>
                        <Select allowClear onSelect={(value) => this.resetSelect(item, value)}>
                            {item.data && item.data.map((select, key) => {
                                return <Option key={key} value={ select[item.selectKey] || select.id || select.code}>{select.name}</Option>
                            })}
                        </Select>
                    </FormItem>
                })
            } else if (option.type === 'checkbox') {
                return (
                    <FormItem label={option.name} valuePropName="checked" key={i} name={option.id} rules={option.rules}>
                        {this._getFormItem(option)}
                    </FormItem>
                );
            }
            return (
                <FormItem label={option.name} key={i} name={option.id} rules={option.rules}>
                    {this._getFormItem(option)}
                </FormItem>
            );
        });
    }

    render() {
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 7 },
            },
        };
        return (
            <Form
                {...formItemLayout}
                layout={'horizontal'}
                className="new-form"
                ref={this.formRef}
                initialValues={this.props.initialVal}
                onFinish={this._handelRegister}
            >
                {this._getFields()}
                <div className='btnItem'>
                    <Button type="primary" htmlType="submit">提交</Button>
                    {this.props.isHideResetBtn ? '': <Button className="reset" onClick={this._handleBack}>返回</Button>}
                </div>
            </Form>
        );
    }
}

Edit.propTypes = {
    filterData: PropTypes.arrayOf(PropTypes.object),
    submitData: PropTypes.func,
    getOptionData: PropTypes.func,
    history: PropTypes.object,
    initialVal: PropTypes.object
}
