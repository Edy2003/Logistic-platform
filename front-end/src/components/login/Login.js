import React from "react";
import {Link, Navigate} from "react-router-dom";
import {doSignInWithEmailAndPassword, doSignInWithGoogle} from "../../Firebase/auth";
import {useAuth} from "../../contexts/authContext";

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
            doSignInWithGoogle().catch(err=>{
                setIsSignIn(false)
            });
        }
    }

    return(
        <>
            {userLoggedIn && <Navigate to={'/home'} replace={true}/>}
            <div>
                <form action='' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' placeholder='Email'/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' placeholder='Password'/>
                    </div>
                    <button type="submit">Login</button>
                    <button type="button"
                            onClick={(e)=>{onGoogleSignIn(e)}}>
                        Login with Google
                    </button>
                    <Link to='/signup' type="submit">Create Account</Link>
                </form>
            </div>
        </>
    )
}

export default Login;