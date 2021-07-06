import { Spin, Empty } from 'antd';
import TopicCategoryItem from './item';

interface IProps {
  data: any;
  loading: boolean;
  handleEdit: (data: any) => void;
  handleDelete: (data: any) => void;
}

const TopicCategoryList = (props: IProps) => {
  const { data, loading, handleEdit, handleDelete } = props;
  if (loading) {
    return <Spin spinning={true} />;
  }
  if (!data || data.length === 0) {
    return <div className="text-gray-400">暂无数据</div>;
  }
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      {data.map((item: any, index: number) => {
        return (
          <TopicCategoryItem
            data={item}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            key={`topicCategory_${index}`}
          />
        );
      })}
    </div>
  );
};

export default TopicCategoryList;
