import { Badge, Popconfirm } from 'antd';
import { Link } from 'umi';
import editAsset from '@/assets/img/edit.svg';
import deleteAsset from '@/assets/img/delete.svg';

interface IProps {
  data: any;
  handleEdit: (data: any) => void;
  handleDelete: (data: any) => void;
}

const TopicCategoryItem = (props: IProps) => {
  const { data, handleEdit, handleDelete } = props;
  const { id, name, icon, description, topicCount, enabled } = data;
  const enabledClass = enabled === 1 ? 'opacity-100' : 'opacity-50';
  return (
    <div
      className={`flex flex-row items-center rounded relative bg-white p-5 ${enabledClass}`}
    >
      <Badge count={topicCount}>
        <img src={icon} className="w-12 h-12 rounded-full" />
      </Badge>
      <div className="ml-3">
        <Link to={`/topic?cid=${id}`}>
          <h4 className="text-base mb-1">{name}</h4>
        </Link>
        <span className="text-gray-500 text-sm">{description}</span>
      </div>
      <div className="absolute top-3 right-3">
        <a href="#" className="mx-1" onClick={() => handleEdit(data)}>
          <img src={editAsset} className="w-5 h-5" />
        </a>
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

export default TopicCategoryItem;
