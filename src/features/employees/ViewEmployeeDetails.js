import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import DashFormContainer from "../auth/dashboard/DashFormContainer";

// View Employee Details
const ViewEmployeeDetails = ({ employee,  user }) => {

    const navigate = useNavigate();

    const handleEdit = () => navigate(`/private/dash/employees/${employee.id}`);
    const handleBackToEmployees = () => navigate('/private/dash/employees');

    const created = new Date(employee.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric' });
    const updated =  new Date(employee.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric' });

    const content = (
        <>
            <div className='view'>
                <div className='view__container'>
                    <div className='title-row bold'>
                        <p className='sm__device--cell'>Employee #{employee.employeeNo}</p>
                        <p className='lg__device--cell'>View Employee #{employee.employeeNo}</p>
                        <label className='label checkbox-container' htmlFor='order-complete'>
                            ACTIVE:
                            <label className=" table__cell--status margin">
                                { user.active
                                    ? <span className="table__status--completed">Active</span>
                                    : <span className="table__status--open">Inactive</span>
                                }
                            </label>
                        </label>

                        <div className='action-buttons'>
                            <button className='icon-button action-icon-button' title='Back to Employees' onClick={handleBackToEmployees}>
                                <FontAwesomeIcon icon={faArrowCircleLeft} />
                            </button>
                            <button className='icon-button action-icon-button' title='Edit Employee' 
                                onClick={handleEdit}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form__column--divider shadow padding">

                            {/* username */}
                            <div className="input--divider padding bg-light border">
                                <div className="row--select ">
                                    <label className='label' htmlFor='username'>
                                    USERNAME: </label>
                                    <p className='capitalize'>{employee.user}</p>
                                </div>
                            </div>
                            
                            {/* fullname */}
                            <div className="input--divider padding bg-light border">
                                <div className="row--select ">
                                    <label className='label' htmlFor='fullname'>
                                    FULLNAME: </label>
                                    <p className='capitalize'>{employee.fullname}</p>
                                </div>
                            </div>
                            
                            {/* phone */}
                            <div className="input--divider padding bg-light border">
                                <div className="row--select ">
                                    <label className='label' htmlFor='phoneNo'>
                                    PHONE: </label>
                                    <p>{employee.phoneNo}</p>
                                </div>
                            </div>

                            {/* email */}
                            <div className="input--divider padding bg-light border">
                                <div className="row--select ">
                                    <label className='label' htmlFor='email'>
                                    EMAIL: </label>
                                    <p>{employee.email}</p>
                                </div>
                            </div>

                            {/* password */}
                            <div className="input--divider padding bg-light border">
                                <div className="row--select ">
                                    <label className='label' htmlFor='password'>
                                    PASSWORD: </label>
                                    <p>*******</p>
                                </div>
                            </div>
                            
                            {/* experties */}
                            <div className="input--divider padding bg-light border">
                                <div className="row--select ">
                                    <label className='label' htmlFor='experties'>
                                    EXPERTIES: </label>
                                    <p>{employee.experties}</p>
                                </div>
                            </div>
                            
                                {/* roles */}
                            <div className="input--divider padding bg-light border">
                                <div className="row--select ">
                                    <label className='label' htmlFor='roles'>
                                    ROLES: </label>
                                    <p>{user.roles.toString().replaceAll(',', '. ')}</p>
                                </div>
                            </div>
                        </div>

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
          <DashFormContainer title='Employee Details' content={content} />
        </>
    )
}

export default ViewEmployeeDetails
