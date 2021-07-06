import addAsset from '@/assets/img/add.svg';

interface IProps {
  handleClick: () => void;
}

const ResourceAction = (props: IProps) => {
  const { handleClick } = props;
  return (
    <div className="absolute-right-bottom flex flex-col">
      <a href="#" onClick={handleClick} className="action-item">
        <img src={addAsset} className="w-14 h-14 rounded-full" />
      </a>
    </div>
  );
};

export default ResourceAction;
