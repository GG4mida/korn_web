import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { find } from 'lodash';
import { ResponseCode } from '@/constant';
import {
  TopicDetailForm,
  TopicDetailAction,
  TopicDetailHeader,
  TopicDetailEditor,
} from '@/components/topicDetail';
const TopicDetailPage = (props: any) => {
  const [formVisible, setFormVisible] = useState(false);
  const [content] = useState('');
  const contentRef = useRef(content);
  const { id: topicId, cid: categoryId } = props.location.query;

  const dispatch = useDispatch();
  const { list: topicCategories } = useSelector(
    (state: any) => state.topicCategory,
  );

  useEffect(() => {
    if (topicId) {
      dispatch({
        type: 'topic/getDetail',
        payload: {
          id: topicId,
        },
      });
    }

    if (!topicCategories || topicCategories.length === 0) {
      dispatch({
        type: 'topicCategory/getList',
      });
    }

    return () => {
      dispatch({
        type: 'topic/setDetail',
        payload: {},
      });
    };
  }, [topicId]);

  const handleFormClick = useCallback(() => {
    setFormVisible(true);
  }, []);

  const handleFormSubmit = useCallback(async (data: any) => {
    const dispatchType = data.id ? 'topic/edit' : 'topic/add';
    const editorContent = contentRef.current || data.content;

    const submitRes: any = await dispatch({
      type: dispatchType,
      payload: {
        ...data,
        content: editorContent,
      },
    });

    const { code, content } = submitRes;
    if (code === ResponseCode.SUCCESS) {
      message.success(content);
      setFormVisible(false);
    }
  }, []);

  const handleFormCancel = useCallback(() => {
    setFormVisible(false);
  }, []);

  const handleEditorChange = useCallback((html, text) => {
    contentRef.current = text;
  }, []);

  const loadingEdit = useSelector(
    (state: any) => state.loading.effects['topic/edit'],
  );
  const loadingAdd = useSelector(
    (state: any) => state.loading.effects['topic/add'],
  );

  const { detail: topicDetail } = useSelector((state: any) => state.topic);

  const category = useMemo(() => {
    return find(topicCategories, { id: categoryId });
  }, [categoryId, topicCategories]);

  return (
    <div className="flex-1 p-5">
      <TopicDetailHeader category={category} />
      <TopicDetailEditor data={topicDetail} handleChange={handleEditorChange} />
      <TopicDetailForm
        data={topicDetail}
        category={category}
        categories={topicCategories}
        loading={loadingAdd || loadingEdit}
        visible={formVisible}
        handleSubmit={handleFormSubmit}
        handleCancel={handleFormCancel}
      />
      <TopicDetailAction handleClick={handleFormClick} category={categoryId} />
    </div>
  );
};

export default TopicDetailPage;
