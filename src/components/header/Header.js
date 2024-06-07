import './Header.css';
import Animation from '../animation/Animation';

const Header = () => {
  return (
    <header className="home__header">
      <div className='header__container'>
        <div className="header__content">
          
          <h1 className='header__content-h1'>
            The Most Trusted Computer Repair Specialists.
          </h1>
          <div className='wellcome'>
            <h2>Wellcome to KGTech Repairs®</h2>
          </div>
              
          <p className='header__content-p'>
            Specialists in  computer major brands! Your one-stop SA’s #1 tech solutions partner,
             trusted by 10,000+ customers nationwide as a customer-centric tech company of choice where
              individuals and businesses genuinely find high-quality technical services and professional advice for their tech needs.
          </p>
        </div>
        <div className='header__animation'>
          <Animation />
        </div>
      </div>
    </header>
  )
}

export default Header
