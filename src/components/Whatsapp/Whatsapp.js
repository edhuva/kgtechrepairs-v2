import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './Whatsapp.css';

const Whatsapp = () => {
  return (
    <Link className='whatsapp' href="https://wa.me/+27628493704" aria-label="Chat on WhatsApp" >
        <button className='whatsapp__btn' title='WhatsApp Us'>
            <FontAwesomeIcon icon={faWhatsapp} />
        </button>
    </Link>
  )
}

export default Whatsapp
