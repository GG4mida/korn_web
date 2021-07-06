import { get, post } from './request';

const getList = (data: object) => {
  return get('api/admin/resource/list', data);
};

const add = (data: object): any => {
  return post('api/admin/resource/add', data, {
    'Content-Type': 'multipart/form-data',
  });
};

const del = (data: object): any => {
  return post('api/admin/resource/del', data);
};

export default {
  getList,
  add,
  del,
};
