import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenuFill, RiCloseLine } from 'react-icons/ri';
import KG_logo  from '../../img/KG_logo.png';
import './Navbar.css';

// Menu
const Menu = () => (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="computerrepairs">Repairs</Link></li>
        <li><Link to="parts">Parts</Link></li>
        <li><Link to="datarecovery">Data Recovery</Link></li>
        <li><Link to="about">Company</Link></li>
        <li><Link to="contactus">Contact Us</Link></li>
    </ul>
)

// Navbar
const Navbar = () => {

    const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className='home__nav'>
        <div className='home__navbar-top'>
            <div className='home__navbar-top-p'>
            <p>South Africa most trusted Computer Repair Specialists</p>
            </div>
            <div className='home__navbar-details'>
            <p>Open: MON - FRI: 8AM - 5PM </p>
            <p>Phone: +2762 849 3704</p>
            </div>
        </div>
        <div className='home__navbar'>
            <div className='home__navbar-container'>
                <div className='home__navbar-logo_link'>
                    <Link to="/" className='home__navbar-logo'>
                        <div className='home-logo'>
                            <img src={KG_logo} alt='logo' />
                        </div>
                        <h1><span className='nowrap'>KGTech Repairs®</span></h1>
                    </Link>
                </div>
                <div className='home__navbar-links'>
                    <Menu />
                </div>
                <div className='home__navbar-sign'>
                    <Link to='login'><button type='button'>Login</button></Link>
                    <Link to='signup'><button type='button'>Signup</button></Link>
                </div>
            </div>
            <div className='home__navbar-menu'>
                {toggleMenu
                    ? <RiCloseLine color='#fff' size={35} onClick={() => setToggleMenu(false)} />
                    : <RiMenuFill color='#fff' size={35} onClick={() => setToggleMenu(true)} />
                }   
                {toggleMenu && (
                    <div className='home__navbar-menu_container scale-up-center'>
                        <div className='home__navbar-menu_links'>
                            <Menu />
                        </div>
                        <div className='home__navbar-menu_sign'>
                            <Link to='login'><button type='button'>Login</button></Link>
                            <Link to='signup'><button type='button'>Signup</button></Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </nav>
  )
}

export default Navbar
