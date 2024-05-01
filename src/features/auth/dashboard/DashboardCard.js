import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Dashboard.css';

//Dashboard Card
const DashboardCard = ({ cardIcon, cardCount, cardTitle }) => {
  return (
    <article className='dash__card'>
      <div className='dash__card--top'>
        <div className='dash__card--icon'>
          <FontAwesomeIcon icon={cardIcon} />
        </div>

        <div className='dash__card--title'>
          <p className='nowrap'>{cardTitle}</p>
        </div>
      </div>
      
      <div className='dash__card--count'>
        <p>{cardCount}</p>
      </div>
    </article>
  )
}

export default DashboardCard
