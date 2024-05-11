import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import { useAddNewSubscriptionMutation } from '../../features/auth/authApiSlice';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import { PulseLoader } from 'react-spinners';
import KG_logo from '../../img/KG_logo.png';
import './Footer.css';

const ERROR_MESSAGE = 'Invalid data';

// Footer
const Footer = () => {
    
    // addNewSubscription Mutation
    const [addNewSubscription, {
        isLoading,
        isSuccess,
        isError,
        error
      }] = useAddNewSubscriptionMutation();

      const [email, setEmail] = useState('');
      const [errMsg, setErrMsg ] = useState('');

      const created = new Date().toLocaleString('en-SA', { year: 'numeric' });

    useEffect(() => {
        setErrMsg('')
    }, [email])

    //useEffect if successfull
     useEffect(() => {
        if (isSuccess) {
        setEmail('')
        toast('✅ Successfuly Subscribed!', {
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

    const canSave = [email].every(Boolean) && !isLoading;

    const handleSubmit = async () => {
        if (!email) {
          setErrMsg(ERROR_MESSAGE);
          return;
        }
    
        if (canSave) {
            await addNewSubscription({ email });
        }
    }

    const onEmailChanged = (e) => setEmail(e.target.value);

    let contentloading;
     contentloading = isLoading && <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

  const content = (
    <>
        {contentloading}
        <Notify />

        <footer className='footer section__padding'>
            <div className='footer__news'>
                <div className='footer__news-content'>
                    <div className='footer__news-icon'>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <h3>Sign up to our Newsletter</h3>
                </div>

                <form className='footer__news-input' onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor='email'>
                        {/* <input type='email' id='email' name='email' placeholder='EMAIL'/> */}
                        <input className={`form__input`} id='email' name='email' type='text' autoComplete='off' placeholder='Email' value={email} onChange={onEmailChanged} />
                    </label>
                    <button type='button' onClick={handleSubmit} >SUBSCRIBE</button>
                    
                </form>
            </div>

            <div className='footer__container'>
                <div className='footer__company'>
                    <div className='footer__company-logo'>
                        <Link to="/" className='footer-logo-link'>
                            <div className='footer-logo'>
                                <img src={KG_logo} alt='logo' />
                            </div>
                            <h1><span className='nowrap'>KGTech Repairs®</span></h1>
                        </Link>
                    </div>
                    <div className='footer__contact'>
                        <address className='footer__addr'>
                            KGTech Repairs<br />
                            169 Feni Street, NU 10 Motherwell<br />
                            PortElizabeth, 6211<br />
                            Call: <a href='tel:+27628493704'>+2762 849 3704</a><br />
                            Email: kgtechrepairs@gmal.com

                        </address>
                        <br />
                    </div>
                </div>

                <div className='footer__links'>
                    <h4>Service</h4>
                    <NavLink to='desktoprepairs'><i><FontAwesomeIcon icon={faAngleRight} /></i>Desktop Repairs</NavLink>
                    <Link to='laptoprepairs'><i><FontAwesomeIcon icon={faAngleRight} /></i>Laptop Repairs</Link>
                    <Link to='datarecovery'><i><FontAwesomeIcon icon={faAngleRight} /></i>Data Recovery</Link>
                    <Link to='support'><i><FontAwesomeIcon icon={faAngleRight} /></i>Support</Link>
                    <Link to='parts'><i><FontAwesomeIcon icon={faAngleRight} /></i>Parts</Link>
                </div>

                <div className='footer__links'>
                    <h4>Company</h4>
                    <Link to='about'><i><FontAwesomeIcon icon={faAngleRight} /></i>About Us</Link>
                    <Link to='contactus'><i><FontAwesomeIcon icon={faAngleRight} /></i>Contact Us</Link>
                    <Link to='terms&conditions'><i><FontAwesomeIcon icon={faAngleRight} /></i>Terms & Conditions</Link>
                    <Link to='returnspolicy'><i><FontAwesomeIcon icon={faAngleRight} /></i>Returns Policy</Link>
                    <Link to='privacypolicy'><i><FontAwesomeIcon icon={faAngleRight} /></i>Privacy Policy</Link>
                </div>

                <div className='footer__links'>
                    <h4>Follow Us</h4>
                    <Link to='#'><i><FontAwesomeIcon icon={faFacebook} /></i>facebook</Link>
                    <Link to='#'><i><FontAwesomeIcon icon={faTwitter} /></i>twitter</Link>
                    <Link to='#'><i><FontAwesomeIcon icon={faInstagram} /></i>instagram</Link>
                    <Link to='#'><i><FontAwesomeIcon icon={faLinkedin} /></i>linkedin</Link>
                </div>

            </div>
            <div className='footer__copyright'>
                <p>@ {created} KGTech Repairs®, All rights reserved</p>
            </div>
        </footer>
    </>
  )

  return content;
}

export default Footer
