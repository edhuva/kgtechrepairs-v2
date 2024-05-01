import { useGetUsersQuery } from "./usersApiSlice";
import { useGetEmployeesQuery } from '../employees/employeesApiSlice';
import { useGetCustomersQuery } from '../customers/customerApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import UserAccountDetails from "./UserAccountDetails";
import useTitle from "../../hooks/useTitle";
import useAuth from '../../hooks/useAuth';

// User Account
const UserAccount = () => {

    useTitle('KGTech: Account');

    const { userid } = useAuth();

    // get users
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
          users: data?.ids.map(id => data?.entities[id])
        }),
    })

    // get employees
    const { employees } = useGetEmployeesQuery("EmployeesList", {
        selectFromResult: ({ data }) => ({
            employees: data?.ids.map( id => data?.entities[id])
        }),
    })

    // get customers
    const { customers } = useGetCustomersQuery("CustomersList", {
        selectFromResult: ({ data }) => ({
            customers: data?.ids.map( id => data?.entities[id])
        }),
    })

    // if not true keep loading
    if (!users?.length || !employees?.length || !customers?.length) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />

    const user = users.find(user => user.id === userid);
 
    const content = user ? <UserAccountDetails user={user} employees={employees} customers={customers} /> : <p> Successfully updated please login again!</p>

    return content;
  
}

export default UserAccount
