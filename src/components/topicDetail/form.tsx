import { useEffect, useCallback } from 'react';
import { Input, Modal, Form, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

interface IProps {
  data: any;
  categories: any;
  category: any;
  visible: boolean;
  loading: boolean;
  handleSubmit: (data: any) => void;
  handleCancel: () => void;
}

const TopicDetailForm = (props: IProps) => {
  const {
    visible,
    loading,
    data,
    categories,
    category,
    handleSubmit,
    handleCancel,
  } = props;
  const [form] = Form.useForm();

  const handleSubmitClick = useCallback(async () => {
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
        order: 1,
        is_top: 0,
        category_id:
          (category && category.id) || (categories.length && categories[0].id),
      };
    }
    form.setFieldsValue(initialData);
  }, [visible]);

  return (
    <Modal
      title="文章信息"
      okText="提交"
      width={640}
      centered
      destroyOnClose
      forceRender
      maskClosable={false}
      visible={visible}
      onOk={handleSubmitClick}
      onCancel={handleCancel}
      okButtonProps={{ loading: loading }}
    >
      <Form layout="vertical" form={form} preserve={false}>
        <Form.Item label="文章编号" name="id" hidden>
          <Input hidden />
        </Form.Item>
        <Form.Item label="文章内容" name="content" hidden>
          <Input hidden />
        </Form.Item>
        <Form.Item
          label="文章标题"
          name="title"
          extra="请不要标题党"
          rules={[{ required: true, message: '请输入文章标题' }]}
        >
          <Input
            placeholder="文章标题"
            autoComplete="off"
            className="form-element"
          />
        </Form.Item>
        <Form.Item
          label="文章描述"
          name="summary"
          extra="请不要录入细思极恐的描述"
          rules={[{ required: true, message: '请输入文章描述' }]}
        >
          <TextArea
            placeholder="文章描述"
            autoComplete="off"
            rows={2}
          ></TextArea>
        </Form.Item>
        <Form.Item
          label="文章分类"
          name="category_id"
          extra="如果不知道怎么分类，说明你正在录入的文章没有什么鸟用"
        >
          <Select>
            {categories.map((category: any, index: number) => {
              return (
                <Option key={`category_${index}`} value={category.id}>
                  {category.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="是否置顶"
          name="is_top"
          extra="你以为置顶了就会有用户看了吗？"
        >
          <Select>
            <Option value={1}>是</Option>
            <Option value={0}>否</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="排序编号"
          name="order"
          extra="男人的有些部位越大越好。但排序编号却是越小越好"
        >
          <Input placeholder="请输入排序编号" autoComplete="off" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TopicDetailForm;
