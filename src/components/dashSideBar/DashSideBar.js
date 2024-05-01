import { Scrollbars } from 'react-custom-scrollbars';
import DashMenu from '../dashMenu/DashMenu';
import './DashSideBar.css';

// Dash SideBar
const DashSideBar = () => {
  return (
    <div className='dash__sideBar-container scale-up-center'>
      <div className='dash__sideBar-links'>
        <Scrollbars style={{ width: '100%', height: '550px' }}>
          <div className='dash__sideBar-content'>
            <DashMenu />
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default DashSideBar
