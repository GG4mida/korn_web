import produce from 'immer';
import { ResponseCode } from '@/constant';
import IResponse from '@/types/response';
import systemService from '@/services/system';

const SystemModel = {
  namespace: 'system',
  state: {
    info: {},
  },
  effects: {
    *getInfo({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(systemService.getInfo, payload);
      const { code, content } = data;
      if (ResponseCode.SUCCESS === code) {
        yield put({
          type: 'setInfo',
          payload: content,
        });
      }
      return data;
    },
  },
  reducers: {
    setInfo(state: any, action: any) {
      return produce(state, (draftState: any) => {
        draftState.info = action.payload;
      });
    },
  },
};

export default SystemModel;
