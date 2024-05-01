import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowCircleLeft, faFileEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useAddNewRepairOrderMutation } from '../repairOrders/repairOrdersApiSlice';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import DashFormContainer from '../auth/dashboard/DashFormContainer';
import useAuth from "../../hooks/useAuth";

// Request New RepairOrder Form
const ReqNewRepairOrderForm = ({ repairRequest, customers, employees }) => {

    const { userid, isManager, isAdmin } = useAuth();

    // addNewRepairOrder Mutation
    const [addNewRepairOrder, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewRepairOrderMutation();

    

    const navigate = useNavigate();

    //get customer
    const customer = customers.find(customer => customer.user === repairRequest.customer);

    const [issueDesc, setIssueDesc] = useState(repairRequest.issueDesc);

    const [employeeAssignedId, setEmployeeAssignedId] = useState(employees[employees.length - 1].id);

    useEffect(() => {
        if (isSuccess) {
            // if successfull
          setIssueDesc(repairRequest?.issueDesc)
          setEmployeeAssignedId(employees[0].id)
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
    }, [isSuccess, repairRequest?.issueDesc, customer?.id, employees])

    useEffect(() => {
        if (isError) {
            // error notification
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
    
    const handleBackToRepairRequest = () => navigate(`/private/dash/repairrequests/view/${repairRequest.id}`);
    const handleBackToRepairOrders = () => navigate('/private/dash/repairorders');

    // get employee created
    const empCreated = employees.find(employee => employee.userid === userid);

    let content;

    if (empCreated) {

        const empCreatedId = empCreated.id;

        const onIssueDescChanged = e => setIssueDesc(e.target.value);
        const onEmployeeAssignedIdChanged = e => setEmployeeAssignedId(e.target.value);

        const canSave = [ issueDesc, empCreatedId, employeeAssignedId].every(Boolean) && !isLoading;

        // Save RepairOrder
        const onSaveRepairOrderClicked = async () => {
            if (canSave) {
            await addNewRepairOrder({ customer: customer.id, employeeCreated: empCreatedId, employeeAssigned: employeeAssignedId, deviceType: repairRequest.deviceType, serialNo: repairRequest.serialNo, brand: repairRequest.brand, issueDesc })
            }
        }

        const employeeOptions = employees.map(employee => {
            return (
            <option key={employee.id} value={employee.id}>
                {employee.user}
            </option>
            )
        })

        const errClass = (isError) ? "errmsg" : "offscreen";
        const validIssueDescClass = !issueDesc ? "form__input--incomplete" : '';
        const validEmployeeAssignedIdClass = !employeeAssignedId ? "form__input--incomplete" : '';

        // employee Assigned
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
                    <form className='form' onSubmit={e => e.preventDefault()}>
                        <div className='title-row bold'>
                            <p className="sm__device--cell">Order</p>
                            <p className="lg__device--cell">Repair Order</p>
                            <div className="row">
                                <p>Created By: </p>
                                <p className="sm__device--cell capitalize">{empCreated.user.length < 9 ? empCreated.user : (`${empCreated.user.substring(0, 8)}...`)}</p>
                                <p className="lg__device--cell capitalize">{empCreated.user}</p>
                            </div>

                            <div className='action-buttons'>
                                <button className='icon-button save-icon-button' title='Back to DashBoard'  onClick={handleBackToRepairRequest}
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
                        
                        <div className='row'>
                            <div className="form__column--divider">

                                {/* serial number */}
                                <div className="input--divider bg-light padding border">
                                    <div className="row--select">
                                        <label className='label' htmlFor='serialNo'>
                                            SerialNo: 
                                        </label>
                                        {repairRequest.serialNo}
                                    </div>
                                </div>

                                {/* device type */}
                                <div className="input--divider bg-light padding border">
                                    <div className="row--select">
                                        <label className='label' htmlFor='deviceType'>
                                            DEVICE TYPE: 
                                        </label>
                                        <p className='capitalize'>{repairRequest.deviceType}</p>
                                    </div>
                                </div>

                                {/* brand */}
                                <div className="input--divider bg-light padding border">
                                    <div className="row--select">
                                        <label className='label' htmlFor='brand'>
                                            BRAND: 
                                        </label>
                                        <p className='capitalize'>{repairRequest.brand}</p>
                                    </div>
                                </div>

                                {/* issue description */}
                                <div className='input--divider'>
                                    <label className='label' htmlFor='issueDesc'>
                                        ISSUE DESCRIPTION: 
                                    </label>
                                    <textarea className={`form__input form__input--text ${validIssueDescClass}`} id='issueDesc' name='issueDesc' autoComplete='off' placeholder='issue description' value={issueDesc} onChange={onIssueDescChanged} />
                                </div>
                            </div>

                            <div className="form__divider">
                                <div className="form__column--divide">
                                    {/* customer */}
                                    <div className="input--divider top-padding bg-light padding border">
                                        <div className="row">
                                            <label className='label' htmlFor='custUsername'>
                                                CUSTOMER:
                                            </label>
                                            <p className='capitalize'>{repairRequest.customer}</p>
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
                      <button className='icon-button save-icon-button' title='Back to DashBoard'  onClick={handleBackToRepairRequest}
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

export default ReqNewRepairOrderForm
