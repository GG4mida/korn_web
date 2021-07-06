import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { message } from 'antd';
import { ResponseCode } from '@/constant';
import { TopicList, TopicHeader, TopicAction } from '@/components/topic';

const TopicPage = (props: any) => {
  const categoryId = props.location.query.cid;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'topic/getList',
      payload: {
        cid: categoryId,
      },
    });

    dispatch({
      type: 'topicCategory/getDetail',
      payload: {
        id: categoryId,
      },
    });

    return () => {
      dispatch({
        type: 'topic/setList',
        payload: [],
      });
    };
  }, [categoryId]);

  const handleDeleteClick = useCallback(
    async (data) => {
      const delRes: any = await dispatch({
        type: 'topic/del',
        payload: {
          id: data.id,
        },
      });

      const { code, content } = delRes;
      if (code === ResponseCode.SUCCESS) {
        message.success(content);
        dispatch({
          type: 'topic/getList',
          payload: {
            cid: categoryId,
          },
        });
      }
    },
    [categoryId],
  );

  const { list: topicList } = useSelector((state: any) => state.topic);

  const { detail: topicCategoryInfo } = useSelector(
    (state: any) => state.topicCategory,
  );

  const loading = useSelector(
    (state: any) => state.loading.effects['topic/getList'],
  );

  return (
    <div className="p-5">
      <TopicHeader category={topicCategoryInfo} />
      <TopicList
        data={topicList}
        loading={loading}
        handleDelete={handleDeleteClick}
      />
      <TopicAction category={categoryId} />
    </div>
  );
};

export default TopicPage;
