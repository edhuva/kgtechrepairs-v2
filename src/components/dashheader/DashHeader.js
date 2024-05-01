import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faFileCirclePlus, faFilePen, faFileInvoice, faUsers, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { RiMenu3Fill, RiCloseCircleFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';
import PulseLoader from "react-spinners/PulseLoader";
import DashMenu from '../dashMenu/DashMenu';
import DashUserStatus from '../dashUserStatus/DashUserStatus';
import { Scrollbars } from 'react-custom-scrollbars';
import useAuth from '../../hooks/useAuth';
import './DashHeader.css';

// Dash Header
const DashHeader = () => {

    // sendLogout Mutation
    const [sendLogout, {
        isLoading,
        isSuccess,
        
    }] = useSendLogoutMutation()

    const { isAdmin, isManager, isEmployee, isCustomer } = useAuth();

    const navigate = useNavigate();

    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess, navigate])

    const onAccountClicked = () => navigate('/private/dash/users/account');
    const onInvoicesClicked = () => navigate('/private/dash/invoices');
    const onRepairOrdersClicked = () => navigate('/private/dash/repairorders');
    const onCustomersClicked = () => navigate('/private/dash/customers');
    const onNewRepairRequestClicked = () => navigate('/private/dash/repairrequests/new');
    const onNewRepairOrderClicked = () => navigate('/private/dash/repairorders/new');
    

    toggleMenu? document.body.style.overflow = "hide" :  document.body.style.overflow = "auto";

    /* dashheader menu button */
    const headermenu = (
        <div className='dash__menu'>
            {toggleMenu
                ? <RiCloseCircleFill color='#fff' size={30} onClick={() => setToggleMenu(false)} />
                :  <RiMenu3Fill color='#fff' size={30} onClick={() => setToggleMenu(true)} />
            }
            {toggleMenu && (
                
                    <div className='dash__menu-container scale-up-center'>
                        <div className='dash__menu-links'>
                            <Scrollbars style={{ width: '100%', height: 230 }}>
                                <div className='dash__sideBar-content'>
                                    <DashMenu />
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                )
            }
        </div>
    )

    /* header buttons */

    const newRepairRequestButton = (
        <button className='icon-button-nav' title='New Request' onClick={onNewRepairRequestClicked}>
            <FontAwesomeIcon icon={faFileCirclePlus} />
        </button>
    )

    const newRepairOrderButton = (
        <button className='icon-button-nav' title='New Repair Order' onClick={onNewRepairOrderClicked}>
            <FontAwesomeIcon icon={faFileCirclePlus} />
        </button>
    )
 
    const customersButton = (
        <button className='icon-button-nav' title='Customers' onClick={onCustomersClicked}>
            <FontAwesomeIcon icon={faUsers} />
        </button>
    )

    
    const repairOrdersButton = (
        <button className='icon-button-nav' title='Repair Orders' onClick={onRepairOrdersClicked}>
            <FontAwesomeIcon icon={faFilePen} />
        </button>
    )

    const invoicesButton = (
        <button className='icon-button-nav' title='Invoices' onClick={onInvoicesClicked}>
            <FontAwesomeIcon icon={faFileInvoice} />
        </button>
    )

    const accountDetailsButton = (
        <button className='icon-button-nav' title='Account Details' onClick={onAccountClicked}>
            <FontAwesomeIcon icon={faUserCircle} />
        </button>
    )

    let logoutButton;
    if (isLoading) {
        logoutButton = <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />
    } else {
        logoutButton = (
            <button className="icon-button-nav" title="Logout" 
            onClick={sendLogout}
            >
                <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
        )
    }
    
    const buttonContent = (
        <>
            {(isCustomer) && newRepairRequestButton}
            {(isEmployee || isManager || isAdmin) &&  newRepairOrderButton}
            {repairOrdersButton}
            {invoicesButton}
            {(isEmployee || isManager || isAdmin) && customersButton}
            {accountDetailsButton}
            {logoutButton}
        </>
    )

    const content = (
        <>
            <header className='dash__header'>
                <div className='dash__header-container'>
                    <div className='dash__header-menu'>
                        {headermenu}
                    </div>
                    <div className='dash__userInfo'>
                        <DashUserStatus />
                    </div>

                    <div className='dash__header-container-nav'>
                        <nav className='dash__header-nav'>
                            {buttonContent}
                        </nav>
                    </div>
                </div>

            </header>
        </>
    )

  return content;
}

export default DashHeader
