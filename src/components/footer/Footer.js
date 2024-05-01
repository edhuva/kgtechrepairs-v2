import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import KG_logo from '../../img/KG_logo.png';
import './Footer.css';

// Footer
const Footer = () => {
    
  return (
    <footer className='footer section__padding'>
        <div className='footer__news'>
            <div className='footer__news-content'>
                <div className='footer__news-icon'>
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <h3>Sign up to our Newsletter</h3>
            </div>

            <div className='footer__news-input'>
                <label htmlFor='email'>
                    <input type='email' id='email' name='email' placeholder='EMAIL'/>
                </label>
                <button type='button' >SUBSCRIBE</button>
                
            </div>
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
        <p>@ 2024 KGTech Repairs®, All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
