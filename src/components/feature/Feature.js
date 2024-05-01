import './Feature.css';

// Feature
const Feature = ({ title, text }) => {
  return (
    <div className='app__feature'>
      <div className='app__feature-title'>
        <div />
        <h2>{title}</h2>
      </div>
      <div className='app__feature-text'>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Feature
