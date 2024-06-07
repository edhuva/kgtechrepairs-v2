import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faScrewdriverWrench, faDesktop, faTrophy } from '@fortawesome/free-solid-svg-icons';
import './Animation.css';

const Animation = () => {
  return (
    <div className='animation'>
      <div className='animation__container'>
        <div className='light'>
          
        </div>
         <div className='light__trophy'>
            <FontAwesomeIcon icon={faTrophy} />
        </div>
        <div className='light__laptop'>
            <FontAwesomeIcon icon={faLaptop} />
        </div>
        <div className='light__desktop'>
            <FontAwesomeIcon icon={faDesktop} />
        </div>
        <div className='light__screwdriver'>
            <FontAwesomeIcon icon={faScrewdriverWrench} />
        </div> 
        <div className='connector'>
          <div className='rotator'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Animation
