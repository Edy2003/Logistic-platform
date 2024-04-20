import React from "react";
import {Link} from "react-router-dom";

function Login() {

    return(
        <>
            <div>
                <form action=''>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' placeholder='Email' />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' placeholder='Password' />
                    </div>
                    <button type="submit">Login</button>
                    <Link to='/signup' type="submit">Create Account</Link>
                </form>
            </div>
        </>
    )
}

export default Login;