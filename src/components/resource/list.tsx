import { Spin, Empty } from 'antd';
import ResourceItem from './item';

interface IProps {
  data: any;
  loading: boolean;
  handleDelete: (data: any) => void;
}

const TopicCategoryList = (props: IProps) => {
  const { data, loading, handleDelete } = props;
  if (loading) {
    return <Spin spinning={true} />;
  }
  if (!data || data.length === 0) {
    return <div className="text-gray-400">暂无数据</div>;
  }
  return (
    <div className="flex flex-1 flex-row items-start flex-wrap">
      {data.map((item: any, index: number) => {
        return (
          <ResourceItem
            data={item}
            handleDelete={handleDelete}
            key={`topicCategory_${index}`}
          />
        );
      })}
    </div>
  );
};

export default TopicCategoryList;
