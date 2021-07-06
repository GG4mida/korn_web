import { Spin } from 'antd';
import TopicItem from './item';

interface IProps {
  data: any;
  loading: boolean;
  handleDelete: (data: any) => void;
}

const TopicList = (props: IProps) => {
  const { data, loading, handleDelete } = props;

  if (loading) {
    return <Spin spinning={true} />;
  }

  if (!data || data.length === 0) {
    return <div className="text-gray-400">暂无数据</div>;
  }

  return (
    <div className="flex-1">
      {data.map((item: any, index: number) => {
        return (
          <TopicItem
            data={item}
            key={`topic_${index}`}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default TopicList;
