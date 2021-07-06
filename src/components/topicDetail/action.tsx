import { Link } from 'umi';
import sendAsset from '@/assets/img/send.svg';
import backAsset from '@/assets/img/back.svg';

interface IProps {
  category: string;
  handleClick: () => void;
}

const TopicDetailAction = (props: IProps) => {
  const { handleClick, category } = props;
  return (
    <div className="absolute-right-bottom flex flex-col">
      <a onClick={handleClick} className="action-item">
        <img src={sendAsset} className="w-14 h-14 rounded-full" />
      </a>
      <Link to={`/topic?cid=${category}`} className="action-item">
        <img src={backAsset} className="w-14 h-14 rounded-full" />
      </Link>
    </div>
  );
};

export default TopicDetailAction;
