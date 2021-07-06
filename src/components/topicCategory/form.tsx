import { useCallback, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
const { Option } = Select;

interface IProps {
  data: any;
  loading: boolean;
  visible: boolean;
  handleSubmit: (data: any) => void;
  handleCancel: () => void;
}

const TopicCategoryForm = (props: IProps) => {
  const [form] = Form.useForm();
  const { visible, loading, data, handleSubmit, handleCancel } = props;

  const handleCancelClick = useCallback(() => {
    form.resetFields();
    handleCancel();
  }, []);

  const handleSubmitClick = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        handleSubmit(values);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let initialData = null;
    if (data && Object.keys(data).length) {
      initialData = data;
    } else {
      initialData = {
        enabled: 1,
        order: 1,
      };
    }
    form.setFieldsValue(initialData);
  }, [visible]);

  return (
    <Modal
      title="分类信息"
      okText="提交"
      width={640}
      centered
      destroyOnClose
      maskClosable={false}
      visible={visible}
      forceRender
      onOk={handleSubmitClick}
      okButtonProps={{ loading: loading }}
      onCancel={handleCancelClick}
    >
      <Form layout="vertical" preserve={false} form={form}>
        <Form.Item label="分类编号" name="id" hidden>
          <Input hidden />
        </Form.Item>
        <Form.Item
          label="分类名称"
          name="name"
          extra="短小精干，言简意赅，不要废话"
          rules={[{ required: true, message: '请输入分类名称' }]}
        >
          <Input placeholder="分类名称" autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="分类描述"
          name="description"
          extra="这个字段其实没有什么鸟用"
          rules={[{ required: true, message: '请输入分类描述' }]}
        >
          <Input placeholder="分类描述" autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="排序编号"
          name="order"
          extra="男人的有些部位越大越好。但排序编号却是越小越好"
          rules={[{ required: true, message: '请输入排序编号' }]}
        >
          <InputNumber
            placeholder="排序编号"
            autoComplete="off"
            min={1}
            max={99}
            step={1}
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          label="分类图标"
          name="icon"
          extra="图标文件可在资源栏目中进行上传"
          rules={[{ required: true, message: '请输入分类图标' }]}
        >
          <Input placeholder="分类图标" autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="是否启用"
          name="enabled"
          extra="实在看不顺眼，就禁用吧"
        >
          <Select>
            <Option value={1}>是</Option>
            <Option value={0}>否</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TopicCategoryForm;
