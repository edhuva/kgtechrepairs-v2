import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import './About.css';

// About
const About = ({ aboutBtn}) => {
  const currentYear = new Date().toLocaleString('en-SA', { year: 'numeric' });
  const createdYear = new Date('01/01/2018').toLocaleString('en-SA', { year: 'numeric' });

  const  yearDifference = currentYear - createdYear;

  const content = (
    <section className='home__about section__margin'>
        <div className='home__about-info'>
          <div className='public__title'>
            <h2>Our Company.</h2>
          </div>

          <div className='home__about-content'>
            <div className='home__about-text'>
              <p>Established in 2018, KGTech Repairs  well known as the fast-growing IT and electronics company in Port Elizabeth town, has nurtured desktop and laptop computers back to life for over {yearDifference} years. we have a reputation nationwide for being the SA’s most trusted computer repair specialists in Port Elizabeth town, a one-stop repairs and technical support solution for all brands: apple macbook, dell, hp, acer, ibm lenovo, compaq, toshiba, sony vaio, asus, samsung, msi, lg, gigabyte, iPad and tablets in south africa.</p>
              
              <p>
              We are the computer repair experts and our technicians have already successfully repaired thousands of windows and apple devices nationwide. our entire focus is on providing you with the highest quality walk-in and walk-out repairs and servicing along with exceptional customer focused experience service across south africa.
              </p>
              {aboutBtn &&
              <div className='about__top-p'>
                <ul>
                  <li>We are able to carry out repairs on most makes of desktop and laptop devices.</li>
                  <li>We provide repair solutions for many individuals, corporates, retailers and insurance companies.</li>
                  <li>We have a team of certified and qualified technicians who work to very high standards.</li>
                </ul>
              </div>
              }
            </div>
            {aboutBtn &&
              <Link to='about'>
                <div className='home-about-button'>
                  <motion.button animate={{ scale: 1.1 }} initial={{ scale: 0.5}} 
                  transition={{ repeat: Infinity, duration: 2 }}  type='button'>find out more <FontAwesomeIcon icon={faArrowAltCircleRight} /> </motion.button>
              </div>
              </Link>
            }
          </div>
        </div>
        <div className='home__about-img'>
          <div className='about-img'>
          </div>
        </div>
    </section>
  )
  return content
}

export default About
