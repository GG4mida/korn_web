import { useCallback, useEffect } from 'react';
import { Tabs, Spin } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { SettingForm } from '@/components/setting';

const { TabPane } = Tabs;

const SettingContent = (props: any) => {
  const { data, loading, handleSubmit } = props;
  if (loading) {
    return <Spin spinning={true} />;
  }

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="基本配置" key="1">
        <SettingForm
          data={data}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </TabPane>
    </Tabs>
  );
};

const SettingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'system/getInfo',
    });
  }, [dispatch]);

  const { info: systemInfo } = useSelector((state: any) => state.system);
  const loading = useSelector(
    (state: any) => state.loading.effects['system/getInfo'],
  );

  const handleSettingSubmit = useCallback((data) => {
    console.info('handle setting submit.');
    console.info(data);
  }, []);

  return (
    <div className="flex-1 m-5 p-5 rounded bg-white">
      <SettingContent
        data={systemInfo}
        loading={loading}
        handleSubmit={handleSettingSubmit}
      />
    </div>
  );
};

export default SettingPage;
