import { get, post } from './request';

const getProfile = (data: object) => {
  return get('api/admin/profile', data);
};

const login = (data: object): any => {
  return post('api/admin/login', data);
};

const logout = (data: object): any => {
  return get('api/admin/logout', data);
};

export default {
  getProfile,
  login,
  logout,
};
