import { get, post } from './request';

const getList = (data: object) => {
  return get('api/admin/topic/list', data);
};

const getDetail = (data: object) => {
  return get('api/admin/topic/detail', data);
};

const add = (data: object) => {
  return post('api/admin/topic/add', data);
};

const edit = (data: object) => {
  return post('api/admin/topic/edit', data);
};

const del = (data: object) => {
  return post('api/admin/topic/delete', data);
};

export default {
  getList,
  getDetail,
  add,
  edit,
  del,
};
