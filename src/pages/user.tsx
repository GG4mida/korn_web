import { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { UserList } from '@/components/user';

const UserPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'user/getList',
    });
  }, [dispatch]);

  const { list: userList } = useSelector((state: any) => state.user);
  const loading = useSelector(
    (state: any) => state.loading.effects['user/getList'],
  );
  return (
    <div className="flex-1 m-5 rounded">
      <UserList data={userList} loading={loading} />
    </div>
  );
};

export default UserPage;
