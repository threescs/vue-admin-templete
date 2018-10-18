import axios from 'axios';
import * as sessionStorageUtil from './sessionStorageUtil';
import * as adapterStorageUtil from './adapterStorageUtil';
import { obj2query, extend } from './objectUtil';


function getURL(path) {
  if (!path) return;
  const PrefixUrl = window.location.hostname;
  const startStr = path.indexOf('?') > -1 && path.indexOf('=') > -1 ? '&' : '?';
  return `${PrefixUrl}${path}${startStr}time=${(new Date()).getTime()}&src=m_web`;
}

function getSessionToken() {
  return adapterStorageUtil.get('token');
}
function httpReq(method, url, params, data, authFlag, customHeaders) {
  console.log(`开始请求:${url}`);
  const token = getSessionToken();

  if (!method || !url) {
    return Promise.reject(new Error('请求方法和请求链接不能为空'));
  }
  // 创建一个 Request 对应，自定义 Headers

  const options = {
    method,
    timeout: 6000,
    params,
    data,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json;charset=UTF-8',
      product: 'admin',
      'access-token': token,
    },
  };
  if (method && /post/i.test(method) && customHeaders) {
    options.headers['Content-Type'] = customHeaders['Content-Type'] || 'application/x-www-form-urlencoded';
  }
  return new Promise((resolve, reject) => {
    axios(getURL(url), options).then((res) => {
      if (typeof res === 'string') {
        resolve(res);
      } else if (res.statusCode >= 0) {
        resolve(res);
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

function transformResponseHeader(headers) {
  // 保存后台接口响应的的header
  if (headers.get('savedate')) {
    adapterStorageUtil.set('save_date', headers.get('savedate'));
  }
}
/**
 * post JSON请求
 *
 * @param {*} url 请求链接
 * @param {*} data 请求参数
 * @param {*} authFlag 授权标志位
 */
function httpPostJSON(url, data, authFlag) {
  return httpReq('post', url, {}, data, authFlag, { 'Content-Type': 'application/x-www-form-urlencoded' });
}
/**
 * post 请求
 *
 * @param {*} url 请求链接
 * @param {*} data 请求参数
 * @param {*} authFlag 授权标志位
 */
function httpPost(url, data, authFlag) {
  return httpReq('post', url, {}, data, authFlag);
}

/**
 *get请求
 *
 * @param {*} url 请求链接
 * @param {*} params 请求参数
 * @param {*} authFlag 授权标志位
 */
function httpGet(url, params, authFlag) {
  return httpReq('get', url, params, {}, authFlag);
}

/**
 * put请求 类似Get 参数放在url 上，更新
 *
 * @param {*} url 请求链接
 * @param {*} params 请求参数
 * @param {*} authFlag 授权标志位
 */
function httpPut(url, params, authFlag) {
  return httpReq('put', url, params, {}, authFlag);
}

/**
 * 此处换个名字，因为delete 是关键字
 *
 * @param {*} url 请求链接
 * @param {*} params 请求参数
 * @param {*} authFlag 授权标志位
 */
function httpDelete(url, params, authFlag) {
  return httpReq('delete', url, params, {}, authFlag);
}

export {
  httpPostJSON,
  httpPost,
  httpGet,
  httpPut,
  httpDelete,
};
