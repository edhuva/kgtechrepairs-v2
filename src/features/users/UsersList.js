import { useGetUsersQuery } from './usersApiSlice';
import User from './User';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const UsersList = () => {
  useTitle('KGTech: Users List');
 
  const {isAdmin} = useAuth();

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery('usersList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });
  
  let content;

  if (isLoading) content= <PulseLoader color={"#FFF"} />

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = users;

    let filteredIds = ids;

    if (!isAdmin) {
      filteredIds = ids?.length ? ids.filter(userId => userId !== ids[0] && userId !== ids[1]) : null;
    } 
      
  

    const tableContent = filteredIds?.length 
      ? filteredIds.map(userId => <User key={userId} userId={userId} />)
      : null;

      content = (
        <>
          <table className='table__user table--users'>
            <thead className='table__thead'>
              <tr>
                <th scope='col' className='table__th user__username'>Username</th>
                <th scope='col' className='table__th user__roles'>Roles</th>
                <th scope='col' className='table__th user__edit'>Edit</th>
              </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
          </table>
          <div className='app__backdash'>
            <button className='login__button'><Link to='/dash'>Back to DashBoard</Link> </button>
          </div>
        </>
       
      );
  }

  return content;
}

export default UsersList
