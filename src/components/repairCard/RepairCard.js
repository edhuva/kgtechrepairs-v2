import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RepairCard.css';

// Repair Card
const RepairCard = (props) => {
  return (
    <article className='repairCard'>
        <div className='repairCard-icon'>
            <h2><FontAwesomeIcon icon={props.icon} /> </h2>
        </div>
        
        <div className='repairCard-content'>
            <h3>{props.title}</h3>
            <p>{props.text}</p>
        </div>
    </article>
  )
}

export default RepairCard
