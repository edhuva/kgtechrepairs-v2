import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUserCircle, faArrowCircleLeft, faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useUpdateUserMutation } from './usersApiSlice';
import DashFormContainer from '../auth/dashboard/DashFormContainer';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';

//input regex
const USER_REGEX = /^[A-z][A-z0-9-_]{3,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// UpdateUser Account Details
const UpdateUserAccountDetails = ({ user }) => {

    const userRef = useRef();
    const errRef = useRef();

    // updateUser Mutation
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState(user.username);
    const [validUsername, setValidUsername] = useState(false);
    const [userFocus, setUserFocus] =useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] =useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username])
    
    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password])
  
    useEffect(() => {
      setErrorMsg('');
    }, [username, password])

    useEffect(() => {
        if(isSuccess ) {
            // if successfull
            setUsername(user?.username)
            setPassword('')
            toast('✅ Successfully Updated Account!', {
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
    }, [isSuccess, user?.username])

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

    // Save User
    const onSaveUserClicked = async () => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles: user.roles, active: user.active})
        } else {
            await updateUser({ id: user.id, username, roles: user.roles, active: user.active })
        }
    }

    const handleBackToDash = () => navigate('/private/dash/users/account');

    let canSave = false;
    if (username && validPassword) {
        canSave = [ validUsername, validPassword ].every(Boolean) && !isLoading;
    } 
    else if (username && !password ){
        console.log('passwordfalse')
        canSave = [validUsername].every(Boolean) && !isLoading;
    }

    const errClass = isError ? 'errmsg' : 'offscreen';

    let contentLoading;
    contentLoading = (isLoading) && <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

    let errContent;
    errContent = errorMsg && errorMsg;
    errContent = error?.data?.message ?? 'Network Error';

    const title = (
        <>
            <p>
                    <FontAwesomeIcon icon={faUserCircle} />
                    <span className='profile__span'>Update Your Account</span>
            </p>
        </>
    )

    const content = (
        <>
          {contentLoading}
          <Notify />
          <p ref={errRef} className={errClass}>{errContent}</p>
          
          <div className='form__container'>
            <form className='form' onSubmit={e => e.preventDefault()}>
                <div className='title-row bold'>
                    <p>Update</p> 
                    <label className='label form__checkbox-container' htmlFor='user-active'>
                        ACTIVE:
                        <label className=" table__cell--status margin">
                            { user.active
                                ? <span className="table__status--completed">Active</span>
                                : <span className="table__status--open">Inactive</span>
                            }
                        </label>
                    </label>
                    <div className='action-buttons'>
                        <button className='icon-button save-icon-button' title='Back to Account'  onClick={handleBackToDash}
                        >
                            <FontAwesomeIcon icon={faArrowCircleLeft} />
                        </button>
                        <button className='icon-button save-icon-button save__btn' title='Save' 
                        disabled={!canSave}
                        onClick={onSaveUserClicked}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>`
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
                    
                    {/* password */}
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
                </div>
                
                {/* roles */}
                <div className='form__column--divider'>
                    <div className="input--divider padding bg-light border">
                        <div className="row--select ">
                            <label className='label' htmlFor='roles'>
                                ROLES: 
                            </label>
                            <p>{user.roles.toString().replaceAll(',', '. ')}</p>
                        </div>
                    </div>
                </div>
            </form>
          </div>
        </>
      )
    
  return (
    <>
        <DashFormContainer title={title} content={content} />
    </>
  )
}

export default UpdateUserAccountDetails
