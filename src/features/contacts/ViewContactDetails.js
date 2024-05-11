import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import DashFormContainer from "../auth/dashboard/DashFormContainer";
import ContactsList from './ContactsList';

//View Contact
const ViewContactDetails = ({ contact }) => {

    const navigate = useNavigate();

    const handleEdit = () => navigate(`/private/dash/contacts/${contact.id}`);
    
    const handleBackToContacts = () => navigate('/private/dash/contacts');

    const created = new Date(contact.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
    const updated = new Date(contact.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});

    const content = (
        <>
          <div className='view'>
            <div className='view__container'>
              <div className='title-row bold'>
                <p className='sm__device--cell'>Contact #{contact.contactNo}</p>
                <p className='lg__device--cell'>View Contact #{contact.contactNo}</p>
                <label className='label checkbox-container' htmlFor='order-complete'>
                  Status:
                  <label className=" table__cell--status margin">
                    { contact.status
                      ? <span className="table__status--completed">Processed</span>
                      : <span className="table__status--open">Awaiting</span>
                    }
                  </label>
                </label>
    
                <div className='action-buttons'>
                  <button className='icon-button action-icon-button' title='Back to Contacts' onClick={handleBackToContacts}>
                    <FontAwesomeIcon icon={faArrowCircleLeft} />
                  </button>
        
                  <button className='icon-button action-icon-button' title='Edit Invoice' 
                    onClick={handleEdit}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </div>
              </div>
    
              <div className='row'>
                <div className="form__column--divider shadow padding">
                  {/* email */}
                  <div className="input--divider padding bg-light border">
                    <div className="row--select ">
                      <label className='label' htmlFor='email'>
                        EMAIL: </label>
                      <p>{contact.email}</p>
                    </div>
                  </div>
                    
                    {/* message */}
                    <div className="input--divider padding bg-light border ">
                      <div className="row--wrap ">
                        <label className='label' htmlFor='message'>
                          MESSAGE: </label>
                        <p>{contact.message}</p>
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
            </div>
          </div>
        </>
      )

    return(
        <>
          <DashFormContainer title="View Invoice" content={content} />
        </>
    ) 
}

export default ViewContactDetails
