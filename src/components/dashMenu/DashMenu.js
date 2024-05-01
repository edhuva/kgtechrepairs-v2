import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

// Dash Menu
const DashMenu = () => {

  const {isAdmin, isManager, isEmployee, isCustomer } = useAuth();
  
  return (
    <>
     <ul className='customer__view'>
      {(isCustomer || isEmployee || isManager || isAdmin) && <>
        <li><Link to="/private/dash">DashBoard</Link></li>
        <li><Link to="users/account">Account Details</Link></li>
        <li><Link to="invoices">View Invoices</Link></li>
        <li><Link to="repairorders">View Repair Orders</Link></li>
        <li><Link to="repairrequests"> View Repair Requests</Link></li>
      </>}

      {(isCustomer ) && <>
        <li><Link to="repairrequests/new">Book Repair Request</Link></li>
      </>}
    </ul>
    <ul className='employee__view'>
      {(isEmployee || isManager || isAdmin) && <>
        <li><Link to="repairorders/assigned">View Assigned Orders</Link></li>
        <li><Link to="repairorders/new">Add New Order</Link></li>
        <li><Link to="customers">View Customer Settings</Link></li>
        <li><Link to="customers/new">Add New Customer</Link></li>
      </>}
        
    </ul>
    <ul className='highEmployee__view'>
      {(isManager || isAdmin) && <>
        <li><Link to="customers/analysis">Customers Analysis</Link></li>
        <li><Link to="employees">View Employees Settings</Link></li>
        <li><Link to="employees/new">Add New Employee</Link></li>
        <li><Link to="employees/analysis">Employee Analysis</Link></li>
        <li><Link to="users">View User Settings</Link></li>
        <li><Link to="users/new">Add New User</Link></li>
      </>}
    </ul>
    </>
  )
}

export default DashMenu
