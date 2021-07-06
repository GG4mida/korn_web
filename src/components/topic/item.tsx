import { Tag, Popconfirm } from 'antd';
import { Link } from 'umi';
import DateTime from '@/utils/datetime';
import deleteAsset from '@/assets/img/delete.svg';

interface IProps {
  data: any;
  handleDelete: (data: any) => void;
}

const TopicItem = (props: IProps) => {
  const { data, handleDelete } = props;
  const { id, title, summary, category_id, category_name, createtime } = data;
  return (
    <div className="flex-center-between p-5 mb-5 bg-white rounded relative">
      <div className="flex-col">
        <Link to={`/topicDetail?id=${id}&cid=${category_id}`}>
          <h3>{title}</h3>
        </Link>
        <p className="text-gray-600 mb-3">{summary}</p>
        <div className="flex flex-row items-center">
          <span className="text-gray-500">
            {DateTime.formatDateTime(createtime)}
          </span>
          <Tag color="#ff4d4d" className="mx-3">
            {category_name}
          </Tag>
        </div>
      </div>
      <div className="absolute top-5 right-5">
        <Popconfirm
          placement="topLeft"
          title="人生没有后悔药，确定要继续？"
          onConfirm={() => handleDelete(data)}
          okText="确定"
          cancelText="取消"
        >
          <a href="#" className="mx-1">
            <img src={deleteAsset} className="w-5 h-5" />
          </a>
        </Popconfirm>
      </div>
    </div>
  );
};

export default TopicItem;
