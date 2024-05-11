import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import PublicLayout from './layouts/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import DashLayout from './layouts/DashLayout';
import Home from './publicPages/Home';
import Company from './publicPages/company/Company';
import ContactUs from './publicPages/contact/ContactUs';
import DataRecovery from './publicPages/dataRecovery/DataRecovery';
import DesktopRepairs from './publicPages/desktopRepairs/DesktopRepairs';
import LaptopRepairs from './publicPages/laptopRepairs/LaptopRepairs';
import Parts from './publicPages/parts/Parts';
import PrivacyPolicy from './publicPages/privacyPolicy/PrivacyPolicy';
import ReturnsPolicy from './publicPages/returnsPolicy/ReturnsPolicy';
import Support from './publicPages/support/Support';
import TermsAndConds from './publicPages/terms&Conditions/TermsAndConds';
import Login from './features/auth/login/Login';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import Prefetch from './features/auth/Prefetch';
import Dashboard from './features/auth/dashboard/Dashboard';
import ScrollToTop from './components/backToTop/ScrollToTop';
import CustomersLIst from './features/customers/CustomersLIst';
import NewCustomerSignup from './features/auth/signup/NewCustomerSignup';
import NewCustomerForm from './features/customers/NewCustomerForm';
import ViewCustomer from './features/customers/ViewCustomer';
import EditCustomer from './features/customers/EditCustomer';
import UpdateCustAccount from './features/customers/UpdateCustAccount';
import CustomersAnalysis from './features/customers/CustomersAnalysis';
import EmployeesList from './features/employees/EmployeesList';
import NewEmployeeSignup from './features/auth/signup/NewEmployeeSignup';
import NewEmployeeForm from './features/employees/NewEmployeeForm';
import ViewEmployee from './features/employees/ViewEmployee';
import EditEmployee from './features/employees/EditEmployee';
import UpdateEmpAccount from './features/employees/UpdateEmpAccount';
import EmployeesAnalysis from './features/employees/EmployeesAnalysis';
import InvoicesList from './features/invoices/InvoicesList';
import NewInvoice from './features/invoices/NewInvoice';
import EditInvoice from './features/invoices/EditInvoice';
import ViewInvoice from './features/invoices/ViewInvoice';
import RepairOrdersList from './features/repairOrders/RepairOrdersList';
import RepairOrdersAssignedList from './features/repairOrders/RepairOrdersAssignedList';
import NewRepairOrder from './features/repairOrders/NewRepairOrder';
import ReqNewRepairOrder from './features/repairRequests/ReqNewRepairOrder';
import EditRepairOrder from './features/repairOrders/EditRepairOrder';
import ViewRepairOrder from './features/repairOrders/ViewRepairOrder';
import RepairRequestsList from './features/repairRequests/RepairRequestsList';
import NewRepairRequest from './features/repairRequests/NewRepairRequest';
import EditRepairRequest from './features/repairRequests/EditRepairRequest';
import ViewRepairRequest from './features/repairRequests/ViewRepairRequest';
import UsersList from './features/users/UsersList';
import NewUserForm from './features/users/NewUserForm';
import EditUser from './features/users/EditUser';
import UpdateUserAccount from './features/users/UpdateUserAccount';
import UserAccount from './features/users/UserAccount';
import ContactsList from './features/contacts/ContactsList';
import EditContact from './features/contacts/EditContact';
import ViewContact from './features/contacts/ViewContact';
import SubscriptionsList from './features/subscriptions/SubscriptionsList';
import EditSubscription from './features/subscriptions/EditSubscription';
import { ROLES } from './config/roles';
import './App.css';

function App() {

  const publicRoutes = (
    <>
          <Route path='about' element={<Company />} />
          <Route path='contactus' element={<ContactUs />} />
          <Route path='datarecovery' element={<DataRecovery />} />
          <Route path='desktoprepairs' element={<DesktopRepairs />} />
          <Route path='laptoprepairs' element={<LaptopRepairs />} />
          <Route path='parts' element={<Parts />} />
          <Route path='privacypolicy' element={<PrivacyPolicy />} />
          <Route path='returnspolicy' element={<ReturnsPolicy />} />
          <Route path='support' element={<Support />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<NewCustomerSignup />} />
          <Route path='signupemp' element={<NewEmployeeSignup />} />
          <Route path='terms&conditions' element={<TermsAndConds />} />
    </>
  )

  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* public routes */}
        <Route path="/" element={<PublicLayout />} >
          <Route index element={<Home />} />
          {publicRoutes}
          <Route path='register' element={<NewEmployeeSignup />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<PersistLogin />} >
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />} >
            <Route element={<Prefetch />} >
              <Route path='private' element={<ProtectedLayout />}>
                {publicRoutes}
                <Route path="dash" element={<DashLayout />}>
                  <Route index element={<Dashboard />} />
                  
                    <Route path="users">
                      <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                        <Route index element={<UsersList />} />
                        <Route path="new" element={<NewUserForm />} />
                        <Route path=":id" element={<EditUser />} />
                      </Route>
                      <Route path="account" element={<UserAccount />} />
                      <Route path="account/:id" element={<UpdateUserAccount />} />
                    </Route>
                    
                    <Route path="employees">
                      <Route element={<RequireAuth allowedRoles={[ ROLES.Manager, ROLES.Admin]} />}>
                        <Route index element={<EmployeesList />} />
                        <Route path="new" element={<NewEmployeeForm />} />
                        <Route path=":id" element={<EditEmployee />} />
                        <Route path="view/:id" element={<ViewEmployee />} />
                        <Route path="analysis" element={<EmployeesAnalysis />} />
                      </Route>
                      <Route element={<RequireAuth allowedRoles={[ROLES.Employee, ROLES.Manager, ROLES.Admin]} />}>
                        <Route path="account/:id" element={<UpdateEmpAccount />} />
                      </Route>
                    </Route>
                    
                    <Route path="customers">
                      <Route element={<RequireAuth allowedRoles={[ROLES.Employee, ROLES.Manager, ROLES.Admin]} />}>
                        <Route index element={<CustomersLIst />} />
                        <Route path="new" element={<NewCustomerForm />} />
                        <Route path=":id" element={<EditCustomer />} />
                        <Route path="view/:id" element={<ViewCustomer />} />
                      </Route>
                      <Route element={<RequireAuth allowedRoles={[ ROLES.Manager, ROLES.Admin]} />}>
                        <Route path="analysis" element={<CustomersAnalysis />} />
                      </Route>
                      <Route path="account/:id" element={<UpdateCustAccount />} />
                    </Route>

                    <Route path="repairorders">
                      <Route index element={<RepairOrdersList />} />
                      <Route path="view/:id" element={<ViewRepairOrder />} />
                      <Route element={<RequireAuth allowedRoles={[ROLES.Employee, ROLES.Manager, ROLES.Admin]} />}>
                        <Route path='assigned' element={<RepairOrdersAssignedList />} />
                        <Route path="new" element={<NewRepairOrder />} />
                        <Route path=":id" element={<EditRepairOrder />} />
                        <Route path="newinvoice/:orderid" element={<NewInvoice />} />
                      </Route>
                    </Route>

                    <Route path="invoices">
                      <Route index element={<InvoicesList />} />
                      <Route element={<RequireAuth allowedRoles={[ROLES.Employee, ROLES.Manager, ROLES.Admin]} />}>
                        <Route path="new" element={<NewInvoice />} />
                        <Route path=":id" element={<EditInvoice />} />
                      </Route>
                      <Route path="view/:id" element={<ViewInvoice />} />
                    </Route>

                    <Route path="repairrequests">
                      <Route index element={<RepairRequestsList />} />
                      <Route path="new" element={<NewRepairRequest />} />
                      <Route path=":id" element={<EditRepairRequest />} />
                      <Route path="view/:id" element={<ViewRepairRequest />} />
                      <Route element={<RequireAuth allowedRoles={[ROLES.Employee, ROLES.Manager, ROLES.Admin]} />}>
                        <Route path="reqnewrepairorder/:id" element={<ReqNewRepairOrder />} />
                      </Route>
                    </Route>

                    <Route path="contacts">
                      <Route element={<RequireAuth allowedRoles={[ROLES.Employee, ROLES.Manager, ROLES.Admin]} />}>
                        <Route index element={<ContactsList />} />
                        <Route path=":id" element={<EditContact />} />
                        <Route path="view/:id" element={<ViewContact />} />
                      </Route>
                    </Route>

                    <Route path="subscriptions">
                      <Route element={<RequireAuth allowedRoles={[ROLES.Employee, ROLES.Manager, ROLES.Admin]} />}>
                        <Route index element={<SubscriptionsList />} />
                        <Route path=":id" element={<EditSubscription />} />
                      </Route>
                    </Route>

                  </Route>{/* End Dash */}
                </Route> 
              </Route>
            </Route>{/* End RequireAuth Routes */}
          </Route>{/* End Protected Routes */}
        </Route>
     </Routes>
    </>
  )
}

export default App;
