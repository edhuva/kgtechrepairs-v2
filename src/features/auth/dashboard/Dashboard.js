import useAuth from '../../../hooks/useAuth';
import useTitle from '../../../hooks/useTitle';
import DashBoardContainer from './DashBoardContainer';
import './Dashboard.css';

//Dashboard
const Dashboard = () => {

  const { username } = useAuth();

  useTitle(`KGTech: ${username}`);

  const date = new Date();
  const today = new Intl.DateTimeFormat('en-SA', { dateStyle: 'full', timeStyle: 'long'}).format(date);

  return (
      <>    
        <div className='main__dash-heading'>
          <h2>Dashboard</h2>
        </div>
        <div className='main__dash-time'>
          <p>{today}</p>
        </div>
        <div className='main__dash-container'>
            <div className='main__dash-welcome'>
              <h2>Welcome <span className='capitalize'>{username}</span>!</h2>
            </div>

            <div className='main__dash-content'>
              <DashBoardContainer />
            </div>
        </div>
      </>
  )
}

export default Dashboard
