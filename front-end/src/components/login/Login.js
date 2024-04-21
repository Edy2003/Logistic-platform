import React from "react";
import {Link} from "react-router-dom";
import loginValidation from "./loginValidation";

function Login() {

    const [values, setValues] = React.useState({
        email:'',
        password:''
    });
    const [errors,setErrors] = React.useState({})

    function handleSubmit(e){
        e.preventDefault();
        setErrors(loginValidation(values));
    }

    function handleInput(e){
        setValues(prev => ({...prev, [e.target.name]: e.target.value}));
    }
    return(
        <>
            <div>
                <form action='' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' placeholder='Email'
                               onChange={handleInput}/>
                        {errors.email && <span className='red'>{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' placeholder='Password'
                               onChange={handleInput}/>
                        {errors.password && <span className='red'>{errors.password}</span>}
                    </div>
                    <button type="submit">Login</button>
                    <Link to='/signup' type="submit">Create Account</Link>
                </form>
            </div>
        </>
    )
}

export default Login;