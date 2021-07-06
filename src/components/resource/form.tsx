import { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { Modal, Form, Input, Upload, message } from 'antd';
import { StorageKey } from '@/constant';
import Storage from '@/utils/storage';
import uploadAsset from '@/assets/img/upload.svg';

const { Dragger } = Upload;

interface IProps {
  loading: boolean;
  visible: boolean;
  handleSubmit: (data: any) => void;
  handleCancel: () => void;
}

const ResourceForm = (props: IProps) => {
  const [form] = Form.useForm();
  const [file] = useState('');
  const fileRef = useRef(file);
  const { visible, loading, handleSubmit, handleCancel } = props;

  const handleCancelClick = useCallback(() => {
    handleCancel();
  }, []);

  const handleSubmitClick = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append('files', fileRef.current);
        formData.append('name', values.name);
        handleSubmit(formData);
      })
      .catch(() => {});
  }, []);

  const uploadProps = useMemo(() => {
    const authorizationCode = Storage.getItem(StorageKey.AUTHTOKEN);
    return {
      name: 'file',
      accept: '.svg,.png,.jpg,.jpeg',
      multiple: false,
      maxCount: 1,
      headers: { Authorization: authorizationCode },
      beforeUpload(file: any) {
        console.info(file);
        fileRef.current = file;
        return false;
      },
    };
  }, []);

  useEffect(() => {
    if (visible === false) {
      form.resetFields();
    }
  }, [visible]);

  return (
    <Modal
      title="资源信息"
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
        <Form.Item
          label="资源名称"
          name="name"
          extra="短小精干，言简意赅，不要废话"
          rules={[{ required: true, message: '请输入资源名称' }]}
        >
          <Input placeholder="资源名称" autoComplete="off" />
        </Form.Item>

        <Form.Item
          name="file"
          rules={[{ required: true, message: '请选择文件' }]}
        >
          <Dragger {...uploadProps}>
            <p className="my-2">
              <img src={uploadAsset} className="w-10 h-10" />
            </p>
            <p className="mb-2 text-gray-600">
              点击选择文件或者将文件拖动到此处上传
            </p>
            <p className="text-gray-400">
              仅支付图像文件上传，格式限制为：png、jpg、jpeg。大小不超过 1M
            </p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResourceForm;
