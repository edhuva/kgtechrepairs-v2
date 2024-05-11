import useTitle from '../../hooks/useTitle';
import About from '../../components/about/About';
import Feature from '../../components/feature/Feature';
import './Company.css';

const Company = () => {

  useTitle('KGTech Repairs');

  const Goals = <ul>
    <li className='list__style'>To become SA’s #1 technology specialists by providing expert, innovative technical solution at an affordable price.</li>
    <li className='list__padding list__style'>To focus on delivering robust computer support solutions that enhance our customers’ abilities to achieve their goals.</li>
    <li className='list__padding list__style'>To make customer satisfaction our #1 priority so that at least 55% of our customers base is repeat and referral business. we safeguard all private and confidential data of our customers.</li>
    <li className='list__padding list__style'>To continuously engage in cutting-edge of computing and technology & reduce IT cost for families and businesses.</li>
  </ul>

const Values = <ul>
<li className='list__style'>We put our customers at the centre of everything we do.</li>
<li className='list__padding list__style'>We value integrity and ethics in all we do.</li>
<li className='list__padding list__style'>We are true to our promises.</li>
<li className='list__padding list__style'>We are ready to listen and act promptly.</li>
<li className='list__padding list__style'>We treat everyone with respect and dignity.</li>
</ul>

const text = <>
  Provide expert and cost-effective computer support services that our customers recommend to families and friends, individuals and businesses prefer for their needs, retailers select for their clients, employees are proud of, and suppliers seek for long-term relationships.
  <br/>
  <br/>
  It is our goal to provide innovative repair services for desktop and latptop computers with reliable quality, fast lead-time and good after-sale service to our customer; with excellent customer experience innovation through our expertise and knowledge in the world’s computing technology.
</>
  
  return (
    <div  className='top-margin sm__top--padding'>
      <About aboutBtn={false}/>
      <div className='company-content content__padding'>
        <div className='company-feature bg__color--dark'>
          <Feature title="Vision." text=" 
          To be the most SA’s leading and trusted computer repair centre of choice for fast turnaround time walk-in and walk-out quality repairs and support services of any device along with exceptional customer focused experience."/>
        </div>
        <div className='company-feature bg__color'>
          <Feature title="Mission." text={text} />
        </div>
        
      </div>
      <div className='company-content section__padding content__reverse'>
        <div className='company-feature'>
          <Feature title="Values." text={Values}/>
        </div>
        <div className='company-feature'>
          <Feature title="Goals." text={Goals}/>
        </div>
      </div>
    </div>
  )
}

export default Company
