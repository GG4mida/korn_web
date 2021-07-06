import axios from 'axios';
import { message } from 'antd';
import { ResponseCode, StorageKey } from '@/constant';
import Storage from '@/utils/storage';

enum RequestMethod {
  POST = 'post',
  GET = 'get',
}

const showMessage = (text: string) => {
  message.error(text);
};

axios.interceptors.request.use(
  (config) => config,
  (error) => {
    showMessage('接口请求异常，请联系系统管理员。');
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (!data) {
      showMessage('接口请求异常，请联系系统管理员。');
      return Promise.reject();
    }
    const { code, content } = data;
    if (code === ResponseCode.FAILED) {
      showMessage(content);
    } else if (code === ResponseCode.NOAUTH) {
      window.location.href = content;
    }
    return data;
  },
  (error) => {
    showMessage('接口请求异常，请联系系统管理员。');
    return Promise.reject(error);
  },
);

const request = (method: any, url: any, data: any, headers: object = {}) => {
  const authorizationCode = Storage.getItem(StorageKey.AUTHTOKEN);
  const requestConfig: any = {
    method: method,
    url: url,
    timeout: 10000,
    responseType: 'json',
    headers: {
      Authorization: authorizationCode,
      ...headers,
    },
  };
  if (method === RequestMethod.POST) {
    requestConfig.data = data;
  }
  if (method === RequestMethod.GET) {
    requestConfig.params = data;
  }
  return axios(requestConfig);
};

const get = (url: string, data: object, headers: object = {}) => {
  return request(RequestMethod.GET, url, data, headers);
};

const post = (url: string, data: object, headers: object = {}) => {
  return request(RequestMethod.POST, url, data, headers);
};

export { request, get, post };
