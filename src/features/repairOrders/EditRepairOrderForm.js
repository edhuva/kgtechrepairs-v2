import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useUpdateRepairOrderMutation, useDeleteRepairOrderMutation } from './repairOrdersApiSlice';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import DashFormContainer from '../auth/dashboard/DashFormContainer';
import useAuth from '../../hooks/useAuth';

//Edit RepairOrder Form
const EditRepairOrderForm = ({ repairOrder, customers, employees }) => {

  const { isManager, isAdmin } = useAuth();

  //updateRepairOrder Mutation
  const [updateRepairOrder, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateRepairOrderMutation();

  //deleteRepairOrder Mutation
  const [deleteRepairOrder, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteRepairOrderMutation();

    const navigate = useNavigate();

    const customer = customers.find(customer => customer.user === repairOrder.customer);

    const employee = employees.find(employee => employee.user === repairOrder.employeeAssigned)

    const [deviceType, setDeviceType] = useState(repairOrder.deviceType);
    const [serialNo, setSerialNo] = useState(repairOrder.serialNo);
    const [brand, setBrand] = useState(repairOrder.brand);
    const [issueDesc, setIssueDesc] = useState(repairOrder.issueDesc);
    const [customerId, setCustomerId] = useState(customer.id);
    const [employeeAssignedId, setEmployeeAssignedId] = useState(employee.id);
    const [completed, setCompleted] = useState(repairOrder.completed);
    
    useEffect(() => {
      if (isSuccess) {
        //if sucessfull
        setDeviceType(repairOrder?.deviceType)
        setSerialNo(repairOrder?.serialNo)
        setIssueDesc(repairOrder.issueDesc)
        setBrand(repairOrder.brand)
        setCustomerId(customer?.id)
        setEmployeeAssignedId(employee?.id)

        toast('✅ Successfuly Edited RepairOrder!', {
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
    }, [isSuccess, repairOrder?.deviceType, repairOrder?.serialNo, repairOrder.issueDesc, repairOrder.brand, customer, employee])

    useEffect(() => {
      if(isDelSuccess) {
        //if successfull
        setDeviceType('')
        setSerialNo('')
        setIssueDesc('')
        setBrand('')
        setCustomerId('')
        setEmployeeAssignedId('')
       
        navigate('/private/dash/repairOrders');
        //window.location.reload();
      }
          
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

    const employeeCreated = repairOrder.employeeCreated;

    const created = new Date(repairOrder.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
    const updated = new Date(repairOrder.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});

  const onDeviceTypeChanged = e => setDeviceType(e.target.value);
  const onSerialNoChanged = e => setSerialNo(e.target.value);
  const onBrandChanged = e => setBrand(e.target.value);
  const onIssueDescChanged = e => setIssueDesc(e.target.value);
  const onEmployeeAssignedIdChanged = e => setEmployeeAssignedId(e.target.value);
  const onCompletedChanged = e => setCompleted(prev => !prev);

  const canSave = [deviceType, serialNo, issueDesc, customerId, brand, employeeCreated, employeeAssignedId].every(Boolean);

  // Save RepairOrder
  const onSaveRepairOrderClicked = async () => {
    if (canSave) {
      await updateRepairOrder({id: repairOrder.id, customer: customerId, employeeCreated, employeeAssigned: employeeAssignedId, deviceType, serialNo, brand, issueDesc, completed })
    }
    
  }

  // Delete RepairOrder
  const onDeleteRepairOrderClicked = async () => {
    await deleteRepairOrder({ id: repairOrder.id })
  }

  const alertDelete = () => {
    ///* eslint-disable-next-line no-restricted-globals */
    let delet = window.confirm("Confirm Delete");
    if (delet) {
      onDeleteRepairOrderClicked()
    }
  }

  const handleBackToRepairOrders = () => navigate('/private/dash/repairOrders');

  const employeeOptions = employees.map(employee => {
    return (
      <option key={employee.id} value={employee.id}>
        {employee.user}
      </option>
    )
  })

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
  const validDeviceTypeClass = !deviceType ? "form__input--incomplete" : '';
  const validSerialNoClass = !serialNo ? "form__input--incomplete" : '';
  const validBrandClass = !brand ? "form__input--incomplete" : '';
  const validIssueDescClass = !issueDesc ? "form__input--incomplete" : '';
  const validEmployeeAssignedIdClass = !employeeAssignedId ? "form__input--incomplete" : '';

  const assignedEmpClass = (employee.user === employees[employees.length - 1].user) ? 'capitalize notYetAssigned' : 'capitalize';

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
          <p className={assignedEmpClass}>{employee.user}</p>
        </div>
      </div>

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
            <p className="sm__device--cell">Order #{repairOrder.repairTicket}</p>
            <p className="lg__device--cell">Repair Order #{repairOrder.repairTicket}</p>
            <label className='label form__checkbox-container' htmlFor='user-active'>
              STATUS:
              <input className='form__checkbox' id='order-completed' name='order-completed' type='checkbox' checked={completed} onChange={onCompletedChanged} />
            </label>
              
            <div className='action-buttons'>
              <button className='icon-button save-icon-button' title='Back to RepairOrders'  onClick={handleBackToRepairOrders}
                >
                  <FontAwesomeIcon icon={faArrowCircleLeft} />
                </button>
              <button className='icon-button action-icon-button save__btn' title='Save' 
              disabled={!canSave}
              onClick={onSaveRepairOrderClicked}>
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
                    <label className='label' htmlFor='custUsername'>
                      CUSTOMER: </label>
                    <p className='capitalize'>{repairOrder.customer}</p>
                  </div>
                </div>
                
                {/* employee */}
                {employeeAssigned}

                {/* dates */}
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
      <DashFormContainer title="Edit Repair Order" content={content} />
    </>
  ) 
}

export default EditRepairOrderForm
