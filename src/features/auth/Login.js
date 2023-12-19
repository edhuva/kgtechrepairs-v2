import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import useTitle from "../../hooks/useTitle";
import usePersist from "../../hooks/usePersist";
import KG_logo from "../../img/KG_logo.png";

const Login = () => {
  useTitle('Employee Login');
  
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()

      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Responce');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist(prev => !prev);

  const errClass = errMsg ? 'errmsg' : 'offscreen';

  if (isLoading) return <PulseLoader color={"#FFF"} />

  const content = (
    <section className="public">
      <header>
        <div className="login__header">
          <Link to='/dash' className='dash-header__logo'>
            <div className='kg__logo'>
              <img src={KG_logo} alt='logo'/>
            </div>
          </Link>
          <h1 className="dash-header__login-h1">Employee Login</h1>
        </div>
      </header>
      <main className="login" >
        <p ref={errRef} className={errClass} arial-live="assertive">{errMsg}</p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input className="form__input" type="text" id="username" ref={userRef} value={username} onChange={handleUserInput} autoComplete="off" required />

          <label htmlFor="password">Password:</label>
          <input className="form__input" type="password" id="password" value={password} onChange={handlePwdInput} required />
          <button className="form__submit-button">Sign In</button>

          <label className="form__persist" htmlFor="persist">
            <input className="form__checkbox" type="checkbox" id="persist" checked={persist} onChange={handleToggle} />
            Trust This Device
          </label>
        </form>
      </main>
      <footer>
        <Link to='/'>Back to Home</Link>
      </footer>
    </section>
  )

  return content;
}

export default Login
