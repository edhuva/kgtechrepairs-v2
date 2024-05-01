import { store } from '../../app/store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { usersApiSlice } from '../users/usersApiSlice';
import { employeesApiSlice } from '../employees/employeesApiSlice';
import { customerApiSlice } from '../customers/customerApiSlice';
import {invoicesApiSlice } from '../invoices/invoicesApiSlice';
import { repairOrdersApiSlice } from '../repairOrders/repairOrdersApiSlice';
import { repairRequestsApiSlice } from '../repairRequests/repairRequestsApiSlice';

//Prefetch Data
const Prefetch = () => {

    useEffect(() => {
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }));
        store.dispatch(employeesApiSlice.util.prefetch('getEmployees', 'employeesList', { force: true }));
        store.dispatch(customerApiSlice.util.prefetch('getCustomers', 'customersList', { force: true }));
        store.dispatch(repairOrdersApiSlice.util.prefetch('getRepairOrders', 'repairOrdersList', { force: true }));
        store.dispatch(invoicesApiSlice.util.prefetch('getInvoices', 'invoicesList', { force: true }));
        store.dispatch(repairRequestsApiSlice.util.prefetch('getRepairRequests', 'repairRequestsList', { force: true }));
    }, [])

  return <Outlet />
}

export default Prefetch
