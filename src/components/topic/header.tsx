import { PageHeader } from 'antd';
import { history } from 'umi';

interface IProps {
  category: any;
}

const TopicHeader = (props: IProps) => {
  const { category } = props;
  const { name } = category;
  return (
    <PageHeader
      className="bg-white mb-3"
      onBack={() => history.push('/topicCategory')}
      title={name}
      subTitle="文章列表"
    />
  );
};

export default TopicHeader;
