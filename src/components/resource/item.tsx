import { Popconfirm, Card } from 'antd';
import DateTime from '@/utils/datetime';

const { Meta } = Card;

interface IProps {
  data: any;
  handleDelete: (data: any) => void;
}

const ResourceItem = (props: IProps) => {
  const { data, handleDelete } = props;
  const { id, name, url, createtime } = data;
  return (
    <Card
      style={{ width: 200 }}
      className="m-3"
      bordered={false}
      cover={<img alt="example" src={url} />}
      actions={[
        <a key="detail" href={url} target="_blank">
          查看
        </a>,
        <Popconfirm
          placement="topLeft"
          title="人生没有后悔药，确定要继续？"
          onConfirm={() => handleDelete(id)}
          okText="确定"
          cancelText="取消"
        >
          <a href="#" className="mx-1">
            删除
          </a>
        </Popconfirm>,
      ]}
    >
      <Meta title={name} description={DateTime.formatDateTime(createtime)} />
    </Card>
  );
};

export default ResourceItem;
