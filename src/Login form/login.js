import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Validation from "./loginValidation";
import axios from "axios";
import '../Styles/Registration-form.css'

function Login(){
    const [values,setValues]=useState({
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const [error,setErrors] = useState({})
    const handleInput = (ev)=>{
        setValues(prevState => ({...prevState, [ev.target.name]: [ev.target.value]}))
    }

    const handleSubmit = (ev)=>{
        ev.preventDefault();
        setErrors(Validation(values))
        if(error.email === '' && error.password === ''){
            axios.post('http://localhost:8081/login',values)
                .then (res => {
                    if(res.data === 'Success'){
                        navigate('/home')
                    }else{
                        alert('Невірний пароль чи логін')
                    }
                })
                .catch (err => console.log(err))
        }
    }

    return(
        <>
            <header>
                <div className='logo'>Logistic platform</div>
                <div>
                    <h3>Ще немає акунту?</h3>
                    <Link className='link' to='/signup'>Зареєструватись</Link>
                </div>
            </header>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <h1>Увійти</h1>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Введіть' name='email' onChange={handleInput}/>
                        {error.email && <span>{error.email}</span>}
                    </div>
                    <div>
                        <label htmlFor='password'>Пароль</label>
                        <input type='password' placeholder='Введіть' name='password' onChange={handleInput}/>
                        {error.password && <span>{error.password}</span>}
                    </div>
                    <div className='buttons'>
                        <button type='submit'>Увійти</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login