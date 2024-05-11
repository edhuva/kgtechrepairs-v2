import { useEffect } from 'react';
import { useGetSubscriptionsQuery } from './subscriptionsApiSlice';
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import Subscription from './Subscription';
import DashTableContent from "../auth/dashboard/DashTableContent";
import useTitle from '../../hooks/useTitle';

// Subscriptions LIst
const SubscriptionsList = () => {

    useTitle('KGTech: Subscriptions');

    // get subscriptions
  const {
    data: subscriptions,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSubscriptionsQuery(undefined, {
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
    const { ids } = subscriptions;

    const tableContent = ids?.length 
      ? ids.map(subscriptionId => <Subscription key={subscriptionId} subscriptionId={subscriptionId} />)
      : null;

    count= ids.length;

    content = (
      tableContent?.length
      ? 
        <table className="table table__contacts table__margin">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th user__status">Status</th>
              <th scope="col" className="table__th user__email">Email</th>
              <th scope="col" className="table__th date__created">created</th>
              <th scope="col" className="table__th date__updated">Updated</th>
              <th scope="col" className="table__th user__edit">Edit</th>
            </tr>
          </thead>

          <tbody className="table__body">
            {tableContent}
          </tbody>
        </table>
      : <p>Empty Subscriptions Table</p>
    )
  }

  return (
    <>
      <DashTableContent title="Contacts List" subTitle={`List of all new contacts (${count}) `} content={content} />
      <Notify />
    </>
  )
}

export default SubscriptionsList
