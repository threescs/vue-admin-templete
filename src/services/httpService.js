import axios from 'axios';
import * as cookieUtil from '@/utils/cookieUtil';

const Promise = require("bluebird");
// var qs = require('qs');
// 添加响应拦截器
// axios.interceptors.request.use(config => {

//   return config
// }, error => {
//   return Promise.reject(error)
// })

// axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function httpReq(method, url, params, data, auth, contentType) {
  const token = cookieUtil.get("token") || "";
  // var token = "eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJ6aXAiOiJERUYiLCJhbGciOiJSUzUxMiJ9.eNpMzrkOgzAQBNB_2RpFGGIIrtJQRMpVJEXKxTbIwgcyJocQ_x4klKPcN6PRjuAl6iMaCcwOWkeAdwzor15_wLhK6V8shArKWdQ7Wztg4xSBEsCAYk1oEWdVUhDMs0TwfJ0iqSGC3g2efxeGXvrLq5tvKA_n_elWlrDo8gY80DadtM2s8tkBIzQllG5yEs9gUOm_ztY4L4PirQz9ijsD0xsAAP__.JapfYGN8i8gS_N3sELuIuuCgM9RAt0f9EjQD2IvaKUtbz5VJwX0g_U3WuXQoAcZbFpu7zwx_DCOdkOXv9ro4EwyOVpyf2iCvnnxYfedUF_JGhG-FdrTOqho_TxCMi9GWbvYOT6qhRMlEJACWoKknsgGGdJg6X84g3XpVZ4AGLTY";
  if (auth && !token) {
    const domain = window.location.host;
    alert("登录已过期,请重新登录");
  }
  if (!method || !url) {
    return Promise.reject("请求方法和请求链接不能为空");
  }
  return new Promise((resolve, reject) => {
    axios(url, {
      method,
      timeout: 30000,
      params,
      data,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': contentType || 'application/json;charset=UTF-8',
        product: 'admin',
        'access-token': token,
      },
    }).then((res) => {
      if (res.status == 200) {
        if (res.data && res.data.errorCode == 10003) {

        }
        resolve(res.data);
      } else {
        reject(res);
      }
    }).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}

function httpGet(url, params, token) {
  return httpReq(
    'get',
    url,
    params, {},
    token,
  );
}

function httpPost(url, data, token) {
  return httpReq(
    'post',
    url, {},
    data,
    token,
  );
}

function httpPut(url, data, token) {
  return httpReq(
    'put',
    url, {},
    data,
    token,
  );
}

function httpDelete(url, data, token) {
  return httpReq(
    'delete',
    url, {},
    data,
    token,
  );
}

function httpPatch(url, params, token) {
  return httpReq(
    'patch',
    url,
    params, {},
    token,
  );
}

function httpAll() {}

export default {
  httpReq,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  httpPatch,
  httpAll,
};
