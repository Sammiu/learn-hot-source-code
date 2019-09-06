'use strict';
import Qs from 'qs';
import axios from 'axios';
import {message, Modal} from 'antd'

let interceptorsStatus = 'none';
const MAPPING_INTERCEPTORS_CODE = {1001: true, 1002: true, 1003: true};

export default class BaseService {

    /**
     * 统一处理网络异常
     * @param {Function} reject 请求被拒绝回调函数
     * @param {Object} reason 被拒绝的原因
     * @param {boolean} handleError 是否自己处理异常
     *
     * @return {void}
     **/
    static handleNetworkError(reject, reason, handleError) {
        if (!handleError) {
            message.error(reason.message || '网络错误,请稍后重试');
        }
        reject && reject(reason);
    }

    /**
     * 统一处理 java 接口新的数据格式
     * @param {Promise} httpRequest 请求promise 对象
     * @param {boolean} handleError 是否自己处理异常
     *
     * @return {Promise} 返回promise 对象
     **/
    static processRequest(httpRequest: Promise, handleError: boolean) {
        return new Promise((resolve, reject) =>
            httpRequest.then(response => {
                const item = response.data;
                if (response.status === 200) {
                    if (item.success) {
                        resolve(item.result);
                        interceptorsStatus = 'none'
                    } else {
                         BaseService.handleNetworkError(reject, item.error, handleError)
                    }
                } else {
                    BaseService.handleNetworkError(reject, new Error('网络访问异常', handleError));
                }
            }, reason => BaseService.handleNetworkError(reject, reason, handleError))
                .catch(e => BaseService.handleNetworkError(reject, e, handleError))
        )
    }


    /**
     * 登录拦截器
     *
     * @param {string} msg 异常消息
     * */
    static loginInterceptors(msg: string): void {
        if (interceptorsStatus === 'none') {
            store.clearAuthorToken();
            interceptorsStatus = 'processing';
            Modal.warning({
                title: '提示',
                content: msg,
                onOk() {
                   
                }
            });
        }
    }

    /**
     * 清除登录拦截状态
     * */
    static clearloginInterceptorsStatus() {
        interceptorsStatus = 'none'
    }

    /**
     * 以get方式提交数据
     *
     * @param {String} url 接口地址
     * @param {Object} params 需要提交的参数
     * @param {boolean} handleError 是否自己处理异常
     **/
    get(url: string, params: Object, handleError: boolean = false): Promise {
        return BaseService.processRequest(axios.get(url, {
            params: params,
            headers: BaseService.getHeaders()
        }), handleError)
    }

    /**
     * 以post方式提交数据
     * @param {String} url 接口地址
     * @param {Object} params 需要提交的参数
     * @param {boolean} handleError 是否自己处理异常
     **/
    post(url, params, handleError: boolean = false): Promise {
        const option = {url: url, method: 'post', data: params, headers: BaseService.getHeaders()};
        return BaseService.processRequest(axios(option), handleError)
    }

    /**
     * 以访问表单的格式提交数据
     *
     * @param {String} url 接口地址
     * @param {Object} params 需要提交的参数
     * @param {boolean} handleError 是否自己处理异常
     **/
    postWithForm(url, params, handleError: boolean = false): Promise {
        const headers = Object.assign({
            'Content-Type': 'application/x-www-form-urlencoded'
        }, BaseService.getHeaders());

        const option = {url: url, method: 'post', data: Qs.stringify(params), headers: headers};
        return BaseService.processRequest(axios(option), handleError);
    }

    /**
     * 以访问表单的格式提交数据
     *
     * @return {Object} Http 自定义头部信息
     **/
    static getHeaders(): Object {
        return {
         
        }
    }
}
