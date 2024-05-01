import { useParams } from "react-router-dom";
import { useGetCustomersQuery } from "./customerApiSlice";
import { useGetUsersQuery } from '../users/usersApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import UpdateCustAccountDetails from "./UpdateCustAccountDetails";
import useTitle from "../../hooks/useTitle";

// Update Customer Account
const UpdateCustAccount = () => {

    useTitle('KGTech: Update Account');

    const { id } = useParams();

    //select customer
  const { customer } = useGetCustomersQuery("CustomersList", {
      selectFromResult: ({ data }) => ({
          customer: data?.entities[id]
      })
  })

  //get users
  const { users } = useGetUsersQuery("UsersList", {
    selectFromResult: ({ data }) => ({
        users: data?.ids.map( id => data?.entities[id])
    }),
  })

  //if not true keep loading
  if (!customer || !users?.length ) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />

  const user = users.find(user => user.id === customer.userid);
 
  const content = user ? <UpdateCustAccountDetails customer={customer} user={user} />
  : <p> Successfully updated please login again!</p>

  return content;
}

export default UpdateCustAccount
