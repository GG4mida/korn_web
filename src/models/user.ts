import produce from 'immer';
import { ResponseCode } from '@/constant';
import IResponse from '@/types/response';
import userService from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    list: [],
  },
  effects: {
    *getList({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(userService.getList, payload);
      const { code, content } = data;
      if (ResponseCode.SUCCESS === code) {
        yield put({
          type: 'setList',
          payload: content,
        });
      }
      return data;
    },
  },
  reducers: {
    setList(state: any, action: any) {
      return produce(state, (draftState: any) => {
        draftState.list = action.payload;
      });
    },
  },
};

export default UserModel;
