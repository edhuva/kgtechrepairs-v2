import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useUpdateSubscriptionMutation, useDeleteSubscriptionMutation } from './subscriptionsApiSlice';
import DashFormContainer from '../auth/dashboard/DashFormContainer';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';

// Edit subscription Form
const EditSubscriptionForm = ({ subscription }) => {

    const emailRef = useRef();

  // updateSubscription Mutation
  const [updateSubscription, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateSubscriptionMutation();

   // deleteSubscription Mutation
  const [deleteSubscription, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeleteSubscriptionMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState(subscription.email);
  const [status, setStatus] = useState(subscription.status);

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  //useEffect if successfull
  useEffect(() => {
    if (isSuccess) {
      setEmail(subscription?.email)
      toast('✅ Successfuly Edited Subscription!', {
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
    }, [isSuccess, subscription?.email])

    useEffect(() => {
        if(isDelSuccess) {
          //if successfull
          setEmail('')
         
          navigate('/private/dash/subscriptions');
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


    const created = new Date(subscription.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
    const updated = new Date(subscription.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});

    const onEmailChanged = (e) => setEmail(e.target.value);
    const onStatusChanged = e => setStatus(prev => !prev);

    const canSave = [email].every(Boolean) && !isLoading;

    // Save Contact
    const onSaveSubscriptionClicked = async () => {
        if (canSave) {
            await updateSubscription({id: subscription.id, email, status})
        }
    }

    // Delete Contact
    const onDeleteSubscriptionClicked = async () => {
    await deleteSubscription({ id: subscription.id })
    }

    const alertDelete = () => {
        ///* eslint-disable-next-line no-restricted-globals */
        let delet = window.confirm("Confirm Delete");
        if (delet) {
          onDeleteSubscriptionClicked()
        }
    }
    
    const handleBackToSubscriptions = () => navigate('/private/dash/Subscriptions');

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen";
    const validEmailClass = !email ? "form__input--incomplete" : '';

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
                <p className="sm__device--cell">Subsciption #{subscription.SubscriptionNo}</p>
                <p className="lg__device--cell">Subsciption #{subscription.SubscriptionNo}</p>
                <label className='label form__checkbox-container' htmlFor='user-active'>
                  STATUS:
                  <input className='form__checkbox' id='order-completed' name='order-completed' type='checkbox' checked={status} onChange={onStatusChanged} />
                </label>
                  
                <div className='action-buttons'>
                  <button className='icon-button save-icon-button' title='Back to subscriptions'  onClick={handleBackToSubscriptions}
                    >
                      <FontAwesomeIcon icon={faArrowCircleLeft} />
                  </button>
                  <button className='icon-button action-icon-button save__btn' title='Save' 
                  disabled={!canSave}
                  onClick={onSaveSubscriptionClicked}>
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
          <DashFormContainer title="Edit Subscription" content={content} />
        </>
      ) 
}

export default EditSubscriptionForm
