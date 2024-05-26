import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../authSlice';
import { useLoginMutation } from '../authApiSlice';
import { useNavigate, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { PulseLoader } from 'react-spinners';
import DashFormContainer from '../../auth/dashboard/DashFormContainer';
import usePersist from '../../../hooks/usePersist';
import { toast } from 'react-toastify';
import Notify from '../../../components/notify/Notify';
import useTitle from '../../../hooks/useTitle';

//Login
const Login = () => {
  
  useTitle('KGTech: Login');

  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [persist, setPersist] = usePersist();

  //login mutation
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, password])

  useEffect(() => {
      if (errMsg) {
        //error nofication
          errMsg ? toast.error(errMsg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          }) 
          : toast.error('Network Error', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
      }

      return () => toast()

  }, [errMsg])

  const canSave = [username, password].every(Boolean) && !isLoading;

  //handle Submit
  const handleSubmit = async () => {
    try {
      //get access Token
      const { accessToken } = await login({ username, password }).unwrap()

      //set Credentials
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/private/dash')

    } catch (err) {
      //if error
      if (!err.status) {
        setErrMsg('No server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message)
      }
      errRef.current.focus();
    }
  } 

  const handleBackToHome = () => navigate('/');

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist(prev => !prev);

  const errClass = errMsg ? 'errmsg' : 'offscreen';

  let contentloading;
     contentloading = isLoading && <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

  const content = (
    <>
      {contentloading}
      <Notify />
      <p ref={errRef} className={errClass} arial-live="assertive">{errMsg}</p>

      <div className='form__container'>
        <form className='form' onSubmit={(e) => e.preventDefault()}>
          <div className='title-row bold'>
            <p>Login</p>

            <div className='action-buttons'>
              <button className='icon-button save-icon-button' title='Back to Home'  onClick={handleBackToHome}
              >
                <FontAwesomeIcon icon={faArrowCircleLeft} />
              </button>
            </div>
          </div>

          <div className='row'>
            <div className='form__column--divider'>

              {/* Username input */}
              <div className='input__public--divider'>
                <label className='label' htmlFor='username'>
                  Username:
                </label>
                <input className={`form__input`} id='username' name='username' type='text' ref={userRef} autoComplete='off' placeholder='username' value={username} onChange={handleUserInput} />
              </div>

              {/* Password input */}
              <div className='input__public--divider'>
                <label className='label' htmlFor='password'>
                  Password:
                </label>
                <input className={`form__input`} id='password' name='password' type='password' placeholder='password' value={password} onChange={handlePwdInput} />
              </div>

              <div className='input--divider'>
                <label className="form__persist" htmlFor="persist">
                  <input className="form__checkbox" type="checkbox" id="persist" checked={persist} onChange={handleToggle} />
                  Trust This Device
                </label>
              </div>

              <div className='row input__public--divider'>
                <div className={canSave ? 'public__form--submit' : 'hide'}>
                  <button type='button' disabled={!canSave}  className='public__button' onClick={handleSubmit}>Login</button>
                </div>

                <div className='input--divider public__submit--link'>
                  Haven't registered?<br />
                  <span className="line">
                    <Link to='/signup'>Signup</Link>
                  </span>
                </div>
              </div>  
            </div>
          </div>
        </form>
      </div>
    </>
  )

  return (
    <div className='bg__img'>
      <div className='public__form-section'>
        <DashFormContainer title='Login' content={content} />
      </div>
    </div>
  )
}

export default Login
