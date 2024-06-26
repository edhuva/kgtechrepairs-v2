import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenuFill, RiCloseLine } from 'react-icons/ri';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';
import DashUserStatus from '../dashUserStatus/DashUserStatus';
import PulseLoader from "react-spinners/PulseLoader";
import './DashNavbar.css';

// Menu
const Menu = () => (
    <ul>
    <Link to="/"><li>Home</li></Link>
    <Link to="computerrepairs"><li>Repairs</li></Link>
    <Link to="parts"><li>Parts</li></Link>
    <Link to="datarecovery"><li>Data Recovery</li></Link>
    <Link to="about"><li>Company</li></Link>
    <Link to="contactus"><li>Contact Us</li></Link>
</ul>
)

// Dash Navbar
const DashNavbar = () => {

    // sendLogout Mutation
    const [sendLogout, {
        isLoading,
        isSuccess,
    }] = useSendLogoutMutation()

    const navigate = useNavigate();

    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess, navigate])

      const logoutButton = (
        <div className='public__form--submit'>
            <button type='button'   className='public__button' onClick={sendLogout}>Logout</button>
        </div>
        )

    let buttonContent;
    if (isLoading) {
        buttonContent = <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />
    } else {
        buttonContent = (
            <>
            {logoutButton}
            </>
        )
    }

    return (
        <>
            <nav className='home__nav'>
                <div className='home__navbar-top'>
                    <div className='dash__navbar-top-p'>
                    <p>South Africa most trusted Computer Repair Specialists</p>
                    </div>
                    <div className='dash__userInfoTop'>
                        <DashUserStatus />
                    </div>
                    <div className='home__navbar-details'>
                    <p>Open: MON - FRI: 8AM - 5PM </p>
                    <p>Phone: +2762 849 3704</p>
                    </div>
                </div>
                <div className='dash__navbar'>
                    <div className='home__navbar-container'>
                        <div className='home__navbar-logo_link'>
                            <Link to="/private/dash" className='home__navbar-logo'>
                                <div className='home-logo'>
                                    <img src='https://kgtechawsbucket.s3.eu-north-1.amazonaws.com/KG_logo.png' alt='logo' />
                                </div>
                                <h1><span className='nowrap'>KGTech Repairs®</span></h1>
                            </Link>
                        </div>
                        <div className='home__navbar-links'>
                            <Menu />
                        </div>
                        <div className='home__navbar-sign'>
                            {buttonContent}
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
                                    {buttonContent}
                                    
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default DashNavbar
