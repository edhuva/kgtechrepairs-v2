import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import DashFormContainer from "../auth/dashboard/DashFormContainer";

// View Customer Details
const ViewCustomerDetails = ({ customer, user }) => {

    const navigate = useNavigate();

    const handleEdit = () => navigate(`/private/dash/customers/${customer.id}`);
    const handleBackToCustomers = () => navigate('/private/dash/customers');

    const created = new Date(customer.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric' });
    const updated =  new Date(customer.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric' });

    const content = (
        <>
            <div className='view'>
                <div className='view__container'>
                    <div className='title-row bold'>
                        <p className='sm__device--cell'>Customer #{customer.customerNo}</p>
                        <p className='lg__device--cell'>View Customer #{customer.customerNo}</p>
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
                            <button className='icon-button action-icon-button' title='Back to Customers' onClick={handleBackToCustomers}>
                                <FontAwesomeIcon icon={faArrowCircleLeft} />
                            </button>
                            <button className='icon-button action-icon-button' title='Edit Customer' 
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
                                    <p className='capitalize'>{customer.user}</p>
                                </div>
                            </div>
                            
                            {/* fullname */}
                            <div className="input--divider padding bg-light border">
                                <div className="row--select ">
                                    <label className='label' htmlFor='fullname'>
                                    FULLNAME: </label>
                                    <p className='capitalize'>{customer.fullname}</p>
                                </div>
                            </div>
                            
                            {/* phone */}
                            <div className="input--divider padding bg-light border">
                                <div className="row--select ">
                                    <label className='label' htmlFor='phoneNo'>
                                    PHONE: </label>
                                    <p>{customer.phoneNo}</p>
                                </div>
                            </div>

                            {/* email */}
                            <div className="input--divider padding bg-light border">
                                <div className="row--select ">
                                    <label className='label' htmlFor='email'>
                                    EMAIL: </label>
                                    <p>{customer.email}</p>
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
          <DashFormContainer title='Customer Details' content={content} />
        </>
    )
}

export default ViewCustomerDetails