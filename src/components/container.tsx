import { useEffect, useCallback } from 'react';
import { Link, history } from 'umi';
import { ConfigProvider, Menu, Avatar, Dropdown, Spin } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Storage from '../utils/storage';
import { StorageKey, ResponseCode } from '../constant';
import { useDispatch, useSelector } from 'dva';
import avatarAsset from '../assets/img/avatar.svg';
import logoAsset from '../assets/img/logo.png';

const ContainerRightContent = (props: any) => {
  const { handleLogout, loading } = props;
  const profileMenu = () => {
    return (
      <Menu>
        <Menu.Item onClick={handleLogout}>注销</Menu.Item>
      </Menu>
    );
  };
  return (
    <div className="mx-5 items-end">
      <Spin spinning={loading}>
        <Dropdown overlay={profileMenu}>
          <a onClick={(e) => e.preventDefault()} className="flex items-center">
            <Avatar
              src={avatarAsset}
              className="w-5 h-5 rounded-full mr-2"
            ></Avatar>
            <span className="text-gray-600 text-base">Administrator</span>
          </a>
        </Dropdown>
      </Spin>
    </div>
  );
};

const ContainerMenus = () => {
  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={['home']}
      className="flex-1 border-none"
    >
      <Menu.Item key="home">
        <Link to="/home">首页</Link>
      </Menu.Item>
      <Menu.Item key="user">
        <Link to="/user">用户</Link>
      </Menu.Item>
      <Menu.Item key="topicCategory">
        <Link to="/topicCategory">文章</Link>
      </Menu.Item>
      <Menu.Item key="resource">
        <Link to="/resource">资源</Link>
      </Menu.Item>
      <Menu.Item key="setting">
        <Link to="/setting">设置</Link>
      </Menu.Item>
    </Menu>
  );
};

const ContainerHeader = () => {
  return (
    <Link to="/home" className="mx-5 flex items-center">
      <img src={logoAsset} className="h-4" />
    </Link>
  );
};

const Container = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'admin/getProfile',
    });
  }, []);

  const handleLogout = useCallback(async () => {
    const logoutRes: any = await dispatch({
      type: 'admin/logout',
    });
    const { code } = logoutRes;
    if (code === ResponseCode.SUCCESS) {
      Storage.removeItem(StorageKey.AUTHTOKEN);
      history.push('/login');
    }
  }, [dispatch]);

  const { profile: adminProfile } = useSelector((state: any) => state.admin);
  const loadingProfile = useSelector(
    (state: any) => state.loading.effects['admin/getProfile'],
  );

  if (loadingProfile !== false) return null;

  if (!adminProfile || Object.keys(adminProfile).length === 0) {
    history.replace('/login');
    return;
  }

  return (
    <ConfigProvider locale={zhCN} componentSize="large">
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center">
          <ContainerHeader />
          <ContainerMenus />
          <ContainerRightContent
            loading={loadingProfile}
            handleLogout={handleLogout}
          />
        </div>
        <div className="flex-1 bg-gray-50">{props.children}</div>
      </div>
    </ConfigProvider>
  );
};

export default Container;
