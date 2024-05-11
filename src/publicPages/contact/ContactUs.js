import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useAddNewContactMutation } from '../../features/auth/authApiSlice';
import useTitle from '../../hooks/useTitle';
import DashFormContainer from '../../features/auth/dashboard/DashFormContainer';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import { PulseLoader } from 'react-spinners';
import './ContactUs.css';

const ERROR_MESSAGE = 'Invalid data';

const ContactUs = () => {

  useTitle('KGTech Repairs');

    // addNewContact Mutation
    const [addNewContact, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useAddNewContactMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errMsg, setErrMsg ] = useState('');

  useEffect(() => {
    setErrMsg('')
  }, [email, message])

  //useEffect if successfull
  useEffect(() => {
    if (isSuccess) {
      setEmail('')
      setMessage('')
      toast('✅ Successfuly Sent!', {
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
  }, [isSuccess])

  useEffect(() => {
    if (errMsg) {
      toast.error(errMsg, {
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
  }, [errMsg])

  useEffect(() => {
    if (isError) {
      setErrMsg(error?.data?.message || 'Network Error')
    }
  }, [isError, error])

   const canSave = [email, message].every(Boolean) && !isLoading;

  const handleSubmit = async () => {
    if (!email || !message) {
      setErrMsg(ERROR_MESSAGE);
      return;
    }

    if (canSave) {
        await addNewContact({ email, message });
    }
  }

  const handleBackToHome = () => navigate('/');
    
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onMessageChanged = (e) => setMessage(e.target.value);

  let contentloading;
     contentloading = isLoading && <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

  const content = (
    <>
    {contentloading}
    <Notify />

    <div className='contact__row'>
      <div className='form__column--divider contact'>
        <div className='contact__top'>
          <div className='contact__title contact__logo'>
            <Link to="/" className='contact-title-link'>
              <h1><span className='nowrap'>KGTech Repairs®</span></h1>
            </Link>
          </div>
          <div className='contact__content'>
            <address className='contact__addr'>
              <p>
                <FontAwesomeIcon icon={faLocationDot} />
                <span className='profile__span'>169 Feni Street, NU 10 Motherwell PortElizabeth, 6211</span>
              </p>
              <p className='top-padding'>
                <FontAwesomeIcon icon={faPhone} />
                <span className='profile__span'><a href='tel:+27628493704'>+2762 849 3704</a></span>
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} />
                <span className='profile__span'>kgtechrepairs@gmal.com</span>
              </p>
            </address>
            <br />
          </div>
        </div>
      </div>

      <div className='form__container contact__form'>
        <form className='form' onSubmit={(e) => e.preventDefault()}>
          <div className='title-row bold'>
            <p>Contact Us</p>
            
            <div className='actions-buttons'>
              <button className='icon-button sace-icon-button' title='Back to Home' onClick={handleBackToHome}>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
              </button>
            </div>
          </div>

          <div className='row'>
            <div className='form__column--divider'>
              {/* email input */}
              <div className='input__public--divider'>
                <label className='label' htmlFor='email'>
                  Email:
                </label>
                <input className={`form__input`} id='email' name='email' type='text' autoComplete='off' placeholder='email' value={email} onChange={onEmailChanged} />
              </div>

              <div className='input--divider'>
                <label className='label' htmlFor='message'>
                  Message:
                </label>
                <textarea className='form__input form__input--text' id='message' name='message' autoComplete='off' placeholder='your message' value={message} onChange={onMessageChanged} />
              </div>

              <div className='input--divider'>
                <div className='public__form--submit'>
                  <button type='button'  className='public__button' onClick={handleSubmit}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  )


  return (
    <div  className=' top-margin contact__container'>
      <DashFormContainer title='' content={content} />
    </div>
  )
}

export default ContactUs
