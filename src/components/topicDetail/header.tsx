import { PageHeader } from 'antd';
import { history } from 'umi';

interface IProps {
  category: any;
}

const TopicHeader = (props: IProps) => {
  const { category = {} } = props;
  const { name, id } = category;
  return (
    <PageHeader
      className="bg-white mb-3"
      onBack={() => history.push(`/topic?cid=${id}`)}
      title={name}
      subTitle="文章操作"
    />
  );
};

export default TopicHeader;
