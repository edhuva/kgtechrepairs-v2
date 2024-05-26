import './DeviceCard.css';

const DeviceCard = (props) => {
  return (
    <article className='deviceCard '>
      <div className='deviceCard__img'>
        <img src={props.deviceImg} alt='device' />
      </div>
      
      <div className='deviceCard__title'>
        <p>{props.title}</p>
      </div>
      <div className='deviceCard__subtitle'>
        <p>{props.subtitle}</p>
      </div>
    </article>
  )
}

export default DeviceCard
