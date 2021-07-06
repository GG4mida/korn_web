import produce from 'immer';
import { ResponseCode } from '@/constant';
import topicService from '@/services/topic';
import IResponse from '@/types/response';

const TopicModel = {
  namespace: 'topic',
  state: {
    list: [],
    detail: {},
  },
  effects: {
    *getList({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(topicService.getList, payload);
      const { code, content } = data;
      if (ResponseCode.SUCCESS === code) {
        yield put({
          type: 'setList',
          payload: content,
        });
      }
      return data;
    },
    *getDetail({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(topicService.getDetail, payload);
      const { code, content } = data;
      if (ResponseCode.SUCCESS === code) {
        yield put({
          type: 'setDetail',
          payload: content,
        });
      }
      return data;
    },
    *add({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(topicService.add, payload);
      return data;
    },
    *edit({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(topicService.edit, payload);
      return data;
    },
    *del({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(topicService.del, payload);
      return data;
    },
  },
  reducers: {
    setList(state: any, action: any) {
      return produce(state, (draftState: any) => {
        draftState.list = action.payload;
      });
    },
    setDetail(state: any, action: any) {
      return produce(state, (draftState: any) => {
        draftState.detail = action.payload;
      });
    },
  },
};

export default TopicModel;
