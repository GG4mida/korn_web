import produce from 'immer';
import { ResponseCode } from '@/constant';
import IResponse from '@/types/response';
import resourceService from '@/services/resource';

const ResourceModel = {
  namespace: 'resource',
  state: {
    list: [],
  },
  effects: {
    *getList({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(resourceService.getList, payload);
      const { code, content } = data;
      if (ResponseCode.SUCCESS === code) {
        yield put({
          type: 'setList',
          payload: content,
        });
      }
      return data;
    },
    *add({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(resourceService.add, payload);
      return data;
    },
    *del({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(resourceService.del, payload);
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

export default ResourceModel;
