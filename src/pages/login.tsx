import { useCallback } from 'react';
import { history } from 'umi';
import { Form, Input, Button, message } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { ResponseCode } from '@/constant';
import logoAsset from '@/assets/img/logo.png';

const LoginHeader = () => {
  return (
    <div className="flex-center-center flex-col mb-8">
      <img src={logoAsset} className="w-40 mb-3" alt="logo" />
    </div>
  );
};

const LoginForm = (props: any) => {
  const { handleSubmit, loading } = props;
  return (
    <Form onFinish={handleSubmit} className="w-72 mb-5">
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input size="large" placeholder="用户名" autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input size="large" type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item className="mb-0">
        <Button
          type="primary"
          size="large"
          loading={loading}
          block
          htmlType="submit"
          className="form-element"
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

const LoginFooter = () => {
  return (
    <p className="text-gray-400 text-center mb-0">没有账号？请联系系统管理员</p>
  );
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    async (values: any) => {
      const loginRes: any = await dispatch({
        type: 'admin/login',
        payload: values,
      });
      const { code } = loginRes;
      if (code === ResponseCode.SUCCESS) {
        message.success('登录成功，正在前往系统。', 2).then(() => {
          history.push('/home');
        });
      }
    },
    [dispatch],
  );

  const loading = useSelector(
    (state: any) => state.loading.effects['user/login'],
  );

  return (
    <div className="flex-center-center flex-col min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-2xl">
        <LoginHeader />
        <LoginForm handleSubmit={handleSubmit} loading={loading} />
        <LoginFooter />
      </div>
    </div>
  );
};

export default LoginPage;
