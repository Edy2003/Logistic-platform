import React from 'react';
import {Link} from "react-router-dom";

function Signup() {

    return(
        <>
            <div>
                <form action=''>
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
                    <button type="submit">Sign-up</button>
                    <Link to='/' type="submit">Log in</Link>
                </form>
            </div>
        </>
    )
}

export default Signup;