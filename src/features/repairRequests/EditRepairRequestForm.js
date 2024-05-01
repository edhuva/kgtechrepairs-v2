import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useUpdateRepairRequestMutation, useDeleteRepairRequestMutation } from './repairRequestsApiSlice';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import DashFormContainer from '../auth/dashboard/DashFormContainer';
import useAuth from '../../hooks/useAuth';

//Edit RepairRequest Form 
const EditRepairRequestForm = ({ repairRequest, customers }) => {

    const { isCustomer } = useAuth();

    // updateRepairRequest Mutation
    const [updateRepairRequest, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateRepairRequestMutation();

    // deleteRepairRequest Mutation
    const [deleteRepairRequest, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteRepairRequestMutation();

    const navigate = useNavigate();

    //get customer
    const customer = customers.find(customer => customer.user === repairRequest.customer);

    const [deviceType, setDeviceType] = useState(repairRequest.deviceType);
    const [serialNo, setSerialNo] = useState(repairRequest.serialNo);
    const [brand, setBrand] = useState(repairRequest.brand);
    const [issueDesc, setIssueDesc] = useState(repairRequest.issueDesc);
    const [status, setStatus] = useState(repairRequest.status);

    useEffect(() => {
        if (isSuccess ) {
            //if successfull
          setDeviceType(repairRequest.deviceType)
          setSerialNo(repairRequest.serialNo)
          setIssueDesc(repairRequest.issueDesc)
          setBrand(repairRequest.brand)
          toast('✅ Successfuly Edited Repair Request!', {
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
    }, [isSuccess, repairRequest.deviceType, repairRequest.serialNo, repairRequest.issueDesc, repairRequest.brand])

    useEffect(() => {
        if(isDelSuccess) {
            // if successfull
            setDeviceType('')
            setSerialNo('')
            setIssueDesc('')
            setBrand('')

            navigate('/private/dash/repairrequests');
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

    const created = new Date(repairRequest.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
    const updated = new Date(repairRequest.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});

    const onDeviceTypeChanged = e => setDeviceType(e.target.value);
    const onSerialNoChanged = e => setSerialNo(e.target.value);
    const onBrandChanged = e => setBrand(e.target.value);
    const onIssueDescChanged = e => setIssueDesc(e.target.value);
    const onStatusChanged = e => setStatus(prev => !prev);
    
    const canSave = [deviceType, serialNo, issueDesc, brand].every(Boolean);

    // Save RepairRequest
    const onSaveRepairRequestClicked = async () => {
        if (canSave) {
          await updateRepairRequest({id: repairRequest.id, customer: customer.id, deviceType, serialNo, brand, issueDesc, status })
        }
        
    }

    
    // Delete RepairRequest
    const onDeleteRepairRequestClicked = async () => {
        await deleteRepairRequest({ id: repairRequest.id })
    }

    //alert Delete
    const alertDelete = () => {
        ///* eslint-disable-next-line no-restricted-globals */
        let delet = window.confirm("Confirm Delete");
        if (delet) {
          onDeleteRepairRequestClicked()
        }
      }

    const handleBackToRepairRequest = () => navigate('/private/dash/repairrequests');

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
    const validDeviceTypeClass = !deviceType ? "form__input--incomplete" : '';
    const validSerialNoClass = !serialNo ? "form__input--incomplete" : '';
    const validBrandClass = !brand ? "form__input--incomplete" : '';
    const validIssueDescClass = !issueDesc ? "form__input--incomplete" : '';

    let contentLoading;
    contentLoading = isLoading && <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;
  
    let errContent;
    errContent = (error?.data?.message || delerror?.data?.message) ?? 'Network Error';

    let statusDisplay;
     if (isCustomer) {
       statusDisplay = (
        <label className='label checkbox-container' htmlFor='request-status'>
            Status:
            <label className=" table__cell--status margin">
                { repairRequest.status
                    ? <span className="table__status--completed">Processed</span>
                    : <span className="table__status--open">Awaiting</span>
                }
            </label>
         </label>
       ) 
     } else {
        statusDisplay = (
            <label className='label form__checkbox-container' htmlFor='user-active'>
                Status:
                <input className='form__checkbox' id='request-status' name='request-status' type='checkbox' checked={status} onChange={onStatusChanged} />
            </label>
        )
     }

    const content = (
        <>
            {contentLoading}
            <Notify />
            <p className={errClass}>{errContent}</p>
            <div className='form__container'>
            <form className='form' onSubmit={e => e.preventDefault()}>
                <div className='title-row bold'>
                    <p className='sm__device--cell'>Request #{repairRequest.requestNo}</p>
                    <p className='lg__device--cell'>Edit Request #{repairRequest.requestNo}</p>
                    {statusDisplay}
                
                    <div className='action-buttons'>
                        <button className='icon-button action-icon-button' title='Back to Repair Requests' 
                        disabled={!canSave}
                        onClick={handleBackToRepairRequest}>
                            <FontAwesomeIcon icon={faArrowCircleLeft} />
                        </button>
                        <button className='icon-button action-icon-button save__btn' title='Save' 
                        disabled={!canSave}
                        onClick={onSaveRepairRequestClicked}>
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button className='icon-button action-icon-button' title='Delete' onClick={() => alertDelete()}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>

                <div className='row'>
                    <div className="form__column--divider">
                        
                        {/* device type */}
                        <div className='input--divider'>
                            <label className='label' htmlFor='deviceType'>
                                DeviceType: 
                            </label>
                            <input className={`form__input ${validDeviceTypeClass}`} id='deviceType' name='deviceType' type='text' autoComplete='off' placeholder='device type' value={deviceType} onChange={onDeviceTypeChanged} />
                        </div>
                        
                        {/* serial number */}
                        <div className='input--divider'>
                            <label className='label' htmlFor='serialNo'>
                                SerialNo: 
                            </label>
                            <input className={`form__input ${validSerialNoClass}`} id='serialNo' name='serialNo' type='text' autoComplete='off' placeholder='serial number' value={serialNo} onChange={onSerialNoChanged} />
                        </div>

                        {/* brand */}
                        <div className='input--divider'>
                            <label className='label' htmlFor='brand'>
                                Brand: 
                            </label>
                            <input className={`form__input ${validBrandClass}`} id='brand' name='brand' type='text' autoComplete='off' placeholder='brand' value={brand} onChange={onBrandChanged} />
                        </div>

                        {/* issue description */}
                        <div className='input--divider'>
                            <label className='label' htmlFor='issueDesc'>
                                Issue Description: 
                            </label>
                            <textarea className={`form__input form__input--text ${validIssueDescClass}`} id='issueDesc' name='issueDesc' autoComplete='off' placeholder='issue description' value={issueDesc} onChange={onIssueDescChanged} />
                         </div>
                    </div>

                    <div className="form__divider">
                        <div className="form__column--divide">

                            {/* customer */}
                            <div className="input--divider bg-light padding border">
                                <div className="row--select">
                                    <label className='form__label' htmlFor='custUsername'>
                                    CUSTOMER: </label>
                                    <p className='capitalize'>{repairRequest.customer}</p>
                                </div>
                            </div>      

                            {/* updated */}
                            <div className="input--divider top-padding bg-light padding border">
                                <div className="row--select">
                                <label className='label' htmlFor='created'>
                                    CREATED: </label>
                                <p>{created}</p>
                                </div>
                                </div>
                                <div className="input--divider bg-light padding border">
                                <div className="row--select">
                                    <label className='label' htmlFor='updated'>
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
          <DashFormContainer title="Edit Repair Request" content={content} />
        </>
      ) 
}

export default EditRepairRequestForm
