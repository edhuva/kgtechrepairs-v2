import { useEffect } from 'react';
import { useGetCustomersQuery } from "./customerApiSlice"
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import Customer from './Customer';
import DashTableContent from "../auth/dashboard/DashTableContent";
import useTitle from '../../hooks/useTitle';

// Customers LIst
const CustomersLIst = () => {

  useTitle('KGTech: Customers');

  // get customers
  const {
    data: customers,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetCustomersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (isError) {
      //error notification
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
    //if successfull
    const { ids } = customers;

    const tableContent = ids?.length 
      ? ids.map(customerId => <Customer key={customerId} customerId={customerId} />)
      : null;

    count= ids.length;

    content = (
      tableContent
      ? 
        <table className="table table__customers table__margin">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th user__username">Username</th>
              <th scope="col" className="table__th user__email">Fullname</th>
              <th scope="col" className="table__th user__roles">PhoneNo</th>
              <th scope="col" className="table__th user__email">Email</th>
              <th scope="col" className="table__th user__edit">Edit</th>
              <th scope='col' className='table__th repairOrder__view'> Details</th>
            </tr>
          </thead>

          <tbody className="table__body">
            {tableContent}
          </tbody>
        </table>
      : <p>Empty Customer Table</p>
    )
  }


  return (
    <>
      <DashTableContent title="Customers List" subTitle={`List of all customers (${count}) `} content={content} />
      <Notify />
    </>
  )
}

export default CustomersLIst
