import { get } from './request';

const getList = (data: object) => {
  return get('api/admin/user/list', data);
};

export default {
  getList,
};
