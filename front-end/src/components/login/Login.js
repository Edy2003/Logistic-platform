import React from "react";
import {Link, Navigate} from "react-router-dom";
import {doSignInWithEmailAndPassword, doSignInWithGoogle} from "../../Firebase/auth";
import {useAuth} from "../../contexts/authContext";
import '../../styles/login-form.css'
import google from '../../google.png'

function Login() {

    const {userLoggedIn} = useAuth();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isSignIn, setIsSignIn] = React.useState(false);
    const [errorMessage,setErrorMessage] = React.useState({})

    async function handleSubmit (e){
        e.preventDefault();
        if(!isSignIn){
            setIsSignIn(true);
            await doSignInWithEmailAndPassword(email,password);
        }
    }

    function onGoogleSignIn (e){
        e.preventDefault()
        if(!isSignIn){
            setIsSignIn(true);
            doSignInWithGoogle().finally(err=>{
                setIsSignIn(false)
            });
        }
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    return(
        <>
            {userLoggedIn && <Navigate to={'/home'} replace={true}/>}
            <div className='login-form'>
                <form onSubmit={handleSubmit}>
                    <div className='form-inputs'>
                        <span className='label'><p>Email</p></span>
                        <input onChange={emailChangeHandler} type='email' id='email' name='email'
                               placeholder='Введіть Email'/>
                    </div>
                    <div className='form-inputs'>
                        <span className='label'><p>Password</p></span>
                        <input onChange={passwordChangeHandler} type='password' id='password' name='password'
                               placeholder='Введіть пароль'/>
                    </div>
                    <button type="button"
                            onClick={onGoogleSignIn}>
                        Увійти через Google <img src={google} alt='google'/>
                    </button>
                    <button type="submit">Увійти</button>
                </form>
            </div>
        </>
    )
}

export default Login;