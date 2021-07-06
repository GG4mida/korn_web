import { get } from './request';

const getInfo = (data: object) => {
  return get('api/admin/system/info', data);
};

export default {
  getInfo,
};
