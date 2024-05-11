import { useEffect } from 'react';
import { useGetContactsQuery } from './contactsApiSlice';
import { PulseLoader } from "react-spinners";
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import Contact from './Contact';
import DashTableContent from "../auth/dashboard/DashTableContent";
import useTitle from '../../hooks/useTitle';

// Contacts LIst
const ContactsList = () => {

    useTitle('KGTech: Contacts');

    // get contacts
  const {
    data: contacts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetContactsQuery(undefined, {
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
    const { ids } = contacts;

    const tableContent = ids?.length 
      ? ids.map(contactId => <Contact key={contactId} contactId={contactId} />)
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
              <th scope="col" className="table__th user__message">Message</th>
              <th scope="col" className="table__th user__edit">Edit</th>
              <th scope='col' className='table__th repairOrder__view'> Details</th>
            </tr>
          </thead>

          <tbody className="table__body">
            {tableContent}
          </tbody>
        </table>
      : <p>Empty Contacts Table</p>
    )
  }


  return (
    <>
      <DashTableContent title="Contacts List" subTitle={`List of all new contacts (${count}) `} content={content} />
      <Notify />
    </>
  )
}

export default ContactsList
