import { useEffect } from 'react';
import { useGetUsersQuery } from "./usersApiSlice";
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import User from './User';
import DashTableContent from "../auth/dashboard/DashTableContent";
import 'react-toastify/dist/ReactToastify.css';
import useTitle from '../../hooks/useTitle';
import useAuth from '../../hooks/useAuth';

// Users List
const UsersList = () => {

  useTitle('KGTech: Users');

  const {username, isAdmin, authRistrictLevel, defaultPlaceHolder} = useAuth();

  // get users
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (isError) {
      // error notification
      error?.data?.message ?
       toast.error(error.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }) :
         toast.error('Network Error', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
        }

    return () => toast()

  }, [isError, error])

  let content;

  if (isLoading) content = <PulseLoader color="#81AFDD" />;

  if (isError) {
    <>
      {content = error?.data?.message 
        ? <p className="errmsg">{error.data.message}</p>
        : 
          <p className="errmsg">Network Error!</p>
      }
    </>
  }

  let count = [];

  if (isSuccess) {
    
    const { ids, entities } = users;

    //filtered ids
    let filteredIds  = ids?.length ? ids.filter(userId => entities[userId].username !== authRistrictLevel && entities[userId].username !== defaultPlaceHolder) : null;

    if (isAdmin && username === authRistrictLevel) {
      filteredIds = ids;
    } 

    const tableContent = filteredIds?.length
      ? filteredIds.map(userId => <User key={userId} userId={userId} />)
      : null;

    count = filteredIds.length;
    
    content = (
      
      tableContent?.length
        ? 
          <table className="table table__users">
            <thead className="table__thead">
              <tr>
                <th scope="col" className="table__th user__status">status</th>
                <th scope="col" className="table__th user__username">Username</th>
                <th scope="col" className="table__th user__roles">Roles</th>
                <th scope="col" className="table__th user__edit">Edit</th>
              </tr>
            </thead>

            <tbody className="table__body">
              {tableContent}
            </tbody>
          </table>
        : <p>Empty Users Table</p>
    )
  }

  return (
    <>
      <DashTableContent title="Users List" subTitle={`List of all users (${count}) `} content={content} />
      <Notify />
    </>
  )
}

export default UsersList
