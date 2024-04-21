import React from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import {doSignInWithEmailAndPassword} from "../../Firebase/auth";
import {useAuth} from "../../contexts/authContext";

function Signup() {

    const navigate = useNavigate();
    const {userLoggedIn} = useAuth();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setconfirmPassword] = React.useState("");
    const [isRegistering, setIsRegistering] = React.useState(false);
    const [errorMessage,setErrorMessage] = React.useState({})

    async function handleSubmit (e){
        e.preventDefault();
        if(!isRegistering){
            setIsRegistering(true);
            await doSignInWithEmailAndPassword(email,password);
        }
    }

    return(
        <>
            {userLoggedIn && <Navigate to={'/home'} replace={true}/>}
            <div>
                <form action='' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' name='name' placeholder='Name'/>
                    </div>
                    <div>
                        <label htmlFor='surname'>Surname</label>
                        <input type='text' id='surname' name='surname' placeholder='Surname'/>
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' placeholder='Email'/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' placeholder='Password'/>
                    </div>
                    <button type="submit" >Sign-up</button>
                    <Link to='/' type="submit">Log in</Link>
                </form>
            </div>
        </>
    )
}

export default Signup;