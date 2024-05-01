import './Header.css';

const Header = () => {
  return (
    <header className="home__header">
      <div className="header__content">
        <h1 className=' header__content-wellcome'>
          Wellcome to <span className='nowrap'>KGTech Repairs®</span> 
        </h1>
        <h1 className='header__content-h1'>
          The Most trusted computer Repair Specialists.
        </h1>
            
        <p className='header__content-p'>
          Specialists in  computer major brands! Your one-stop SA’s #1 tech solutions partner trusted by 10,000+ customers nationwide as a customer-centric tech company of choice where individuals and businesses genuinely find high-quality technical services and professional advice for their tech needs.
        </p>
      </div>
    </header>
  )
}

export default Header
