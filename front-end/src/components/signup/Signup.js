import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import signupValidation from "./signupValidation";
import axios from "axios";

function Signup() {

    const navigate = useNavigate();
    const [values, setValues] = React.useState({
        name:'',
        surname:'',
        email:'',
        password:''
    });
    const [errors,setErrors] = React.useState({})

    function handleSubmit(e){
        e.preventDefault();
        setErrors(signupValidation(values));
        if(errors.name === '' && errors.surname === '' && errors.email === '' && errors.password === ''){
            axios.post('http://localhost:8081/signup',values)
            .then (res => {
                navigate('/');
            })
            .catch(err => console.log(err))
        }
    }

    function handleInput(e){
        setValues(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    return(
        <>
            <div>
                <form action='' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' name='name'
                               onChange={handleInput} placeholder='Name'/>
                        {errors.name && <span className='red'>{errors.name}</span>}
                    </div>
                    <div>
                        <label htmlFor='surname'>Surname</label>
                        <input type='text' id='surname' name='surname'
                               onChange={handleInput} placeholder='Surname'/>
                        {errors.surname && <span className='red'>{errors.surname}</span>}
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email'
                               onChange={handleInput} placeholder='Email'/>
                        {errors.email && <span className='red'>{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password'
                               onChange={handleInput} placeholder='Password'/>
                        {errors.password && <span className='red'>{errors.password}</span>}
                    </div>
                    <button type="submit" >Sign-up</button>
                    <Link to='/' type="submit">Log in</Link>
                </form>
            </div>
        </>
    )
}

export default Signup;