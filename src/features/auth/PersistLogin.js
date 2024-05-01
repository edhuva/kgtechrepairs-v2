import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { useRefreshMutation } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";
import usePersist from "../../hooks/usePersist";
import PulseLoader from "react-spinners/PulseLoader";

//Persist Login
const PersistLogin = () => {

    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);

    const [trueSuccess, setTrueSuccess] = useState(false);

    //refresh Mutation
    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {//React 18 Strict Mode

            const verifyRefreshToken = async () => {
                try {
                    //const response
                    await refresh()
                    //await { accessToken } = response.data

                    //refresh verified
                    setTrueSuccess(true)
                } catch(err) {
                    console.error(err)
                }
            }

            if (!token && persist) {
                verifyRefreshToken()
            }
        }

        return () => effectRan.current = true

        //eslint-disable-next-line
    }, [])

    let content;
    if (!persist) {// persist: no
        content = <Outlet />
    } else if (isLoading) {//persist: yes, token: no
        content = <div className="reLogin">
                <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 0em'}} />;
            </div>
    } else if (isError) {//persist: yes, token: no
        content = (
            <div className="reLogin">
                <p className='errmsg'>
                    {error?.data?.message ? `${error.data.message} - ` : `Network Error - `}
                    <Link to="/login">Please login again!</Link>.
                </p>
            </div>
            
        )
    } else if (isSuccess && trueSuccess) { //isSuccess && trueSuccess
        content = <Outlet />
    } else if (token && isUninitialized) { //token && isUninitialized
        content = <Outlet />
    }

  return content
}

export default PersistLogin
