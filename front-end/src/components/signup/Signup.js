import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from '../../Firebase/firebase'

function Signup() {
    const navigate = useNavigate();
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [usersInfo, setUsersInfo] = useState({ name: "", surname: '', email: "", password: "" });
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
                    name: usersInfo.name,
                    surname: usersInfo.surname,
                    email: email,
                });

                setUsersInfo({ name: "", surname: '', email: "", password: "" });
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
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input type='text' onChange={inputChangeHandler} id='name' name='name' placeholder='Name' value={usersInfo.name} />
                    </div>
                    <div>
                        <label htmlFor='surname'>Surname</label>
                        <input type='text' onChange={inputChangeHandler} id='surname' name='surname' placeholder='Surname' value={usersInfo.surname} />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type='email' id='email' name='email' placeholder='Email' value={email} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type='password' id='password' name='password' placeholder='Password' value={password} />
                    </div>
                    <button type="submit">Sign-up</button>
                    <Link to='/'>Log in</Link>
                </form>
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </>
    )
}

export default Signup;
