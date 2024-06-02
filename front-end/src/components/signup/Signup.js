import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../../Firebase/firebase';
import '../../styles/login-form.css';

function Signup() {
    const navigate = useNavigate();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [usersInfo, setUsersInfo] = useState({
        type: 'Перевізник',
        status: 'ФОП',
        name: "",
        surname: '',
        email: "",
        password: "",
        producers_city: ""  // Нове поле для міста реєстрації
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const database = getDatabase(app);
    const auth = getAuth(app);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            try {
                setIsRegistering(true);
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Завантаження даних користувача у базу даних
                await set(ref(database, 'users/' + user.uid), {
                    status: usersInfo.status,
                    type: usersInfo.type,
                    name: usersInfo.name,
                    surname: usersInfo.surname,
                    email: email,
                    producers_city: usersInfo.producers_city,  // Додавання міста реєстрації до бази даних
                });

                setUsersInfo({
                    type: 'Перевізник',
                    status: 'ФОП',
                    name: "",
                    surname: '',
                    email: "",
                    password: "",
                    producers_city: ""  // Очищення поля для міста реєстрації
                });
                setUserLoggedIn(true);
                navigate('/home');
            } catch (error) {
                console.error("Error creating user:", error.message);
                setErrorMessage(error.message);
            } finally {
                setIsRegistering(false);
            }
        }
    }

    const inputChangeHandler = (e) => {
        setUsersInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <>
            {userLoggedIn && <Navigate to={'/home'} replace={true} />}
            <div className='login-form'>
                <form onSubmit={handleSubmit}>
                    <div className='form-type'>
                        <div className='form-type-inputs'>
                            <span className='label'><p>Хто ви</p></span>
                            <select onChange={inputChangeHandler} id='type' name='type'
                                    value={usersInfo.type}>
                                <option value='Перевізник'>Перевізник</option>
                                <option value='Виробник'>Виробник</option>
                                <option value='Одержувач'>Одержувач</option>
                            </select>
                        </div>
                        <div className='form-type-inputs'>
                            <span className='label'><p>Ваш статус</p></span>
                            <select onChange={inputChangeHandler} id='status' name='status'
                                    value={usersInfo.status}>
                                <option value='ФОП'>ФОП</option>
                                <option value='Юридична особа'>Юридична особа</option>
                                <option value='Фізична особа'>Фізична особа</option>
                            </select>
                        </div>
                    </div>
                    {usersInfo.type === 'Виробник' && (
                        <div className='form-inputs'>
                            <span className='label'><p>Місто реєстрації</p></span>
                            <input type='text' onChange={inputChangeHandler} id='producers_city' name='producers_city' placeholder='Місто реєстрації'
                                   value={usersInfo.producers_city} />
                        </div>
                    )}
                    <div className='form-inputs'>
                        <span className='label'><p>Name</p></span>
                        <input type='text' onChange={inputChangeHandler} id='name' name='name' placeholder='Name'
                               value={usersInfo.name} />
                    </div>
                    <div className='form-inputs'>
                        <span className='label'><p>Surname</p></span>
                        <input type='text' onChange={inputChangeHandler} id='surname' name='surname'
                               placeholder='Surname' value={usersInfo.surname} />
                    </div>
                    <div className='form-inputs'>
                        <span className='label'><p>Email</p></span>
                        <input onChange={(e) => setEmail(e.target.value)} type='email' id='email' name='email'
                               placeholder='Email' value={email} />
                    </div>
                    <div className='form-inputs'>
                        <span className='label'><p>Password</p></span>
                        <input onChange={(e) => setPassword(e.target.value)} type='password' id='password'
                               name='password' placeholder='Password' value={password} />
                    </div>
                    <button type="submit">Зареєструватись</button>
                </form>
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </>
    )
}

export default Signup;
