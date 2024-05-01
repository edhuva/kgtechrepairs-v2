import { useEffect } from 'react';
import { useGetEmployeesQuery } from "./employeesApiSlice";
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import './Employee';
import Employee from "./Employee";
import DashTableContent from "../auth/dashboard/DashTableContent";
import useTitle from '../../hooks/useTitle';
import useAuth from '../../hooks/useAuth';

// Employees List
const EmployeesList = () => {

  useTitle('KGTech: Employees');

  const {username, isAdmin, authRistrictLevel, defaultPlaceHolder} = useAuth();

  // get employees
  const {
    data: employees,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetEmployeesQuery(undefined, {
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
    content = error?.data?.message
    ? <p className="errmsg">{error.data.message}</p>
    : <p className="errmsg">Network Error!</p>
  }

  let count = [];

  if (isSuccess) {
    const { ids, entities } = employees;

    //authorization ristrict level
    let filteredIds  = ids?.length ? ids.filter(employeeId => entities[employeeId].user !== authRistrictLevel && entities[employeeId].user !== defaultPlaceHolder) : null;

    if (isAdmin && username === authRistrictLevel) {
      filteredIds = ids;
    } 

    // if true create table content
    const tablecontent = filteredIds?.length 
    ? filteredIds.map(employeeId => <Employee key={employeeId} employeeId={employeeId} />)
    : null;

    count = filteredIds.length;

    content = (
      tablecontent
      ? 
        <table className="table table__employee table__margin">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th">Username</th>
              <th scope="col" className="table__th user__email">Fullname</th>
              <th scope="col" className="table__th user__roles">PhoneNo</th>
              <th scope="col" className="table__th user__email">Email</th>
              <th scope="col" className="table__th user__edit">Edit</th>
              <th scope='col' className='table__th repairOrder__view'> Details</th>
            </tr>
          </thead>

          <tbody>
            {tablecontent}
          </tbody>
        </table>
      : <p>Empty Employee Table</p>
    ) 
  }

  return (
    <>
      <DashTableContent title="Employees List" subTitle={`List of all employees (${count}) `} content={content} />
      <Notify />
    </>
  )
}

export default EmployeesList
