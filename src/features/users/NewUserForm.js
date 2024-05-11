import { useRef, useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowCircleLeft, faUserFriends, faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAddNewUserMutation } from './usersApiSlice';
import { PulseLoader } from 'react-spinners';
import DashFormContainer from '../auth/dashboard/DashFormContainer';
import { ROLES } from '../../config/roles';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import useTitle from '../../hooks/useTitle';

//input regex
const USER_REGEX = /^[A-z][A-z0-9-_]{3,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// New User Form
const NewUserForm = () => {

  useTitle('KGTech: New User');

  const userRef = useRef();

    // addNewUse Mutation
    const [addNewUser, {
      isLoading,
      isSuccess,
      isError,
      error
    }] = useAddNewUserMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [userFocus, setUserFocus] =useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] =useState(false);
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] =useState(false);
    const [roles, setRoles] = useState(["User"]);

    useEffect(() => {
      userRef.current.focus();
    }, [])

    useEffect(() => {
      setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
      setValidPassword(PWD_REGEX.test(password));
      setValidMatchPwd(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
      if (isSuccess) {
        // if successfull
        setUsername('')
        setPassword('')
        setMatchPwd('')
        setRoles([])
        toast('✅ Successfuly Created user!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          color: "blue"
        });
      }

     return () => toast()
      
    }, [isSuccess, navigate])

    useEffect(() => {
      if (isError) {
        // error notification
        error?.data?.message ? toast.error(error.data.message, {
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

    }, [isError, error])

    const onUsernameChanged = e => setUsername(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);
    const onMatchPwdChanged = e => setMatchPwd(e.target.value);

    const onRolesChanged = e => {
      const value = Array.from(e.target.selectedOptions,
        (option) => option.value
      )

      setRoles(value)
    }

    const canSave = [roles.length, validUsername, (validPassword && validMatchPwd)].every(Boolean) && !isLoading;

    // Save User
    const onSaveUserClicked = async () => {
      if (canSave) {
        await addNewUser({ username, password, roles })
      }
    }

    const handleBackToDash = () => navigate('/private/dash');
    const handleBackToUsers = () => navigate('/private/dash/users');

    const options = Object.values(ROLES).map(role => {
      return (
        <option key={role} value={role}>{role}</option>
      )
    })

    const errClass = isError ? "errmsg": "offscreen";
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : '';

    let Contentload;
    Contentload = isLoading && <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;
    let errContent;
     errContent = error?.data?.message ? error.data.message : 'Network Error';

  const content = (
    <>
      {Contentload}
      <Notify />
      <p className={errClass}>{errContent}</p>
      
      <div className='form__container'>
        <form className='form' onSubmit={e => e.preventDefault()}>
          <div className='title-row bold'>
            <p>New User</p> 
            <div className='action-buttons'>
              <button className='icon-button save-icon-button' title='Back to DashBoard'  onClick={handleBackToDash}
              >
                <FontAwesomeIcon icon={faArrowCircleLeft} />
              </button>
              
              <button className='icon-button action-icon-button' title='Users List' 
              onClick={handleBackToUsers}>
                <FontAwesomeIcon icon={faUserFriends} />
              </button>

              <button className='icon-button save-icon-button save__btn' title='Save' 
              disabled={!canSave} onClick={onSaveUserClicked}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
              
            </div>
          </div>
          
          <div className='form__column--divider'>
            {/* username input */}
            <div className='input--divider'>
              <label className='label' htmlFor='username'>
                Username: 
                <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
              </label>
              <input className={`form__input `} id='username' name='username' type='text' ref={userRef}  autoComplete='off' placeholder='username' required aria-invalid={validUsername ? "false" : "true"} aria-describedby="userid" onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} value={username} onChange={onUsernameChanged} />
              <p id="userid" className={userFocus && username && !validUsername ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            {/* password input */}
            <div className='input--divider'>
              <label className='label' htmlFor='password'>
                Password: 
                <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
              </label>
              <input className={`form__input `} id='password' name='password' type='password' placeholder='password' required aria-invalid={validPassword ? "false" : "true"} aria-describedby="pwdid" onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} value={password} onChange={onPasswordChanged} />
              <p id="pwdid" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>
            </div>

            {/* confirm password input */}
            <div className='input--divider'>
              <label className='label' htmlFor='password'>
                Confirm Password: 
                <FontAwesomeIcon icon={faCheck} className={validMatchPwd && matchPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validMatchPwd || !matchPwd ? "hide" : "invalid"} />
              </label>
              <input className={`form__input `} id='cornfirm_pwd' name='cornfirm_pwd' type='password' placeholder='confirm password' required
              aria-invalid={validMatchPwd ? "false" : "true"} aria-describedby="confirmpwd" onFocus={() => setMatchPwdFocus(true)} onBlur={() => setMatchPwdFocus(false)} value={matchPwd} onChange={onMatchPwdChanged} />
              <p id="confirmpwd" className={matchPwdFocus && !validMatchPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
            </div>
          </div>

          {/* roles */}
          <label className='label' htmlFor='roles'>
            ASSIGNED ROLES: </label>
          <select id='roles' name='roles' className={`form__select ${validRolesClass}`} multiple={true} size='5' value={roles} onChange={onRolesChanged}>
          <option ></option>
            {options}
          </select>
        </form>
      </div>
    </>
    
   
  );


  return (
    <>
      <DashFormContainer title="Add New User" content={content} />
    </>
  )
}

export default NewUserForm
