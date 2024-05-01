import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewRepairRequestMutation } from './repairRequestsApiSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faCodePullRequest, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import DashFormContainer from "../auth/dashboard/DashFormContainer";
import useAuth from "../../hooks/useAuth";

// New RepairRequest Form
const NewRepairRequestForm = ({ customers }) => {

  const { userid } = useAuth(0);

  // addNewRepairRequest Mutation
  const [addNewRepairRequest, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewRepairRequestMutation();

  const navigate = useNavigate();

  const [deviceType, setDeviceType] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [brand, setBrand] = useState('');
  const [issueDesc, setIssueDesc] = useState('');

  useEffect(() => {
    if (isSuccess) {
      // if successfull
      setDeviceType('')
      setSerialNo('')
      setIssueDesc('')
      setBrand('')
      toast('✅ Successfuly Created Repair Request!', {
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
  }, [isSuccess])

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


  const customer = customers.find(customer => customer.userid === userid)
  const customerId = userid && customer.id;

  const onDeviceTypeChanged = e => setDeviceType(e.target.value);
  const onSerialNoChanged = e => setSerialNo(e.target.value);
  const onBrandChanged = e => setBrand(e.target.value);
  const onIssueDescChanged = e => setIssueDesc(e.target.value);

  const canSave = [deviceType, serialNo, issueDesc, brand].every(Boolean);

  // Save RepairRequest
  const onSaveRepairRequestClicked = async () => {
    if (canSave) {
      await addNewRepairRequest({ customer: customerId, deviceType, serialNo, brand, issueDesc })
    }
  }

  const handleBackToDash = () => navigate('/private/dash');
  const handleBackToRepairRequests = () => navigate('/private/dash/repairrequests');

  const errClass = isError ? "errmsg" : "offscreen";
  const validDeviceTypeClass = !deviceType ? "form__input--incomplete" : '';
  const validSerialNoClass = !serialNo ? "form__input--incomplete" : '';
  const validBrandClass = !brand ? "form__input--incomplete" : '';
  const validIssueDescClass = !issueDesc ? "form__input--incomplete" : '';

  let contentLoading;
  contentLoading = isLoading && <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

  let errContent;
  errContent = error?.data?.message ? error.data.message : 'Network Error';

  const content = (
    <>
      {contentLoading}
      <Notify />
      <p className={errClass}>{errContent}</p>

      <div className="form__container">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className='title-row bold'>
            <p className='sm__device--cell'>Request</p>
            <p className='lg__device--cell'>Repair Request</p>
            <div className="row">
              <p>Customer: </p>
              <p className="sm__device--cell capitalize">{customer.user.length < 9 ? customer.user : (`${customer.user.substring(0, 8)}...`)}</p>
              <p className="lg__device--cell capitalize">{customer.user}</p>
            </div>
            <div className='action-buttons'>
              <button className='icon-button save-icon-button' title='Back to RepairOrders'  onClick={handleBackToDash}
                >
                <FontAwesomeIcon icon={faArrowCircleLeft} />
              </button>
              <button className='icon-button save-icon-button' title='Repair Requests List' onClick={handleBackToRepairRequests}
                >
                <FontAwesomeIcon icon={faCodePullRequest} />
              </button>
              <button className='icon-button save-icon-button save__btn' title='Save' onClick={onSaveRepairRequestClicked}
                disabled={!canSave}
                >
                <FontAwesomeIcon icon={faSave} />
              </button>
            </div>
          </div>

          <div className="row">
            <div className="form__column--divider">
              <div className='input--divider'>
                
                {/* device type */}
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
          </div>
        </form>
      </div>      
    </>
  )

  return (
     <>
      <DashFormContainer title="Add New Repair Request" content={content} />
    </>
  )
}

export default NewRepairRequestForm
