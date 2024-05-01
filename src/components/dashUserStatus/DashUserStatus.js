import useAuth from '../../hooks/useAuth';
import './DashUserStatus.css';

// DashUser Status
const DashUserStatus = () => {

  const { username, status } = useAuth();

  return (
    <div className='dash__userStatus'>
      <p className='nowrap'>Current User: <span className='capitalize'>{username}</span></p>
      <p className='nowrap'>Status: {status}</p>
    </div>
  )
}

export default DashUserStatus