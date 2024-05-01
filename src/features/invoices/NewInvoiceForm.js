import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowCircleLeft, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useAddNewInvoiceMutation, } from './invoicesApiSlice';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import DashFormContainer from '../auth/dashboard/DashFormContainer';

//input regex
const TOTAMOUNT_REGEX = /^[0-9+]{1,15}$/

// New Invoice Form
const NewInvoiceForm = ({ repairOrder }) => {

  // addNewInvoice Mutation
  const [addNewInvoice, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewInvoiceMutation();

  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState('');
  const [validTotalAmount, setValidTotalAmount] = useState(false)

  useEffect(() => {
    setValidTotalAmount(TOTAMOUNT_REGEX.test(totalAmount));
  }, [totalAmount])

  useEffect(() => {
    if (isSuccess) {
      //if successfull
        setTotalAmount('')
        toast('✅ Successfuly Created Invoice!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          color: "blue"
        });

      navigate(`/private/dash/invoices`)
      //window.location.reload();
    }

    return () => toast()
  }, [isSuccess, navigate])

  useEffect(() => {
    if (isError) {
      //error notification
      error?.data?.message ? toast.error(error.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }) 
        : toast.error('Network Error', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
    }

    return () => toast()

  }, [isError, error])

  const created = new Date().toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric'});

  const onTotalAmountChanged = e => setTotalAmount(e.target.value);

  
  const canSave = [validTotalAmount].every(Boolean) && !isLoading;

  //Save Invoice
  const onSaveInvoiceClicked = async () => {
    if (canSave) {
      await addNewInvoice({ repairOrderId: repairOrder.id, customer: repairOrder.customer, employee: repairOrder.employeeAssigned, deviceType: repairOrder.deviceType, totalAmount: totalAmount })
    }  
  }

  //confirm Invoice Save
  const confirmInvoiceSave = () => {
    ///* eslint-disable-next-line no-restricted-globals */
    let delet = window.confirm("Confirm Save");
    if (delet) {
      onSaveInvoiceClicked()
    }
  }

  const handleBackToRepairOrders = () => navigate('/private/dash/repairorders');
  const handleBackToInvoices = () => navigate('/private/dash/invoices');

  const errClass = (isError) ? "errmsg" : "offscreen";

  const validTotalAmountClass = !validTotalAmount ? "form__input--incomplete" : '';

  let contentLoading;
  contentLoading = isLoading && <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

  let errContent;
  // errContent = error?.data?.message ? error.data.message 
  //             : 'Network Error';
  errContent = error?.data?.message && 'Network Error';

  const content = (
    <>
      {contentLoading}
      <Notify />
      <p className={errClass}>{errContent}</p>

      <div className="form__container">
        <form className='form' onSubmit={e => e.preventDefault()}>
          <div className='title-row bold'>
            <p>New Invoice</p>
            <label className='label checkbox-container' htmlFor='order-complete'>
              PAID:
              <label className=" table__cell--status margin">
                <span className="table__status--open">Unpaid</span>
              </label>
            </label>

            <div className='action-buttons'>
              <button className='icon-button save-icon-button' title='Back to RepairOrders'  onClick={handleBackToRepairOrders}
                >
                <FontAwesomeIcon icon={faArrowCircleLeft} />
              </button>
              <button className='icon-button save-icon-button' title='Invoices List'  onClick={handleBackToInvoices}
                >
                <FontAwesomeIcon icon={faFileInvoice} />
              </button>
              <button className='icon-button action-icon-button save__btn' title='Save' 
              disabled={!canSave}
              onClick={() => confirmInvoiceSave()}>
                <FontAwesomeIcon icon={faSave} />
              </button>
            </div>
          </div>

          <div className='row'>
            <div className="form__column--divider">

              {/* amount */}
              <div className='input--divider'>
                <label className='label' htmlFor='totalAmount'>
                  Total Amount: 
                </label>
                <input className={`form__input ${validTotalAmountClass}`} id='totalAmount' name='totalAmount' type='text' autoComplete='off' placeholder='Total amount' value={totalAmount} onChange={onTotalAmountChanged} />
              </div>

              {/* device type */}
              <div className="input--divider bg-light padding border">
                <div className="row--select">
                  <label className='label' htmlFor='deviceType'>
                    DEVICE TYPE: 
                  </label>
                  <p className='capitalize'>{repairOrder.deviceType}</p>
                </div>
              </div>

              {/* serial number */}
              <div className="input--divider bg-light padding border">
                <div className="row--select">
                  <label className='label' htmlFor='deviceType'>
                    SERIAL NO: 
                  </label>
                  {repairOrder.serialNo}
                </div>
              </div>

              {/* customer */}
              <div className="input--divider padding bg-light border">
                <div className="row--select ">
                  <label className='label' htmlFor='custUsername'>
                    CUSTOMER: 
                  </label>
                  <p className='capitalize'>{repairOrder.customer}</p>
                </div>
              </div>

              {/* employee */}
              <div className="input--divider bg-light padding border">
                <div className="row--select">
                  <label className='label' htmlFor='empUsername'>
                    EMPLOYEE:
                  </label>
                  <p className='capitalize'>{repairOrder.employeeAssigned}</p>
                </div>
              </div>
            </div>
            
            {/* dates */}
            <div className="form__divider">
              <div className="form__column--divide">
                <div className="input--divider top-padding bg-light padding border">
                  <div className="row--select">
                    <label className='label' htmlFor='createdDate'>
                      CREATED:
                    </label>
                    <p>{created}</p>
                  </div>
                </div>
                        
                <div className="input--divider bg-light padding border">
                  <div className="row--select">
                    <label className='label' htmlFor='updatedDate'>
                      UPDATED:
                    </label>
                    <p>'******'</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )

  return(
    <>
      <DashFormContainer title="Create Invoice" content={content} />
    </>
  ) 
}

export default NewInvoiceForm
