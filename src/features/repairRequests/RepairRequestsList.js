import { useEffect } from 'react';
import { useGetRepairRequestsQuery } from "./repairRequestsApiSlice";
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import RepairRequest from "./RepairRequest";
import DashTableContent from "../auth/dashboard/DashTableContent";
import useTitle from '../../hooks/useTitle';
import useAuth from '../../hooks/useAuth';

// RepairRequests List
const RepairRequestsList = () => {

  useTitle('KGTech: Repair Requests');

  const {username, isEmployee, isManager, isAdmin } = useAuth();

  // get repairReduests
  const {
    data: repairrequests,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetRepairRequestsQuery(undefined, {
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
    const { ids, entities } = repairrequests;

    // filtered ids
    let filteredIds;
    if (isAdmin || isManager || isEmployee) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(repairrequestsId => entities[repairrequestsId].customer === username)
    }

    count = filteredIds.length;

    const tableContent = ids?.length 
    ? filteredIds.map(repairRequestId => <RepairRequest key={repairRequestId} repairRequestId={repairRequestId} />)
    : null; 

    content = (
      tableContent.length
        ? 
          <table className="table table__repairRequests">
            <thead className="table__thead">
              <tr>
                <th scope="col" className="table__th repairrequest__status">Status</th>
                <th scope="col" className="table__th repairrequest__username">customer</th>
                <th scope='col' className='table__th repairrequest__deviceType'>DeviceType</th>
                <th scope='col' className='table__th repairrequest__serialNo'>SerialNo</th> 
                <th scope='col' className='table__th repairrequest__created'>Created</th>
                <th scope='col' className='table__th repairrequest__updated'>Updated</th>
                <th scope='col' className='table__th repairrequest__edit'>Edit</th>
                <th scope='col' className='table__th repairrequest__view'> Details</th>
              </tr>
            </thead>

            <tbody>
              {tableContent}
            </tbody>
          </table>
        : <p>Empty Repair Requests Table</p>
    )
  }

  return (
    <>
      <DashTableContent title="Repair Requests List" subTitle={`List of all repair requests (${count}) `} content={content} />
      <Notify />
    </>
  )
  
}

export default RepairRequestsList
