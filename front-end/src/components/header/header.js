import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {doSignOut} from "../../Firebase/auth";
import {useAuth} from "../../contexts/authContext";
import '../../styles/header.css'
import logo from '../../logout.png'

function Header (){
    const navigate = useNavigate();
    const {userLoggedIn} = useAuth();

    return (
        <div className='header'>
            {userLoggedIn ?
                <div className='header-links-container-logout'>
                    <a className='header-link' onClick={() => doSignOut().then(() => {
                        navigate('/')
                    })}><img src={logo} alt='logo'/></a>

                </div>
                :
                <div className='header-links-container'>
                    <Link to={'/'} className='header-link'>Увійти</Link>
                    <Link to={'signup'} className='header-link'> Зареєструватись</Link>
                </div>}
        </div>
    )

}

export default Header;