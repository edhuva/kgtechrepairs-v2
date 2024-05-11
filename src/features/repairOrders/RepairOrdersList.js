import { useEffect } from 'react';
import { useGetRepairOrdersQuery } from "./repairOrdersApiSlice";
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import RepairOrder from "./RepairOrder";
import DashTableContent from "../auth/dashboard/DashTableContent";
import useTitle from '../../hooks/useTitle';
import useAuth from '../../hooks/useAuth';

// RepairOrders List
const RepairOrdersList = () => {

  useTitle('KGTech: RepairOrders');

  const {username, isCustomer, isEmployee, isManager, isAdmin } = useAuth();

  // get orders
  const {
    data: repairOrders,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetRepairOrdersQuery(undefined, {
    pollingInterval: 15000,
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
    const { ids, entities } = repairOrders;

    //filtered ids
    let filteredIds;
    if (isEmployee || isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(repairOrderId => entities[repairOrderId].customer === username)
    }

    count = filteredIds.length;

    const tableContent = ids?.length 
      ? filteredIds.map(repairOrderId => <RepairOrder key={repairOrderId} repairOrderId={repairOrderId} />)
      : null;

    content = (
      tableContent?.length
        ? 
          <table className={isCustomer ? "table table__custRepairOrders" : "table table__repairOrders"}>
            <thead className="table__thead">
              <tr>
                <th scope="col" className="table__th repairOrder__status">Status</th>
                <th scope="col" className="table__th repairOrder__customer">customer</th>
                <th scope='col' className='table__th repairOrder__username userCreated'>Created By</th>
                <th scope='col' className='table__th repairOrder__username'>Assigned To</th>
                <th scope='col' className='table__th repairOrder__serialNo'>SerialNo</th>
                <th scope='col' className='table__th repairOrder__deviceType'>DeviceType</th>
                <th scope='col' className='table__th repairOrder__created'>Created</th>
                <th scope='col' className='table__th repairOrder__updated'>Updated</th>
                <th scope='col' className={isCustomer ? 'hide' : 'table__th repairOrder__edit'}>Edit</th>
                <th scope='col' className='table__th repairOrder__view'> Details</th>
              </tr>
            </thead>

            <tbody>
              {tableContent}
            </tbody>
          </table>
        : <p>Empty Repair Orders Table</p>
    )
  }

  return (
    <>
      <DashTableContent title="Repair Orders List" subTitle={`List of all repair orders (${count}) `} content={content} />
      <Notify />
    </>
  )
}

export default RepairOrdersList
