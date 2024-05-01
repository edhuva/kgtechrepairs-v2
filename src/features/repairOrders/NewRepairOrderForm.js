import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewRepairOrderMutation } from "./repairOrdersApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowCircleLeft, faFileEdit } from "@fortawesome/free-solid-svg-icons";
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import DashFormContainer from "../auth/dashboard/DashFormContainer";
import useAuth from "../../hooks/useAuth";

// New RepairOrder Form
const NewRepairOrderForm = ({ users, customers, employees }) => {

  // addNewRepairOrder Mutation
  const [addNewRepairOrder, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewRepairOrderMutation();

  const { userid, isManager, isAdmin } = useAuth();

  const navigate = useNavigate();

  const [deviceType, setDeviceType] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [brand, setBrand] = useState('');
  const [issueDesc, setIssueDesc] = useState('');
  const [customerId, setCustomerId] = useState(customers[0].id);
  const [employeeAssignedId, setEmployeeAssignedId] = useState(employees[employees.length - 1].id);

  useEffect(() => {
    if (isSuccess) {
      //if successful
      setDeviceType('')
      setSerialNo('')
      setIssueDesc('')
      setBrand('')
      setCustomerId('')
      setEmployeeAssignedId('')
      toast('✅ Successfuly Created RepairOrder!', {
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

  const handleBackToDash = () => navigate('/private/dash');
  const handleBackToRepairOrders = () => navigate('/private/dash/repairorders');

  //current active employee
  const empCreated = employees.find(employee => employee.userid === userid);
  
  let content;

  if (empCreated) {

    const onDeviceTypeChanged = e => setDeviceType(e.target.value);
    const onSerialNoChanged = e => setSerialNo(e.target.value);
    const onBrandChanged = e => setBrand(e.target.value);
    const onIssueDescChanged = e => setIssueDesc(e.target.value);
    const onCustomerIdChanged = e => setCustomerId(e.target.value);
    const onEmployeeAssignedIdChanged = e => setEmployeeAssignedId(e.target.value);

    const canSave = [deviceType, serialNo, issueDesc, customerId, brand, employeeAssignedId].every(Boolean) && !isLoading;

    // Save RepairOrder
    const onSaveRepairOrderClicked = async () => {
      if (canSave) {
        await addNewRepairOrder({ customer: customerId, employeeCreated: empCreated.id, employeeAssigned: employeeAssignedId, deviceType, serialNo, brand, issueDesc })
      }
    }

    const customerOptions = customers.map(customer => {
      return (
        <option key={customer.id} value={customer.id}>
          {customer.user}
        </option>
      )
    })

    const employeeOptions = employees.map(employee => {
      return (
        <option key={employee.id} value={employee.id}>
          {employee.user}
        </option>
      )
    })

    const errClass = isError ? "errmsg" : "offscreen";
    const validDeviceTypeClass = !deviceType ? "form__input--incomplete" : '';
    const validSerialNoClass = !serialNo ? "form__input--incomplete" : '';
    const validBrandClass = !brand ? "form__input--incomplete" : '';
    const validIssueDescClass = !issueDesc ? "form__input--incomplete" : '';
    const validCustomerIdClass = !customerId ? "form__input--incomplete" : '';
    const validEmployeeAssignedIdClass = !employeeAssignedId ? "form__input--incomplete" : '';

    // assigned employee
    const employeeAssigned =(isManager || isAdmin) 
      ? <div className="input--divider">
          <div className="row--select">
            <label className='label' htmlFor='empUsername'>
              ASSIGNED: 
            </label>
            <select id="empUsername" name="empUsername" className={`form__select  ${validEmployeeAssignedIdClass}`} value={employeeAssignedId} onChange={onEmployeeAssignedIdChanged}>
              {employeeOptions}
            </select> 
          </div>
        </div>
      : <div className="input--divider bg-light padding border">
          <div className="row--select">
            <label className='label' htmlFor='custUsername'>
              ASSIGNED:  
            </label>
            <p className='notYetAssigned capitalize'>{employees[employees.length - 1].user}</p>
          </div>
        </div>

  const customer = <select id="custUsername" name="custUsername" className={`form__select ${validCustomerIdClass}`} value={customerId} onChange={onCustomerIdChanged}>
  {customerOptions}
  </select>
    
    let contentLoading;
    contentLoading = isLoading && <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

    let errContent;
    errContent = error?.data?.message ? error.data.message : 'Network Error';

    content = (
      <>
        {contentLoading}
        <Notify />
        <p className={errClass}>{errContent}</p>

        <div className="form__container">
          <form className="form" onSubmit={e => e.preventDefault()}>
            <div className='title-row bold'>
              <p className="sm__device--cell">Order</p>
              <p className="lg__device--cell">Repair Order</p>
              <div className="row">
                <p>Created By: </p>
                <p className="sm__device--cell capitalize">{empCreated.user.length < 9 ? empCreated.user : (`${empCreated.user.substring(0, 8)}...`)}</p>
                <p className="lg__device--cell capitalize">{empCreated.user}</p>
              </div>
              <div className='action-buttons'>
                <button className='icon-button save-icon-button' title='Back to DashBoard'  onClick={handleBackToDash}
                  >
                  <FontAwesomeIcon icon={faArrowCircleLeft} />
                </button>
                <button className='icon-button save-icon-button' title='Repair Orders List' onClick={handleBackToRepairOrders} 
                >
                  <FontAwesomeIcon icon={faFileEdit} />
                </button>
                <button className='icon-button save-icon-button save__btn' title='Save' 
                  disabled={!canSave} onClick={onSaveRepairOrderClicked}
                  >
                  <FontAwesomeIcon icon={faSave} />
                </button>
              </div>
            </div>

            <div className="row">
              <div className="form__column--divider">

                {/* device type */}
                <div className='input--divider'>
                  <label className='abel' htmlFor='deviceType'>
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
              
              {/* customer */}
              <div className="form__divider">
                <div className="form__column--divide">
                  <div className="input--divider">
                    <div className="row">
                      <label className='label' htmlFor='custUsername'>
                        CUSTOMER: </label>
                        <p className="capitalize">{customer}</p>
                    </div>
                  </div>

                  {/* employee assigned */}
                  {employeeAssigned}
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  } else {
    content = (
      <>
        <div className="form__container">
          <form className="form" onSubmit={e => e.preventDefault()}>
            <div className='title-row bold'>
                <p className="sm__device--cell">Order</p>
                <p className="lg__device--cell">Repair Order</p>
                <div className='action-buttons'>
                  <button className='icon-button save-icon-button' title='Back to DashBoard'  onClick={handleBackToDash}
                    >
                    <FontAwesomeIcon icon={faArrowCircleLeft} />
                  </button>
                  <button className='icon-button save-icon-button' title='Repair Orders List' onClick={handleBackToRepairOrders} 
                  >
                    <FontAwesomeIcon icon={faFileEdit} />
                  </button>
                </div>
            </div>

            <div className="row">
              <p>You don't have permission</p>
            </div>
          
          </form>
        </div>
      </>
    )
  }

  return (
    <>
      <DashFormContainer title="Add New Repair Order" content={content} />
    </>
  )
}

export default NewRepairOrderForm
