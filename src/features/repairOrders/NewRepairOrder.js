import { useGetUsersQuery } from '../users/usersApiSlice';
import { useGetCustomersQuery } from '../customers/customerApiSlice';
import { useGetEmployeesQuery } from '../employees/employeesApiSlice';
import PulseLoader from "react-spinners/PulseLoader";
import NewRepairOrderForm from "./NewRepairOrderForm";
import useTitle from '../../hooks/useTitle';

// New RepairOrde
const NewRepairOrder = () => {

  useTitle('KGTech: New Order');

  // get users
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id])
    }),
  })

  // get customers
  const { customers } = useGetCustomersQuery("customersList", {
    selectFromResult: ({ data }) => ({
      customers: data?.ids.map(id => data?.entities[id])
    }),
  })

  //get employees
  const { employees } = useGetEmployeesQuery("employeesList", {
    selectFromResult: ({ data }) => ({
      employees: data?.ids.map(id => data?.entities[id])
    }),
  })

  //if not true keep loading
  if (!users?.length || !customers?.length || !employees?.length ) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

  const content = <NewRepairOrderForm users={users} customers={customers} employees={employees} />

  return content;
}

export default NewRepairOrder
