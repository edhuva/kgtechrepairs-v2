import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft, faPenToSquare, faFileAlt, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import DashFormContainer from "../auth/dashboard/DashFormContainer";
import useAuth from '../../hooks/useAuth';

// View RepairRequest Details
const ViewRepairRequestDetails = ({ repairRequest, repairOrders }) => {

    const { isCustomer } = useAuth();
  
    const navigate = useNavigate();

    const handleEdit = () => navigate(`/private/dash/repairrequests/${repairRequest.id}`);
    const handleBackToRepairRequests = () => navigate('/private/dash/repairrequests');

    const created = new Date(repairRequest.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
    const updated = new Date(repairRequest.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});

    // get repairOrder
    const repairOrder = repairOrders.find( repairOrder => repairOrder.serialNo === repairRequest.serialNo);
    
    let handleRepairOrder;
    let repairOrderBtn;

    if (repairOrder ) {
        // display view repairOrder button
      handleRepairOrder = () => navigate(`/private/dash/repairorders/view/${repairOrder.id}`);
      repairOrderBtn = (
        <button className='icon-button action-icon-button' title='View RepairOrder'  onClick={handleRepairOrder}>
          <FontAwesomeIcon icon={faFileAlt} />
        </button>
      )
    } else {
         // display create repairOrder button
      handleRepairOrder = () => navigate(`/private/dash/repairrequests/reqnewrepairorder/${repairRequest.id}`);
      repairOrderBtn = (
        <button className='icon-button action-icon-button' title='Create RepairOrder' disabled={isCustomer ? true : false} onClick={handleRepairOrder}>
          <FontAwesomeIcon icon={faFileCirclePlus} />
        </button>
      )
    }

    const content = (
        <>
            <div className='view'>
                <div className='view__container'>
                    <div className='title-row bold'>
                        <p className='sm__device--cell'>Request #{repairRequest.requestNo}</p>
                        <p className='lg__device--cell'>View Request #{repairRequest.requestNo}</p>
                        <label className='label checkbox-container' htmlFor='request-status'>
                            Status:
                            <label className=" table__cell--status margin">
                                    { repairRequest.status
                                        ? <span className="table__status--completed">Processed</span>
                                        : <span className="table__status--open">Awaiting</span>
                                    }
                            </label>
                        </label>
                
                        <div className='action-buttons'>
                            <button className='icon-button action-icon-button' title='Back to Repair Requests' onClick={handleBackToRepairRequests}>
                                <FontAwesomeIcon icon={faArrowCircleLeft} />
                            </button>
                            {repairOrderBtn}
                            <button className='icon-button action-icon-button' title='Edit Repair Order' 
                              onClick={handleEdit}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form__column--divider shadow padding">

                            {/* device type */}
                            <div className="input--divider padding bg-light border">
                                <div className="row--select ">
                                    <label className='label' htmlFor='deviceType'>
                                    DEVICETYPE: </label>
                                    <p className='capitalize'>{repairRequest.deviceType}</p>
                                </div>
                            </div>
                                
                            {/* serial number */}
                            <div className="input--divider padding bg-light border">
                                <div className="row--select ">
                                    <label className='label' htmlFor='serialNo'>
                                    SERIAL NO: </label>
                                    <p>{repairRequest.serialNo}</p>
                                </div>
                            </div>
                            
                            {/* brand */}
                            <div className="input--divider padding bg-light border">
                                <div className="row--select ">
                                    <label className='label' htmlFor='Brand'>
                                    BRAND: </label>
                                    <p className='capitalize'>{repairRequest.brand}</p>
                                </div>
                            </div>

                            {/* issue description */}
                            <div className="input--divider padding bg-light border ">
                                <div className="row--wrap ">
                                    <label className='label' htmlFor='issueDesc'>
                                    ISSUE DESCRIPTION: </label>
                                    <p >{repairRequest.issueDesc}</p>
                                </div>
                            </div>
                            
                            {/* customer */}
                            <div className="input--divider bg-light padding top-margin border ">
                                <div className="row--select">
                                    <label className='label' htmlFor='custUsername'>
                                    CUSTOMER: </label>
                                    <p className='capitalize'>{repairRequest.customer}</p>
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
      <DashFormContainer title='Repair Request Details' content={content} />
    </>
  )
}

export default ViewRepairRequestDetails
