import { Link } from 'umi';
import addAsset from '@/assets/img/add.svg';

interface IProps {
  category: string;
}

const TopicAction = (props: IProps) => {
  const { category } = props;
  return (
    <div className="absolute-right-bottom flex flex-col">
      <Link to={`/topicDetail?cid=${category}`} className="action-item">
        <img src={addAsset} className="w-14 h-14 rounded-full" />
      </Link>
    </div>
  );
};

export default TopicAction;
