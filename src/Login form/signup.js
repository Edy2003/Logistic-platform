import React,{useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Validation from "./signupValidation";
import axios from "axios";
import '../Styles/Registration-form.css'

function SignUp(){
    const [values,setValues]=useState({
        name:'',
        type:'Підприємець',
        activity:'Перевізник',
        lastName:'',
        surname:'',
        location:'',
        companyCode:'',
        phone:'',
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
        setErrors(Validation(values));
        if(error.name === '' && error.email === ''  && error.lastName === '' && error.surname ===''
        && error.location === '' && error.companyCode === '' && error.phone === ''){
            axios.post('http://localhost:8081/signup',values)
                .then (res => {
                    navigate('/')
                })
                .catch (err => alert('Заповніть всі поля!!!'))
        }
    }

    return(
        <>
            <header>
                <div className='logo'>Logistic platform</div>
                <div>
                    <h3>Ви зареєстровані?</h3>
                    <Link className='link' to='/'>Увійти</Link>
                </div>
            </header>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <h1>Реєстрація</h1>
                    <div className='userInfo'>
                            <select name='type' onChange={handleInput} required>
                                <option value='Підприємець'>Підприємець</option>
                                <option value='Юридична особа'>Юридична особа</option>
                                <option value='Фізична особа'>Фізична особа</option>
                            </select>
                            {error.type && <span>{error.type}</span>}
                            <select name='activity' onChange={handleInput} required>
                                <option value='Перевізник'>Перевізник</option>
                                <option value='Вантажовідправник'>Вантажовідправник</option>
                                <option value='Компанія'>Компанія</option>
                            </select>
                            {error.activity && <span>{error.activity}</span>}
                    </div>
                    <div className='PIB'>
                        <div>
                            <label htmlFor='name'>Ім'я</label>
                            <input type='text' placeholder='Введіть' name='name' onChange={handleInput}/>
                            {error.name && <span>{error.name}</span>}
                        </div>
                        <div>
                            <label htmlFor='lastName'>Прізивще</label>
                            <input type='text' placeholder='Введіть' name='lastName' onChange={handleInput}/>
                            {error.lastName && <span>{error.lastName}</span>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor='surname'>По батькові</label>
                        <input type='text' placeholder='Введіть' name='surname' onChange={handleInput}/>
                        {error.surname && <span>{error.surname}</span>}
                    </div>
                    <div>
                        <label htmlFor='location'>Місто реєстрації</label>
                        <input type='text' placeholder='Введіть' name='location' onChange={handleInput}/>
                        {error.location && <span>{error.location}</span>}
                    </div>
                    <div>
                        <label htmlFor='companyCode'>Код фірми</label>
                        <input type='text' placeholder='Введіть' name='companyCode' onChange={handleInput}/>
                        {error.companyCode && <span>{error.companyCode}</span>}
                    </div>
                    <div>
                        <label htmlFor='phone'>Номер телефону</label>
                        <input type='tel' placeholder='Введіть' name='phone' onChange={handleInput}/>
                        {error.phone && <span>{error.phone}</span>}
                    </div>
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
                        <button type='submit'>Зареєструватись</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp