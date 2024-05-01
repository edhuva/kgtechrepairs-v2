import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faUserCircle, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import DashFormContainer from "../auth/dashboard/DashFormContainer";

// User Account Details
const UserAccountDetails = ({ user, employees, customers }) => {  

    const navigate = useNavigate();

    // get employee
    const employee = employees.find(employee => employee.userid === user.id);

    // get customer
    const customer = customers.find(customer => customer.userid === user.id);

    let userId= user?.id;
    let userDetails = user;
    let userEditLink = `/private/dash/users/account/${userId}`;

    if (employee) {
        console.log('im employee')
        userId = employee?.id;
        console.log('im employee')
        userDetails = employee;
        userEditLink = `/private/dash/employees/account/${userId}`
    }

    if (customer) {
        userId = customer?.id;
        userDetails = customer;
        userEditLink = `/private/dash/customers/account/${userId}`;  
    }

    const handleEdit = () => navigate(userEditLink);

    const handleBackToDash = () => navigate('/private/dash');

    const created = new Date(userDetails.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric' });
    const updated =  new Date(userDetails.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric' });

    let expertiesDetials = employee && <div className="input--divider padding bg-light border">
        <div className="row--select ">
            <label className='label' htmlFor='experties'>
            EXPERTIES: </label>
            <p>{userDetails.experties.toString().replaceAll(',', '. ')}</p>
        </div>
    </div>

    const title = (
        <>
            <p>
                    <FontAwesomeIcon icon={faUserCircle} />
                    <span className='profile__span'>Account Details</span>
            </p>
        </>
    )

    let content = <>
            <div className='view'>
                <div className='view__container'>
                    <div className='title-row'>
                        <p>Details</p>

                        <div className='action-buttons'>
                            <button className='icon-button action-icon-button' title='Back to DashBoard' onClick={handleBackToDash}>
                                <FontAwesomeIcon icon={faArrowCircleLeft} />
                            </button>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="form__column--divider shadow padding">
                            <p>
                                Something went wrong!, please consult Admin.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>

        if (customer || employee) {
            content = (
                <>
                    <div className='view'>
                        <div className='view__container'>
                            <div className='title-row'>
                                <p>Details</p>
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
                                    <button className='icon-button action-icon-button' title='Back to DashBoard' onClick={handleBackToDash}>
                                        <FontAwesomeIcon icon={faArrowCircleLeft} />
                                    </button>
                                    <button className='icon-button action-icon-button' title='Update Account' 
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
                                            <p className='capitalize'>{userDetails.user}</p>
                                        </div>
                                    </div>
                                    
                                    {/* fullname */}
                                    <div className="input--divider padding bg-light border">
                                        <div className="row--select ">
                                            <label className='label' htmlFor='fullname'>
                                            FULLNAME: </label>
                                            <p className='capitalize'>{userDetails.fullname}</p>
                                        </div>
                                    </div>
                                    
                                    {/* phone */}
                                    <div className="input--divider padding bg-light border">
                                        <div className="row--select ">
                                            <label className='label' htmlFor='phoneNo'>
                                            PHONE: </label>
                                            <p>{userDetails.phoneNo}</p>
                                        </div>
                                    </div>
                                    
                                    {/* email */}
                                    <div className="input--divider padding bg-light border">
                                        <div className="row--select ">
                                            <label className='label' htmlFor='email'>
                                            EMAIL: </label>
                                            <p>{userDetails.email}</p>
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

                                    {/* experties details */}
                                    {expertiesDetials}

                                    {/* roles */}
                                    <div className="input--divider padding bg-light border">
                                        <div className="row--select ">
                                            <label className='label' htmlFor='roles'>
                                            ROLES: </label>
                                            <p>{user.roles.toString().replaceAll(',', '. ')}</p>
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
        } else if (user) {
            content = (
                <>
                    <div className='view'>
                        <div className='view__container'>
                            <div className='title-row'>
                                <p>Details</p>
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
                                    <button className='icon-button action-icon-button' title='Back to DashBoard' onClick={handleBackToDash}>
                                        <FontAwesomeIcon icon={faArrowCircleLeft} />
                                    </button>
                                    <button className='icon-button action-icon-button' title='Update Account' 
                                        onClick={handleEdit}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                </div>
                            </div>

                            <div className='row'>
                                <div className="form__column--divider shadow padding">
                                    <div className="input--divider padding bg-light border">
                                        <div className="row--select ">
                                            <label className='label' htmlFor='username'>
                                            USERNAME: </label>
                                            <p className='capitalize'>{userDetails.username}</p>
                                        </div>
                                    </div>

                                    <div className="input--divider padding bg-light border">
                                        <div className="row--select ">
                                            <label className='label' htmlFor='password'>
                                            PASSWORD: </label>
                                            <p>*******</p>
                                        </div>
                                    </div>

                                    {expertiesDetials}

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
        }
    
    return (
        <>
          <DashFormContainer title={title} content={content} />
        </>
    )
}

export default UserAccountDetails