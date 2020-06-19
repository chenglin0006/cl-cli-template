/* jshint esversion: 6 */
import { Popover, message }  from 'antd';
import moment from 'moment';
import React from "react";

export default class Tools {
    /**
     * 对下拉菜单的数据进行处理，以满足Select公共控件对于字段的要求
     * MakeSearch中select的字段类型为[name, id]
     * @param data 原始数据
     * @param maps 字段匹配配置 {key: [] || '' }
     *  key为数组时，按照数组中拿到的第一个有数据的字段来处理
     *  例如后端数据格式为{ name: xxx, id: 1, code: 'x111'}
     *  传入maps {id: ['code', id]} 则在后端数据code有值时使用code code无数据时使用id
     * @returns {{name: *, id: *}[]}
     */
    static mapSelect = (data = [], maps = {}) => {
        return data.map((item) => {
            let name = 'name';
            let id = 'id';
            if (Array.isArray(maps.name)) {
                name = maps.name.find((findItem) => {
                    return Boolean(item[findItem]);
                });
            } else if (typeof maps.name === 'string') {
                name = maps.name;
            }
            if (Array.isArray(maps.id)) {
                id = maps.id.find((findItem) => {
                    return Boolean(item[findItem]);
                });
            } else if (typeof maps.id === 'string') {
                id = maps.id;
            }
            return {
                name: item[name],
                id: item[id],
            };
        });
    };
    /**
     * 生成tabal的columns方法
     * @param options  [{
     *     name: string.isRequired
     * }]，需传递name dataindex
     * @returns {*}
     */
    static genTableOptions = (options) => {
        return options.map((item) => {
            return {
                ...item,
                title: item.name,
                dataIndex: item.dataindex,
                key: item.dataindex,
                width: item.width || 120,
                className: 'tableStyle',
                render: typeof item.render === 'function' && item.render,
            };
        });
    };

    static createUrl = (request) => {
        let { url } = request;
        const { param } = request;

        if (param) {
            url = !url.includes('?') && `${url}?`;
            for (const key of Object.keys(param)) {
                url = `${url + key}=${encodeURI(param[key])}&`;
            }
            if (url.endsWith('&')) {
                url = url.substring(0, url.length - 1);
            }
        }
        return url;
    };

    //处理超过多少字省略,text-文案，maxLength-允许最长的字符数，placement气泡框位置，styleObject气泡框样式
    static spanTitleDeal = (text, maxLength, argms = {
        styleObject: {},
        placement: '',
    })=>{
        let value = text;
        if (text && text.length > maxLength) {
            value = text.substring(0, maxLength) + '...';
        }
        let isShowTitle = text && text.length > maxLength;
        let baseStyle = { width:'200px', wordBreak:'break-all' };
        let style = Object.assign(
            {},
            baseStyle,
            argms.styleObject || {}
            );
        return (
            isShowTitle
                ? <Popover
                    content={text}
                    placement={argms.placement}
                    overlayStyle={style}
                    {...argms}
                >
                    <span>{value}</span>
                </Popover>
                : <span>{text}</span>
        );
    };


    static getUrlArg = (name, isSearchFromCookies) => {
        let { search } = window.location;
        // IE9(通过window.history.replaceState来判断IE9和其他浏览器，不考虑IE8及以下浏览器)时，search的值从cookie中获取
        if (isSearchFromCookies && !window.history.replaceState) {
            search = unescape(getCookie('CURRENT_SEARCH'));
        }
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
        const arg = search.substr(1).match(reg);
        return arg ? arg[2] : '';
    };

    static getCookie = (cookieName) => {
        const cookieStr = decodeURI(document.cookie);
        const arr = cookieStr.split('; ');
        let cookieValue = '';
        for (let i = 0; i < arr.length; i++) {
            const temp = arr[i].split('=');
            if (temp[0] == cookieName) {
                cookieValue = temp[1];
                break;
            }
        }
        return decodeURI(cookieValue);
    };

    static setCookie = (name, value, time) => {
        const times = time ? time * 1000 : 30 * 24 * 60 * 60 * 1000;
        console.info(times);
        const exp = new Date();
        exp.setTime(exp.getTime() + times);
        document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
    };

    static delCookie = (name) => {
        const exp = new Date();
        exp.setTime(exp.getTime() - 1);
        const cval = getCookie(name);
        if (cval != null) {
          document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+";path=/";
        }   
    }

    static fmtDate= (obj) =>{
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
    };

    static getStringFromDate = (date, format) => {
        return moment(date).format(format)
    }

    static getNumberFromDate = (date) => {
        return moment(date).valueOf()
    }

}
