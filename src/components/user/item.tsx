import { Badge } from 'antd';
import DateTime from '@/utils/datetime';

interface IProps {
  data: any;
}

const UserItem = (props: IProps) => {
  const { data } = props;
  const { avatar, nick_name, createtime, holdCount = 0 } = data;
  return (
    <div className="flex flex-row items-center rounded bg-white p-5">
      <Badge count={holdCount}>
        <img src={avatar} className="w-12 h-12 rounded-full" />
      </Badge>
      <div className="ml-3">
        <h4 className="text-base mb-1">{nick_name}</h4>
        <span className="text-gray-500 text-sm">
          {DateTime.formatDateTime(createtime)}
        </span>
      </div>
    </div>
  );
};

export default UserItem;
