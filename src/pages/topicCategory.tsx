import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { message } from 'antd';
import {
  TopicCategoryAction,
  TopicCategoryForm,
  TopicCategoryList,
} from '@/components/topicCategory';
import { ResponseCode } from '@/constant';

const TopicCategoryPage = () => {
  const [formData, setFormData] = useState({
    visible: false,
    data: null,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'topicCategory/getList',
    });
  }, [dispatch]);

  const { list: topicCategoryList } = useSelector(
    (state: any) => state.topicCategory,
  );

  const loadingList = useSelector(
    (state: any) => state.loading.effects['topicCategory/getList'],
  );
  const loadingEdit = useSelector(
    (state: any) => state.loading.effects['topicCategory/edit'],
  );
  const loadingAdd = useSelector(
    (state: any) => state.loading.effects['topicCategory/add'],
  );

  const handleAddClick = useCallback(() => {
    setFormData({
      visible: true,
      data: null,
    });
  }, []);

  const handleEditClick = useCallback((data) => {
    setFormData({
      visible: true,
      data,
    });
  }, []);

  const handleDeleteClick = useCallback(async (data) => {
    const delRes: any = await dispatch({
      type: 'topicCategory/del',
      payload: {
        id: data.id,
      },
    });

    const { code, content } = delRes;
    if (code === ResponseCode.SUCCESS) {
      message.success(content);
      dispatch({
        type: 'topicCategory/getList',
      });
    }
  }, []);

  const handleFormCancel = useCallback(() => {
    setFormData({
      visible: false,
      data: null,
    });
  }, []);

  const handleFormSubmit = useCallback(async (data) => {
    const dispatchType = data.id ? 'topicCategory/edit' : 'topicCategory/add';
    const submitRes: any = await dispatch({
      type: dispatchType,
      payload: data,
    });

    const { code, content } = submitRes;
    if (code === ResponseCode.SUCCESS) {
      message.success(content);

      setFormData({
        visible: false,
        data: null,
      });

      dispatch({
        type: 'topicCategory/getList',
      });
    }
  }, []);

  return (
    <div className="flex-1 m-5 rounded">
      <TopicCategoryList
        data={topicCategoryList}
        loading={loadingList}
        handleEdit={handleEditClick}
        handleDelete={handleDeleteClick}
      />
      <TopicCategoryAction handleClick={handleAddClick} />
      <TopicCategoryForm
        data={formData.data}
        loading={loadingEdit || loadingAdd}
        handleCancel={handleFormCancel}
        handleSubmit={handleFormSubmit}
        visible={formData.visible}
      />
    </div>
  );
};

export default TopicCategoryPage;
