import { Spin, Empty } from 'antd';
import UserItem from './item';

interface IProps {
  data: any;
  loading: boolean;
}

const UserList = (props: IProps) => {
  const { data, loading } = props;

  if (loading) {
    return <Spin spinning={true} />;
  }

  if (!data || data.length === 0) {
    return <div className="text-gray-400">没有数据</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {data.map((item: any, index: number) => {
        return <UserItem data={item} key={`user_${index}`} />;
      })}
    </div>
  );
};

export default UserList;
