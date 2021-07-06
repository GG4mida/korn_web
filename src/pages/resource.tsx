import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { message } from 'antd';
import {
  ResourceList,
  ResourceAction,
  ResourceForm,
} from '@/components/resource';
import { ResponseCode } from '@/constant';

const ResourcePage = () => {
  const [formVisible, setFormVisible] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'resource/getList',
    });
  }, [dispatch]);

  const { list: resourceList } = useSelector((state: any) => state.resource);

  const loadingList = useSelector(
    (state: any) => state.loading.effects['resource/getList'],
  );
  const loadingAdd = useSelector(
    (state: any) => state.loading.effects['resource/add'],
  );

  const handleAddClick = useCallback(() => {
    setFormVisible(true);
  }, []);

  const handleDeleteClick = useCallback(async (id) => {
    const delRes: any = await dispatch({
      type: 'resource/del',
      payload: {
        id,
      },
    });

    const { code, content } = delRes;
    if (code === ResponseCode.SUCCESS) {
      message.success(content);
      dispatch({
        type: 'resource/getList',
      });
    }
  }, []);

  const handleFormCancel = useCallback(() => {
    setFormVisible(false);
  }, []);

  const handleFormSubmit = useCallback(async (data) => {
    const submitRes: any = await dispatch({
      type: 'resource/add',
      payload: data,
    });

    const { code, content } = submitRes;
    if (code === ResponseCode.SUCCESS) {
      message.success(content);
      setFormVisible(false);
      dispatch({
        type: 'resource/getList',
      });
    }
  }, []);

  return (
    <div className="flex-1 m-3 rounded">
      <ResourceList
        data={resourceList}
        loading={loadingList}
        handleDelete={handleDeleteClick}
      />
      <ResourceAction handleClick={handleAddClick} />
      <ResourceForm
        loading={loadingAdd}
        handleCancel={handleFormCancel}
        handleSubmit={handleFormSubmit}
        visible={formVisible}
      />
    </div>
  );
};

export default ResourcePage;
