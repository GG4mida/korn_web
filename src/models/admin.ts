import produce from 'immer';
import adminService from '@/services/admin';
import { ResponseCode, StorageKey } from '@/constant';
import IResponse from '@/types/response';
import Storage from '@/utils/storage';

const AdminModel = {
  namespace: 'admin',
  state: {
    profile: {},
  },
  effects: {
    *getProfile({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(adminService.getProfile, payload);
      const { code, content } = data;
      if (ResponseCode.SUCCESS === code) {
        yield put({
          type: 'setProfile',
          payload: content,
        });
      }
      return data;
    },
    *login({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(adminService.login, payload);
      const { code, content } = data;
      if (ResponseCode.SUCCESS === code) {
        Storage.setItem(StorageKey.AUTHTOKEN, content);
      }
      return data;
    },
    *logout({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(adminService.logout, payload);
      yield put({
        type: 'resetState',
      });
      return data;
    },
  },

  reducers: {
    setProfile(state: any, action: any) {
      return produce(state, (draftState: any) => {
        draftState.profile = action.payload;
      });
    },
    resetState(state: any, action: any) {
      return {
        profile: {},
      };
    },
  },
};

export default AdminModel;
