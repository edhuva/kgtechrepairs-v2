import { useRef, useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowCircleLeft, faUserGear, faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { PulseLoader } from 'react-spinners';
import { useAddNewEmployeeMutation } from './employeesApiSlice';
import DashFormContainer from '../auth/dashboard/DashFormContainer';
import { ROLES } from '../../config/roles';
import { EXPERTIES } from '../../config/experties';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';
import useTitle from '../../hooks/useTitle';

//input regex
const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,24}$/;
const FULLNAME_REGEX = /^[A-z ]{3,20}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONENO_REGEX = /^[0-9+]{10,15}$/

// New Employee Form
const NewEmployeeForm = () => {

  useTitle('KGTech: New Employee');

  const userRef = useRef();

  // addNewEmployee Mutation
  const [addNewEmployee, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewEmployeeMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] =useState(false);
  const [fullname, setFullname] = useState('');
  const [validFullname, setValidFullname] = useState(false)
  const [fullnameFocus, setFullnameFocus] =useState(false);
  const [phoneNo, setPhoneNo] = useState('');
  const [validPhoneNo, setValidPhoneNo] = useState(false);
  const [phoneNoFocus, setPhoneFocus] =useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] =useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] =useState(false);
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] =useState(false);
  const [roles, setRoles] = useState(["User"]);
  const [experties, setExperties] = useState(["Hardware"]);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(username));
  }, [username])

  useEffect(() => {
    setValidFullname(FULLNAME_REGEX.test(fullname));
  }, [fullname])

  useEffect(() => {
    setValidPhoneNo(PHONENO_REGEX.test(phoneNo));
  }, [phoneNo])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatchPwd(password === matchPwd);
  }, [password, matchPwd])

  useEffect(() => {
    if (isSuccess) {
      // if successfull
      setUsername('')
      setFullname('')
      setPhoneNo('')
      setEmail('')
      setPassword('')
      setMatchPwd('')
      setRoles([])
      setExperties([])
      toast('✅ Successfuly Created Employee!', {
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
  const onFullnameChanged = e => setFullname(e.target.value);
  const onPhoneNoChanged = e => setPhoneNo(e.target.value);
  const onEmailChanged = e => setEmail(e.target.value);
  const onPasswordChanged = e => setPassword(e.target.value);
  const onMatchPwdChanged = e => setMatchPwd(e.target.value);

  const onRolesChanged = e => {
    const value = Array.from(e.target.selectedOptions,
      (options) => options.value
     )
    setRoles(value)
  }

  const onExpertiesChanged = e => {
    const value = Array.from(e.target.selectedOptions,
      (options) => options.value
     )
    setExperties(value)
  }

  const canSave = [roles.length, experties.length, validUsername, validFullname, validPhoneNo, validEmail, (validPassword && validMatchPwd)].every(Boolean) && !isLoading;

  // Save Employee
  const onSaveEmployeeClicked = async () => {

    if (canSave) {
      await addNewEmployee({ username, fullname, phoneNo, email, password, roles, experties });
    }
  }

  const handleBackToDash = () => navigate('/private/dash');
  const handleBackToEmployees = () => navigate('/private/dash/employees');

  const rolesOptions = Object.values(ROLES).map(role => {
    return (
      <option key={role} value={role}>{role}</option>
    )
  })

  const expertiesOptions = Object.values(EXPERTIES).map(expertie =>{
    return (
      <option key={expertie} value={expertie}>{expertie}</option>
    )
  })

  const errClass = isError ? "errmsg" : "offscreen";
  
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : '';
  const validExpertiesClass = !Boolean(experties.length) ? 'form__input--incomplete' : '';

  // const expertiesOptns =  <select id='experties' name='experties' className={`form__select ${validExpertiesClass}`} multiple={true} size={2}  value={experties} onChange={onExpertiesChanged}>
  //   {expertiesOptions}
  // </select>
  const expertiesOptns =  <select id='experties' name='experties' className={`form__select ${validExpertiesClass}`}  value={experties} onChange={onExpertiesChanged}>
  {expertiesOptions}
</select>

  // const rolesOptns = <select id='roles' name='roles' className={`form__select ${validRolesClass}`} multiple={true} size={2} value={roles} onChange={onRolesChanged}>
  //   {rolesOptions}
  // </select>
  const rolesOptns = <select id='roles' name='roles' className={`form__select ${validRolesClass}`}  value={roles} onChange={onRolesChanged}>
  {rolesOptions}
</select>
  
  let contentLoading;
  contentLoading = isLoading && <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

  let errContent;
  errContent = error?.data?.message ? error.data.message : 'Network Error';

  const content = (
    <>
    {contentLoading}
    <Notify />
    <p className={errClass}>{errContent}</p>

    <div className='form__container'>
      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <div className='title-row bold'>
          <p>New Employee</p>
          <div className='action-buttons'>
            <button className='icon-button save-icon-button' title='Back to DashBoard'  onClick={handleBackToDash}
              >
              <FontAwesomeIcon icon={faArrowCircleLeft} />
            </button>
             <button className='icon-button save-icon-button' title='Employees List' onClick={handleBackToEmployees} 
              >
              <FontAwesomeIcon icon={faUserGear} />
            </button>
            <button className='icon-button save-icon-button save__btn' title='Save' onClick={onSaveEmployeeClicked} 
                disabled={!canSave}
                >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

          <div className='row'> 
            <div className='form__column--divider'>

              {/* Username input */}
              <div className='input--divider'>
                <label className='label' htmlFor='username'>
                  Username:
                  <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
                </label>
                <input className={`form__input`} id='username' name='username' type='text' ref={userRef} autoComplete='off' placeholder='username' required aria-invalid={validUsername ? "false" : "true"} aria-describedby="userid" onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} value={username} onChange={onUsernameChanged} />
                <p id="userid" className={userFocus && username && !validUsername ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
              </div>
          
              {/* Fullname input */}
              <div className='input--divider'>
                <label className='label' htmlFor='fullname'>
                  Fullname:
                  <FontAwesomeIcon icon={faCheck} className={validFullname ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validFullname || !fullname ? "hide" : "invalid"} />
                </label>
                <input className={`form__input `} id='fullname' name='fullname' type='text' autoComplete='off' placeholder='fullname' required aria-invalid={validFullname ? "false" : "true"} aria-describedby="nameid" onFocus={() => setFullnameFocus(true)} onBlur={() => setFullnameFocus(false)} value={fullname} onChange={onFullnameChanged} />
                <p id="nameid" className={fullnameFocus && fullname && !validFullname ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  3 to 24 characters.<br />
                  Must be letters.<br />
                </p>
              </div>

              {/* Phone input */}
              <div className='input--divider'>
                <label className='label' htmlFor='phoneNo'>
                  Phone: 
                  <FontAwesomeIcon icon={faCheck} className={validPhoneNo ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validPhoneNo || !phoneNo ? "hide" : "invalid"} />
                </label>
                <input className={`form__input`} id='phoneNo' name='PhoneNo' type='text' autoComplete='off' placeholder='phone' required aria-invalid={validPhoneNo ? "false" : "true"} aria-describedby="phoneid" onFocus={() => setPhoneFocus(true)} onBlur={() => setPhoneFocus(false)} value={phoneNo} onChange={onPhoneNoChanged} />
                <p id="phoneid" className={phoneNoFocus && phoneNo && !validPhoneNo ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  10 to 24 numbers.<br />
                  <br />
                  Begin with plus(+) is allowed.
                </p>
              </div>

              {/* Email input */}
              <div className='input--divider'>
                <label className='label' htmlFor='Email'>
                  Email:
                  <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                  <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                </label>
                <input className={`form__input `} id='email' name='email' type='text' autoComplete='off' placeholder='email' required aria-invalid={validEmail ? "false" : "true"} aria-describedby="emailid" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} value={email} onChange={onEmailChanged} />
                <p id="emailid" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  12 to 24 characters.<br />
                  <br />
                  Letters, numbers, @, fullstop allowed.
                </p>
              </div>

              {/* Password input */}
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

              {/* Confirm Password input */}
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

            <div className='form__divider'>
              <div className='form__row--select'>
                <div className='row'>
                  <label className='label' htmlFor='experties'>
                  EXPERTIES: </label>
                  {expertiesOptns}
                </div>
                <div className='row'>
                  <label className='label' htmlFor='roles'>
                    ASSIGNED ROLES: </label>
                  {rolesOptns}
                </div>
              </div>
            </div>
          </div>
      </form>
    </div>
    </>
  )

  return(
    <>
    <DashFormContainer title="Add New Employee" content={content} />
  </>
  )
}

export default NewEmployeeForm
