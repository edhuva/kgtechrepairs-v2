import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useDeleteContactMutation, useUpdateContactMutation } from './contactsApiSlice';
import DashFormContainer from '../auth/dashboard/DashFormContainer';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';

// Edit contact Form
const EditContactForm = ({ contact }) => {

  const emailRef = useRef();

  // updateContact Mutation
  const [updateContact, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateContactMutation();

   // deleteContact Mutation
  const [deleteContact, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeleteContactMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState(contact.email);
  const [message, setMessage] = useState(contact.message)
  const [status, setStatus] = useState(contact.status);

  useEffect(() => {
    emailRef.current.focus();
  }, [])

   //useEffect if successfull
   useEffect(() => {
    if (isSuccess) {
      setEmail(contact?.email)
      setMessage(contact?.message)
      toast('✅ Successfuly Edited Contact!', {
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
    }, [isSuccess, contact?.email, contact?.message])

    useEffect(() => {
      if(isDelSuccess) {
        //if successfull
        setEmail('')
        setMessage('')
       
        navigate('/private/dash/contacts');
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

    const created = new Date(contact.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
    const updated = new Date(contact.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});

    const onEmailChanged = (e) => setEmail(e.target.value);
    const onMessageChanged = (e) => setMessage(e.target.value);
    const onStatusChanged = e => setStatus(prev => !prev);

    const canSave = [email, message].every(Boolean) && !isLoading;

      // Save Contact
  const onSaveContactClicked = async () => {
    if (canSave) {
      await updateContact({id: contact.id, email, message, status})
    }
  }

  // Delete Contact
  const onDeleteContactClicked = async () => {
    await deleteContact({ id: contact.id })
  }

  const alertDelete = () => {
    ///* eslint-disable-next-line no-restricted-globals */
    let delet = window.confirm("Confirm Delete");
    if (delet) {
      onDeleteContactClicked()
    }
  }

  const handleBackToContacts = () => navigate('/private/dash/contacts');

  const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
  const validEmailClass = !email ? "form__input--incomplete" : '';
  const validMessageClass = !message ? "form__input--incomplete" : '';

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
            <p className="sm__device--cell">Contact #{contact.ContactNo}</p>
            <p className="lg__device--cell">Contact #{contact.ContactNo}</p>
            <label className='label form__checkbox-container' htmlFor='user-active'>
              STATUS:
              <input className='form__checkbox' id='order-completed' name='order-completed' type='checkbox' checked={status} onChange={onStatusChanged} />
            </label>
              
            <div className='action-buttons'>
              <button className='icon-button save-icon-button' title='Back to Contacts'  onClick={handleBackToContacts}
                >
                  <FontAwesomeIcon icon={faArrowCircleLeft} />
              </button>
              <button className='icon-button action-icon-button save__btn' title='Save' 
              disabled={!canSave}
              onClick={onSaveContactClicked}>
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button className='icon-button action-icon-button' title='Delete' onClick={() => alertDelete()}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>

          <div className='row'>
            <div className="form__column--divider">
              {/* email */}
              <div className='input--divider'>
                <label className='label' htmlFor='email'>
                  Email: 
                </label>
                <input ref={emailRef} className={`form__input ${validEmailClass}`} id='email' name='email' type='text' autoComplete='off' placeholder='email' value={email} onChange={onEmailChanged} />
              </div>

              {/* message */}
              <div className='input--divider'>
                  <label className='label' htmlFor='message'>
                    Message: 
                  </label>
                  <textarea className={`form__input form__input--text ${validMessageClass}`} id='message' name='message' autoComplete='off' placeholder='message' value={message} onChange={onMessageChanged} />
              </div>
            </div>

            <div className="form__divider">
              <div className="form__column--divide">
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
      <DashFormContainer title="Edit Contact" content={content} />
    </>
  ) 
}

export default EditContactForm
