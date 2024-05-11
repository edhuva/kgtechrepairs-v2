import { useGetUsersQuery } from '../../users/usersApiSlice';
import { useGetEmployeesQuery } from '../../employees/employeesApiSlice';
import { useGetCustomersQuery } from '../../customers/customerApiSlice';
import { useGetRepairOrdersQuery } from '../../repairOrders/repairOrdersApiSlice';
import { useGetRepairRequestsQuery } from '../../repairRequests/repairRequestsApiSlice';
import { useGetInvoicesQuery } from '../../invoices/invoicesApiSlice';
import PulseLoader from 'react-spinners/PulseLoader';
import DashboardContent from './DashboardContent'
import useAuth from '../../../hooks/useAuth';

//DashBoard Container
const DashBoardContainer = () => {
    
    const { userid } = useAuth();

    //get users
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
          users: data?.ids.map(id => data?.entities[id])
        }),
    })

    console.log('Analysis')
    console.log('users')
    console.log(users?.length)

    //get employees
    const { employees } = useGetEmployeesQuery("EmployeesList", {
        selectFromResult: ({ data }) => ({
            employees: data?.ids.map( id => data?.entities[id])
        }),
    })

    console.log('employees')
    console.log(employees?.length)

    //get customers
    const { customers } = useGetCustomersQuery("CustomersList", {
        selectFromResult: ({ data }) => ({
            customers: data?.ids.map( id => data?.entities[id])
        }),
    })

    console.log('customers')
    console.log(customers?.length)

    //get repairOrders
    const { repairOrders } = useGetRepairOrdersQuery("RepairOrdersList", {
        selectFromResult: ({ data }) => ({
            repairOrders: data?.ids.map( id => data?.entities[id])
        }),
    })

    console.log('repair orders')
    console.log(repairOrders?.length)

    //repairRequests
    const { repairRequests } = useGetRepairRequestsQuery("RepairRequestsList", {
        selectFromResult: ({ data }) => ({
            repairRequests: data?.ids.map( id => data?.entities[id])
        }),
    })

    console.log('repair requests')
    console.log(repairRequests?.length)

    //invoices
    const { invoices } = useGetInvoicesQuery("InvoicesList", {
        selectFromResult: ({ data }) => ({
            invoices: data?.ids.map( id => data?.entities[id])
        }),
    })

    console.log('Analysis')
    console.log('invoices')
    console.log(invoices?.length)

    //if not true keep loading
    if (!users?.length || !employees?.length || !customers?.length || !repairOrders?.length || !repairRequests?.length || !invoices) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />

    console.log('Analysis checked *******')
    console.log('users')
    console.log(users?.length)
    console.log('employees')
    console.log(employees?.length)
    console.log('customers')
    console.log(customers?.length)
    console.log('repair orders')
    console.log(repairOrders?.length)
    console.log('repair requests')
    console.log(repairRequests?.length)
    console.log('invoices')
    console.log(invoices?.length)

    //get current user
    const user = users.find(user => user.id === userid);
 
    //if user display
    const content =user ? <DashboardContent user={user} users={users}employees={employees} customers={customers} repairOrders={repairOrders} repairRequests={repairRequests} invoices={invoices} />
    : <p> Something went wrong, please login again!</p>
    return content;
}

export default DashBoardContainer
