import { Scrollbars } from "react-custom-scrollbars";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

// DashTableContent
const DashTableContent = ({ title, subTitle, content }) => {

    const navigate = useNavigate();

   const handleBackToDash = () => navigate('/private/dash');

  return (
    <>
      <div className='main__dash-heading'>
        <h2>{title}</h2>
      </div>

      <div className='main__dash-subTitle'>
        <div className='title-row'>
          <p>{subTitle}</p>
          <div className='action-buttons'>
            <button className='icon-button save-icon-button' title='Back to DashBoard'  onClick={handleBackToDash}
              >
              <FontAwesomeIcon icon={faArrowCircleLeft} />
            </button>
          </div>
        </div>
      </div>
      
      <div className='main__dash-container'>
        <div className='main__dash-content'>
          <Scrollbars>
            <div className="content__scroll">
              {content}
            </div>
          </Scrollbars>
        </div>
      </div>
    </>
  )
}

export default DashTableContent
