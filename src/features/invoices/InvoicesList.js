import { useEffect } from 'react';
import { useGetInvoicesQuery } from "./invoicesApiSlice";
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import Invoice from './Invoice';
import DashTableContent from "../auth/dashboard/DashTableContent";
import useTitle from '../../hooks/useTitle';
import useAuth from '../../hooks/useAuth';

//Invoices List
const InvoicesList = () => {

  useTitle('KGTech: Invoices');

  const { username, isCustomer, isEmployee, isManager, isAdmin } = useAuth();

  //get Invoices
  const {
    data: invoices,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetInvoicesQuery(undefined, {
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
    const { ids, entities } = invoices;

    //filter Ids
    let filteredIds;
    if (isEmployee || isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(invoiceId => entities[invoiceId].customer === username);
    }

    count = filteredIds.length;

    const tableContent = ids?.length 
    ? filteredIds.map(invoiceId => <Invoice key={invoiceId} invoiceId={invoiceId} />)
    : null; 

    content = (
      tableContent.length
        ? 
            <table className={isCustomer ? "table table__custInvoices table__margin" : "table table__invoices table__margin"}>
            <thead className="table__thead">
              <tr>
                <th scope="col" className="table__th invoice__status">Status</th>
                <th scope="col" className="table__th invoice__username">customer</th>
                <th scope='col' className='table__th invoice__username'>Employee</th>
                <th scope='col' className='table__th invoice__serialNo'>SerialNo</th>
                <th scope='col' className='table__th invoice__totalAmount'>TotAmount</th>
                <th scope='col' className='table__th invoice__created'>Created</th>
                <th scope='col' className='table__th invoice__updated'>Updated</th>
                <th scope='col' className={isCustomer ? 'hide' : 'table__th invoice__edit'}>Edit</th>
                <th scope='col' className='table__th invoice__view'> Details</th>
              </tr>
            </thead>

            <tbody>
              {tableContent}
            </tbody>
          </table>
        : <p>Empty Invoices Table</p>
    )
  }

  return (
    <>
      <DashTableContent title="Invoices List" subTitle={`List of all invoices (${count}) `} content={content} />
      <Notify />
    </>
  )
}

export default InvoicesList
