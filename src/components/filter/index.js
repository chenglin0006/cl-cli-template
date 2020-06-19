import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import Icon from '@ant-design/icons'
import PasteInput from '../paste/index';
import './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

export default class Filter extends Component {
    formRef = React.createRef()
	constructor(props) {
		super(props);
    }
	_handleSearch = (values) => {
		this.props.handleSearch(values);
	}

	_handleReset = () => {
        this.props.handleReset();
        const values = {}
        this.props.filterData.map((item) => {
            if(item.type !== 'cascader') {
                values[item.id] = ''
            }else {
                item.linkage.map((link) => {
                    values[link.id] = ''
                })
            }
        })
        this.formRef.current.setFieldsValue(values);
    }
    
    // 支持中文'，'
    onPasteChange = (e) => {
        if (e && e.target && e.target.value) {
            e.target.value = e.target.value.split('，').join(',')
            let endsFlag = e.target.value.endsWith(',')
            let startsFlag = e.target.value.startsWith(',')
            e.target.value = e.target.value.split(',').filter((item) => {
                if (item && item.trim()) {
                    return item
                }
            }).join(',')
            if (endsFlag && !startsFlag){
                e.target.value = e.target.value + ','
            }
            
        }
    }
    onInputPasteBlur =(e, id) => {
        if (e && e.target && e.target.value) {
            e.target.value = e.target.value.split(',').filter((item) => {
                if (item && item.trim()) {
                    return item
                }
            }).join(',')
            this.formRef.current.setFieldsValue({
                [id] : [...new Set(e.target.value.split(','))].join(',')
            })
        }
    }

    //联动下拉 获取子option，重置子selected
    resetSelect = (item, value) => {
        item.childSelectIds && item.childSelectIds.map((item) => {
            this.formRef.current.setFieldsValue({
                [item] : ''
            })
        })
        this.props.handleChange(item, value)
    }

	_getFormItem(option) {
		const allowClear = option.allowClear || true
		const { showTime = true }= option;
        let formatStr = 'YYYY-MM-DD HH:mm:ss';
        if(!showTime) {
            formatStr = 'YYYY-MM-DD'
        }
		switch (option.type) {
            case 'select':
                return (
                    <Select
                        filterOption={option.showSearch?(input, options) => options.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0:null}
                        showSearch={option.showSearch || false}
                        mode={option.mode}
                        onSearch={option.handleSearch}
                        onFocus={option.onFocus}
                        onSelect={option.onSelect}
                        notFoundContent={option.notFoundContent}
                        allowClear={allowClear}
                        placeholder={option.placeholder}
                        optionFilterProp="children"
                        onChange={(value)=>{option.onChange&&option.onChange(value,this.props.form)}}
                        getPopupContainer={triggerNode => triggerNode.parentElement}
                    >
                        {option.data && option.isHidePleaseSelect ? null : <Option key="undefined" value="undefined">全部</Option>}
                        {option.data && option.data.map((item, key) => <Option key={key} value={item[option.selectKey] || item.id || item.code}>{item.name}</Option>)}
                    </Select>
                );
                break;
            case 'datepicker':
                return <RangePicker showTime={showTime} format={formatStr}/>;
                break;
            case 'datepickerSingle':
                return <DatePicker showTime={showTime} format={formatStr}/>;
                break;
            case 'pasteInput':
                return <PasteInput onBlur={(e) => this.onInputPasteBlur(e, option.id)} onChange={this.onPasteChange}/>    
            case 'treeSelect':
                if (option && option.data && option.data.length > 0) {
                    return (
                        <TreeSelect
                            placeholder="请选择"
                            allowClear
                            treeData={option.data}
                            showSearch={option.showSearch}
                            searchPlaceholder={option.searchPlaceholder}
                            treeNodeFilterProp={option.treeNodeFilterProp||'title'}
                            dropdownClassName={option.dropdownClassName || 'common-tree-drop-div'}
                            treeCheckable={true}
                            filterTreeNode={(input, treeNode)=>{
                                let filterName = option.treeNodeFilterProp||'title';
                                if(treeNode.props[filterName].toLowerCase().indexOf(input.toLowerCase()) > -1){
                                    return treeNode
                                }
                            }}
                        >
                        </TreeSelect>
                    )
                    break
                }
            default:
				return <Input  placeholder={option.placeholder}/>;
		}
	}

	_getFields = () => {
		const {filterData} = this.props;
		return filterData && filterData.map((option, i) => {
            if (option.type === 'cascader') {
                return option.linkage && option.linkage.map((item) => {
                    return <FormItem key={item.id} label={item.name} name={item.id} rules={item.rules}>
                        <Select allowClear onSelect={(value) => this.resetSelect(item, value)}>
                            {item.data && item.data.map((select, key) => {
                                return <Option key={key} value={ select[item.selectKey] || select.id || select.code}>{select.name}</Option>
                            })}
                        </Select>
                    </FormItem>
                })
            } else {
                return (
                    <FormItem key={i} label={option.name} name={option.id} rules={option.rules}>
                        {this._getFormItem(option)}
                    </FormItem>
                );
            }
		});
	}

	render() {
		return (
			<Form
                layout={"inline"}
                className="filter-form"
                initialValues={this.props.initialVal}
                ref={this.formRef}
                onFinish={this._handleSearch}
				>
                {this._getFields()}
                <Form.Item>
                    <Button type="primary" htmlType="submit">搜索</Button>
					<Button className="reset" onClick={this._handleReset}>重置</Button>
                    {this.props.exportBtn && <Button type="default" onClick={this.props.exportBtn.action}>{this.props.exportBtn.loading ? <Icon type="loading" /> : '导出'}</Button>}
                </Form.Item>
			</Form>
		);
	}
}

Filter.propTypes = {
	filterData: PropTypes.arrayOf(PropTypes.object),
	handleSearch: PropTypes.func,
	handleReset: PropTypes.func
}