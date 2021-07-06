import { useCallback, useEffect } from 'react';
import { Form, Input, Spin, Button } from 'antd';

interface IProps {
  data: any;
  loading: boolean;
  handleSubmit: (data: any) => void;
}

const SettingForm = (props: IProps) => {
  const { data, loading, handleSubmit } = props;
  if (loading) {
    return <Spin spinning={true} />;
  }

  const [form] = Form.useForm();

  const handleSubmitClick = useCallback((data) => {
    if (form.validateFields()) {
      const data = form.getFieldsValue();
      handleSubmit(data);
    }
  }, []);

  useEffect(() => {
    let initialData = {};
    if (data) {
      initialData = data;
    }
    form.setFieldsValue(initialData);
  }, []);

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmitClick}>
      <Form.Item label="官网地址" name="site_url">
        <Input placeholder="官网地址" autoComplete="off" />
      </Form.Item>
      <Form.Item label="Github" name="git_url">
        <Input placeholder="gitHub" autoComplete="off" />
      </Form.Item>
      <Form.Item label="Slogan" name="slogan">
        <Input placeholder="slogan" autoComplete="off" />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input placeholder="email" autoComplete="off" />
      </Form.Item>
      <Form.Item label="Telegram" name="telegram">
        <Input placeholder="telegram" autoComplete="off" />
      </Form.Item>
      <Form.Item className="mb-0">
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SettingForm;
