import { faFilePen, faFileAlt, faFileInvoice, faCodePullRequest, faUsers, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import DashboardCard from './DashboardCard';
import useAuth from '../../../hooks/useAuth';
import './Dashboard.css';


// DashboardContent
const DashboardContent = ({ employees, customers, repairOrders, repairRequests, invoices }) => {

    const { username, isCustomer, isEmployee, isManager, isAdmin } = useAuth();

    //filtered Data
    let repairOrdersFiltered = [...repairOrders];
    let repairRequestsFiltered = [...repairRequests];
    let invoicesFiltered = [...invoices];
    if (isCustomer) {
        //customer filtered Data
        repairOrdersFiltered = repairOrders.filter(repairOrder => repairOrder.customer === username);
        repairRequestsFiltered = repairRequests.filter(repairRequest => repairRequest.customer === username );
        invoicesFiltered = invoices.filter(invoice => invoice.customer === username)
    }

    //employee assigned orders
    let assignedRepairOrders = [];
    if (isEmployee || isManager || isAdmin) {
        assignedRepairOrders= repairOrders.filter(repairOrder => repairOrder.employeeAssigned === username );
    }

    //counters
    let countEmployees = 0;
    let countCustomers = 0;
    let countAssignedORepairOrders = 0;
    let countRepairOrders = repairOrdersFiltered?.length;
    
    let countRepairRequests = repairRequestsFiltered?.length;
    let countInvoices = invoicesFiltered?.length;

    countEmployees = (isManager || isAdmin) && employees?.length;
    countCustomers = (isEmployee || isManager || isAdmin) && customers?.length;
    countAssignedORepairOrders =  assignedRepairOrders?.length;

    //general user only
    let content = (
      <>
        <div className='dash__card--container center'>
          <p>Your Content here</p>
        </div>
      </>
    )

    //customer only
    if (isCustomer) {
      content = <>
        <div className='dash__card--container'>
          <DashboardCard cardIcon={faFilePen} cardCount={countRepairOrders} cardTitle='Repair Orders'/>
          <DashboardCard cardIcon={faFileInvoice} cardCount={countInvoices} cardTitle='Invoices'/>
          <DashboardCard cardIcon={faCodePullRequest} cardCount={countRepairRequests} cardTitle='Repair Requests'/>
        </div>
      </>
    }

    //employee
    if (isEmployee) {
     content = <>
        <div className='dash__card--container'>
            <DashboardCard cardIcon={faFilePen} cardCount={countRepairOrders} cardTitle='Repair Orders'/>
            <DashboardCard cardIcon={faFileAlt} cardCount={countAssignedORepairOrders} cardTitle='Assigned Repair Orders'/>
            <DashboardCard cardIcon={faFileInvoice} cardCount={countInvoices} cardTitle='Invoices'/>
            <DashboardCard cardIcon={faCodePullRequest} cardCount={countRepairRequests} cardTitle='Repair Requests'/>
            <DashboardCard cardIcon={faUsers} cardCount={countCustomers} cardTitle='Customers'/>
        </div>
      </>
    }

    //manager or admin
    if (isManager || isAdmin) {
    content = <>
      <div className='dash__card--container'>
          <DashboardCard cardIcon={faFilePen} cardCount={countRepairOrders} cardTitle='Repair Orders'/>
          <DashboardCard cardIcon={faFileAlt} cardCount={countAssignedORepairOrders} cardTitle='Assigned Repair Orders'/>
          <DashboardCard cardIcon={faFileInvoice} cardCount={countInvoices} cardTitle='Invoices'/>
          <DashboardCard cardIcon={faCodePullRequest} cardCount={countRepairRequests} cardTitle='Repair Requests'/>
          <DashboardCard cardIcon={faUsers} cardCount={countCustomers} cardTitle='Customers'/>
          <DashboardCard cardIcon={faUserPlus} cardCount={countEmployees} cardTitle='Employees'/>
      </div>
    </>
  }

  return content;
}

export default DashboardContent
