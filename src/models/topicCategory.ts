import produce from 'immer';
import { ResponseCode } from '@/constant';
import IResponse from '@/types/response';
import topicCategoryService from '@/services/topicCategory';

const TopicCategoryModel = {
  namespace: 'topicCategory',
  state: {
    list: [],
    detail: {},
  },

  effects: {
    *getList({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(topicCategoryService.getList, payload);
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
      const data: IResponse = yield call(
        topicCategoryService.getDetail,
        payload,
      );
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
      const data: IResponse = yield call(topicCategoryService.add, payload);
      return data;
    },

    *edit({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(topicCategoryService.edit, payload);
      return data;
    },

    *del({ payload }: any, { call, put }: any) {
      const data: IResponse = yield call(topicCategoryService.del, payload);
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

export default TopicCategoryModel;
