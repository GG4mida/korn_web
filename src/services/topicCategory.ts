import { get, post } from './request';

const getList = (data: object): any => {
  return get('api/admin/topic/category/list', data);
};

const getDetail = (data: object): any => {
  return get('api/admin/topic/category/detail', data);
};

const add = (data: object): any => {
  return post('api/admin/topic/category/add', data);
};

const edit = (data: object): any => {
  return post('api/admin/topic/category/edit', data);
};

const del = (data: object): any => {
  return post('api/admin/topic/category/delete', data);
};

export default {
  getList,
  getDetail,
  add,
  edit,
  del,
};
