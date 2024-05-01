import useTitle from '../../hooks/useTitle';
import About from '../../components/about/About';
import './Company.css';

const Company = () => {

  useTitle('KGTech Repairs');
  
  return (
    <div  className='section__padding'>
      <About />
    </div>
  )
}

export default Company
