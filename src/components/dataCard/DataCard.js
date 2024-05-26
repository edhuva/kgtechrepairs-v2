import './DataCard.css';

const DataCard = (props) => {
  return (
    <div>
        <div className='recvry__card'>
            <div className='card__title'>
                <h4>{props.title}</h4>
            </div>
            <div className='card__text'>
                <p>{props.text}</p>
            </div>
        </div>
    </div>
  )
}

export default DataCard
