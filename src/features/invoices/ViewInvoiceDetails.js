import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faArrowCircleLeft, faFileAlt} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import DashFormContainer from "../auth/dashboard/DashFormContainer";
import useAuth from '../../hooks/useAuth';

//View Invoice Details
const ViewInvoiceDetails = ({ invoice }) => {

  const { isCustomer } = useAuth();

  const navigate = useNavigate();

  const handleEdit = () => navigate(`/private/dash/invoices/${invoice.id}`);
  const handleBackToRepairOrder = () => navigate(`/private/dash/repairorders/view/${invoice.repairOrderId}`);
  const handleBackToInvoices = () => navigate('/private/dash/invoices');

    const created = new Date(invoice.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
    const updated = new Date(invoice.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
    
  const content = (
    <>
      <div className='view'>
        <div className='view__container'>
          <div className='title-row bold'>
            <p className='sm__device--cell'>Invoice #{invoice.invoiceNo}</p>
            <p className='lg__device--cell'>View Invoice #{invoice.invoiceNo}</p>
            <label className='label checkbox-container' htmlFor='order-complete'>
              Paid:
              <label className=" table__cell--status margin">
                { invoice.paid
                  ? <span className="table__status--completed">Paid</span>
                  : <span className="table__status--open">Unpaid</span>
                }
              </label>
            </label>

            <div className='action-buttons'>
              <button className='icon-button action-icon-button' title='Back to Invoces' onClick={handleBackToInvoices}>
                <FontAwesomeIcon icon={faArrowCircleLeft} />
              </button>
              <button className='icon-button action-icon-button' title='View RepairOrder' onClick={handleBackToRepairOrder}>
                <FontAwesomeIcon icon={faFileAlt} />
              </button>
              <button className='icon-button action-icon-button' title='Edit Invoice' disabled={isCustomer ? true : false}
                onClick={handleEdit}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </div>
          </div>

          <div className='row'>
            <div className="form__column--divider shadow padding">
              {/* amount */}
              <div className="input--divider padding bg-light border">
                <div className="row--select ">
                  <label className='label' htmlFor='totalAmount'>
                    TOTAL AMOUNT: </label>
                  <p>{invoice.totalAmount}</p>
                </div>
              </div>
                
                {/* device type */}
              <div className="input--divider padding bg-light border">
                <div className="row--select ">
                  <label className='label' htmlFor='deviceType'>
                    DEVICETYPE: </label>
                  <p className='capitalize'>{invoice.deviceType}</p>
                </div>
              </div>

                {/* serial number */}
              <div className="input--divider padding bg-light border">
                <div className="row--select ">
                  <label className='label' htmlFor='deviceType'>
                    SERIAL NO: </label>
                  <p>{invoice.serialNo}</p>
                </div>
              </div>
                
                {/* customer */}
              <div className="input--divider padding bg-light border">
                <div className="row--select ">
                  <label className='label' htmlFor='custUsername'>
                    CUSTOMER: </label>
                  <p className='capitalize'>{invoice.customer}</p>
                </div>
              </div>

              {/* employee */}
              <div className="input--divider bg-light padding border">
                <div className="row--select">
                  <label className='label' htmlFor='empUsername'>
                    EMPLOYEE: </label>
                  <p className='capitalize'>{invoice.employee}</p>
                </div>
              </div>
            </div>
            
            {/* dates */}
            <div className="form__divider">
            <div className="form__column--divide">
              <div className="input--divider top-padding bg-light padding border">
                <div className="row--select">
                  <label className='label' htmlFor='createdDate'>
                    CREATED: </label>
                  <p>{created}</p>
                </div>
              </div>

              <div className="input--divider bg-light padding border">
                <div className="row--select">
                  <label className='label' htmlFor='updatedDate'>
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

  return(
    <>
      <DashFormContainer title="View Invoice" content={content} />
    </>
  ) 
}

export default ViewInvoiceDetails
