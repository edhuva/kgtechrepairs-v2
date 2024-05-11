import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useUpdateInvoiceMutation, useDeleteInvoiceMutation } from './invoicesApiSlice';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import DashFormContainer from '../auth/dashboard/DashFormContainer';

//input regex
const TOTAMOUNT_REGEX = /^[0-9+]{1,15}$/

// Edit Invoice Form
const EditInvoiceForm = ({ invoice, repairOrders }) => {

    // updateInvoice Mutation
    const [updateInvoice, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateInvoiceMutation();

    // deleteInvoice Mutation
    const [deleteInvoice, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteInvoiceMutation();

    const navigate = useNavigate();

    const [totalAmount, setTotalAmount] = useState(invoice.totalAmount);
    const [validTotalAmount, setValidTotalAmount] = useState(false)
    const [paid, setPaid] = useState(invoice.paid);

    useEffect(() => {
        setValidTotalAmount(TOTAMOUNT_REGEX.test(totalAmount));
      }, [totalAmount])

    useEffect(() => {
        if (isSuccess ) {
            //if successfull
            setTotalAmount(invoice?.totalAmount)
            toast('✅ Successfuly Edited Invoice!', {
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
        }

        return () => toast()
    }, [isSuccess, invoice.totalAmount, navigate])

    useEffect(() => {
        if(isDelSuccess) {
            //if successfull
          setTotalAmount('')
         
          navigate('/private/dash/invoices');
        //   window.location.reload();
        }
        
        return () => toast()
      }, [isDelSuccess, navigate])
      
    useEffect(() => {
        if (isError || isDelError ) {
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
            : delerror?.data?.message ? toast.error(delerror.data.message, {
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
    
      }, [isError, isDelError, delerror, error])
    
    const created = new Date(invoice.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
    const updated = new Date(invoice.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});

    const onTotalAmountChanged = e => setTotalAmount(e.target.value);
    const onPaidChanged = e => setPaid(prev => !prev);

    const canSave = [validTotalAmount].every(Boolean) && !isLoading;

    //Save Invoice
    const onSaveInvoiceClicked = async () => {
        if (canSave) {
          await updateInvoice({ id: invoice.id, repairOrderId: invoice.repairOrderId, customer: invoice.customer, employee: invoice.employee, deviceType: invoice.deviceType, serialNo: invoice.serialNo, totalAmount: totalAmount, paid: paid })
        }
        
    }

    //Delete Invoice
    const onDeleteInvoiceClicked = async () => {
        await deleteInvoice({ id: invoice.id })
    }
    
    //alert Delete
    const alertDelete = () => {
        ///* eslint-disable-next-line no-restricted-globals */
        let delet = window.confirm("Confirm Delete");
        if (delet) {
          onDeleteInvoiceClicked()
        }
      }

    const handleBackToInvoices = () => navigate('/private/dash/invoices');

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
  const validTotalAmountClass = !validTotalAmount ? "form__input--incomplete" : '';

  let contentLoading;
  contentLoading = isLoading && <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

  let errContent;
  errContent = (error?.data?.message || delerror?.data?.message) ?? 'Network Error';


  const content = (
    <>
        {contentLoading}
        <Notify />
        <p className={errClass}>{errContent}</p>

        <div className='form__container'>
            <form className='form' onSubmit={e => e.preventDefault()}>
                <div className='title-row bold'>
                    <p className='sm__device--cell'>Invoice #{invoice.invoiceNo}</p>
                    <p className='lg__device--cell'>Edit Invoice #{invoice.invoiceNo}</p>
                    <label className='label form__checkbox-container' htmlFor='invoice-paid'>
                    PAID:
                        <input className='form__checkbox' id='invoice-paid' name='invoice-paid' type='checkbox' checked={paid} onChange={onPaidChanged} />
                    </label>
                
                    <div className='action-buttons'>
                        <button className='icon-button action-icon-button' title='Back to Invoices' 
                        disabled={!canSave}
                        onClick={handleBackToInvoices}>
                            <FontAwesomeIcon icon={faArrowCircleLeft} />
                        </button>
                        <button className='icon-button action-icon-button save__btn' title='Save' 
                        disabled={!canSave}
                        onClick={onSaveInvoiceClicked}>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button className='icon-button action-icon-button' title='Delete' onClick={() => alertDelete()}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>

            <div className='row'>
                <div className="form__column--divider">
                   
                   {/* amount */}
                    <div className='input--divider'>
                        <label className='label' htmlFor='totalAmount'>
                        Total Amount '(Rands)': 
                        </label>
                        <input className={`form__input ${validTotalAmountClass}`} id='totalAmount' name='totalAmount' type='text' autoComplete='off' placeholder='Total amount' value={totalAmount} onChange={onTotalAmountChanged} />
                    </div>

                    {/* device type */}
                    <div className="input--divider bg-light padding border">
                        <div className="row--select">
                            <label className='label' htmlFor='empUsername'>
                            DEVICE TYPE: </label>
                            <span className='capitalize'>{invoice.deviceType}</span>
                        </div>
                    </div>

                    {/* serial number */}
                    <div className="input--divider bg-light padding border">
                        <div className="row--select">
                            <label className='label' htmlFor='empUsername'>
                            SERIAL NO: </label>
                            {invoice.serialNo}
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
                
            </form>
        </div>
    </>
  )

  return(
    <>
      <DashFormContainer title="Edit Invoice" content={content} />
    </>
  ) 
}
export default EditInvoiceForm
