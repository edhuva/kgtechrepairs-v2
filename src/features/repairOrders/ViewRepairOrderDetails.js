import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faFileInvoice, faArrowCircleLeft, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { useGetEmployeesQuery } from '../employees/employeesApiSlice';
import { useNavigate } from 'react-router-dom';
import DashFormContainer from "../auth/dashboard/DashFormContainer";
import useAuth from '../../hooks/useAuth';

// View RepairOrder Details
const ViewRepairOrderDetails = ({ repairOrder, invoices }) => {

  //get employees
  const { employees } = useGetEmployeesQuery("employeesList", {
    selectFromResult: ({ data }) => ({
      employees: data?.ids.map(id => data?.entities[id])
    }),
  })

  const { isCustomer } = useAuth();

    const navigate = useNavigate();

    const handleEdit = () => navigate(`/private/dash/repairorders/${repairOrder.id}`);
    const handleBackToRepairOrders = () => navigate('/private/dash/repairorders');

    const created = new Date(repairOrder.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
    const updated = new Date(repairOrder.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});

    const assignedEmpClass = (repairOrder.employeeAssigned === employees[employees.length - 1].user) ? 'notYetAssigned capitalize' : 'capitalize';

    const invoice = invoices.find( invoice => invoice.repairOrderId === repairOrder.id);
    let handleInvoice;
    let InvoiceBtn;

    if (invoice) {
      handleInvoice = () => navigate(`/private/dash/invoices/view/${invoice.id}`);
      InvoiceBtn = (
        <button className='icon-button action-icon-button' title='View Invoce' onClick={handleInvoice}>
          <FontAwesomeIcon icon={faFileInvoice} />
        </button>
      )
    } else {
      handleInvoice = () => navigate(`/private/dash/repairorders/newinvoice/${repairOrder.id}`);
      InvoiceBtn = (
        <button className='icon-button action-icon-button' disabled={isCustomer ? true : false} title='Create Invoce' onClick={handleInvoice}>
          <FontAwesomeIcon icon={faFileInvoiceDollar} />
        </button>
      )
    }

    const content = (
        <>
            <div className='view'>
              <div className='view__container'>
                <div className='title-row bold'>
                  <p className="sm__device--cell">Order #{repairOrder.repairTicket}</p>
                  <p className="lg__device--cell">Repair Order #{repairOrder.repairTicket}</p>
                  <label className='label checkbox-container' htmlFor='order-complete'>
                    STATUS:
                    <label className=" table__cell--status margin">
                              { repairOrder.completed
                                  ? <span className="table__status--completed">Processed</span>
                                  : <span className="table__status--open">Awaiting</span>
                              }
                    </label>
                  </label>
              
                  <div className='action-buttons'>
                    <button className='icon-button action-icon-button' title='Back to RepairOrders' onClick={handleBackToRepairOrders}>
                        <FontAwesomeIcon icon={faArrowCircleLeft} />
                    </button>
                    <button className='icon-button action-icon-button'  title='Edit Repair Order' disabled={isCustomer ? true : false}
                        onClick={handleEdit}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    {InvoiceBtn}
                  </div>
                </div>

                <div className='row'>
                  <div className="form__column--divider shadow padding">

                    {/* device type */}
                    <div className="input--divider padding bg-light border">
                      <div className="row--select ">
                        <label className='label' htmlFor='deviceType'>
                          DEVICETYPE: </label>
                          <p className='capitalize'>{repairOrder.deviceType}</p>
                      </div>
                    </div>
                    
                    {/* serial number */}
                    <div className="input--divider padding bg-light border">
                      <div className="row--select ">
                        <label className='label' htmlFor='serialNo'>
                          SERIAL NO: </label>
                          <p>{repairOrder.serialNo}</p>
                      </div>
                    </div>
                    
                    {/* brand */}
                    <div className="input--divider padding bg-light border">
                      <div className="row--select ">
                        <label className='label' htmlFor='Brand'>
                          BRAND: </label>
                          <p className='capitalize'>{repairOrder.brand}</p>
                      </div>
                    </div>

                    {/* issue description */}
                    <div className="input--divider padding bg-light border ">
                      <div className="row--wrap ">
                        <label className='label' htmlFor='issueDesc'>
                          ISSUE DESCRIPTION: </label>
                        <p>{repairOrder.issueDesc}</p>
                      </div>
                    </div>
                    
                    {/* customer */}
                    <div className="input--divider bg-light padding top-margin border ">
                      <div className="row--select">
                        <label className='label' htmlFor='custUsername'>
                          CUSTOMER: </label>
                        <p className='capitalize'>{repairOrder.customer}</p>
                      </div>
                    </div>
                    
                    {/* assigned to */}
                    <div className="input--divider bg-light padding border">
                      <div className="row--select">
                        <label className='label' htmlFor='empUsername'>
                          ASSIGNED TO: </label>
                           <p className={assignedEmpClass}>{repairOrder.employeeAssigned}</p> 
                      </div>
                    </div>

                    {/* created by */}
                    <div className="input--divider bg-light padding border">
                      <div className="row--select">
                        <label className='label' htmlFor='empUsername'>
                          CREATED BY: </label>
                          <p className='capitalize'>{repairOrder.employeeCreated}</p>
                      </div>
                    </div>
                  </div>
                            
                  {/* dates */}
                  <div className="form__divider">
                    <div className="form__column--divide">
                      <div className="input--divider top-padding bg-light padding border">
                        <div className="row--select">
                          <label className='label' htmlFor='custUsername'>
                            CREATED: </label>
                          <p>{created}</p>
                        </div>
                      </div>
                      <div className="input--divider bg-light padding border">
                        <div className="row--select">
                          <label className='label' htmlFor='custUsername'>
                            UPDATED: </label>
                          <p>{updated}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
    )

  return (
    <>
      <DashFormContainer title='Repair Order Details' content={content} />
    </>
  )
}

export default ViewRepairOrderDetails
