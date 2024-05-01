import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCheck, faInfoCircle, faTimes, faTrashCan, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice';
import DashFormContainer from '../auth/dashboard/DashFormContainer';
import { ROLES } from '../../config/roles';
import { toast } from 'react-toastify';
import Notify from '../../components/notify/Notify';

//input regex
const USER_REGEX = /^[A-z][A-z0-9-_]{3,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// Edit User Form
const EditUserForm = ({ user }) => {

  const userRef = useRef();
  const errRef = useRef();

  // updateUser Mutation
  const [updateUser, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateUserMutation();

  // deleteUser Mutation
  const [deleteUser, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] =useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] =useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

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
        setRoles(user?.roles)
        toast('✅ Successfuly Edited user!', {
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
  }, [isSuccess, user?.username, user?.roles])

  useEffect(() => {
    if(isDelSuccess) {
      // if successfull
        setUsername('')
        setPassword('')
        setRoles([])
      
        navigate(`/private/dash/users/`)
    }
  }, [isDelSuccess, navigate])

  useEffect(() => {
    if (isError || isDelError ) {
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
        : delerror?.data?.message ? toast.error(delerror.data.message, {
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

  }, [isError, isDelError, delerror, error])

  const onUsernameChanged = e => setUsername(e.target.value);
  const onPasswordChanged = e => setPassword(e.target.value);

  const onRolesChanged = e => {
    const values = Array.from(
        e.target.selectedOptions,
        (option) => option.value
    )
    setRoles(values)
  };

  const onActiveChanged = () => setActive(prev => !prev);

  // Save User
  const onSaveUserClicked = async () => {
    if (password) {
        await updateUser({ id: user.id, username, password, roles, active})
    } else {
        await updateUser({ id: user.id, username, roles, active })
    }
  }

  // Delete User
  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id })
  }
  
  // alert Delete
  const alertDelete = () => {
    ///* eslint-disable-next-line no-restricted-globals */
    let delet = window.confirm("Confirm Delete");
    if (delet) {
      onDeleteUserClicked()
    }
  }

  const handleBackToUsers = () => navigate('/private/dash/users');

  const options = Object.values(ROLES).map(role => {
    return (
        <option key={role}  value={role}>
            {role}
        </option>
    )
  })

  let canSave;
  if (password) {
    canSave = [roles.length, validUsername, validPassword ].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass = (isError || isDelError) ? 'errmsg' : 'offscreen';
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : '';
  
  let Contentload;
  Contentload = isLoading && <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;
  Contentload = isDelSuccess && <p>User Successfuly Deleted</p>
  
  let errContent;
     errContent = errorMsg && errorMsg;
     errContent = (error?.data?.message || delerror?.data?.message) ?? 'Network Error';

  const content = (
    <>
      {Contentload}
      <Notify />
      <p ref={errRef} className={errClass}>{errContent}</p>
      
      <div className='form__container'>
        <form className='form' onSubmit={e => e.preventDefault()}>
          <div className='title-row bold'>
            <p>Edit User</p> 
            <label className='label form__checkbox-container' htmlFor='user-active'>
                    ACTIVE:
                    <input className='form__checkbox' id='user-active' name='user-active' type='checkbox' checked={active} onChange={onActiveChanged} />
            </label>
            <div className='action-buttons'>
            <button className='icon-button save-icon-button' title='Back to UsersList'  onClick={handleBackToUsers}
              >
                <FontAwesomeIcon icon={faArrowCircleLeft} />
              </button>
              <button className='icon-button save-icon-button save__btn' title='Save' 
              disabled={!canSave}
              onClick={onSaveUserClicked}
              >
                <FontAwesomeIcon icon={faSave} />
              </button>
              <button className='icon-button save-icon-button' title='Delete' onClick={() => alertDelete()}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>

          {/* username input*/}
          <div className='form__column--divider'>
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
  )

  return (
    <>
      <DashFormContainer title="Edit User" content={content} />
    </>
  )
}

export default EditUserForm
