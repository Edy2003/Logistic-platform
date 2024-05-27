import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {doSignOut} from "../../Firebase/auth";
import {useAuth} from "../../contexts/authContext";
import '../../styles/header.css'
import logo from '../../logout.png'


function Header (){
    const navigate = useNavigate();
    const {userLoggedIn} = useAuth();
    const {userData} = useAuth();


    return (
        <div className='header'>
            {userLoggedIn && userData ?
                <div className='header-container'>
                    <p className='logo'><Link to={'/home'} className='header-link'>Logistic platform</Link></p>
                    <div className='header-links-container'>
                        <Link to={'/home/orders'} className='header-link'>Мої замовлення</Link>
                        {(userData.type)==='Перевізник' ? <Link to={'/home/get-order'} className='header-link'>Прийняти замовлення</Link>
                            : <Link to={'/home/create-order'} className='header-link'>Створити замовлення</Link> }
                        <Link to={'/home/info'} className='header-link'>Про тебе</Link>
                    </div>
                    <a className='header-link' onClick={() => doSignOut().then(() => {
                        navigate('/')
                    })}><img src={logo} alt='logo'/></a>

                </div>
                :
                <div className='header-container'>
                    <p className='logo'>Logistic Platform</p>
                    <div className='header-links-container reg'>
                        <Link to={'/'} className='header-link'>Увійти</Link>
                        <Link to={'signup'} className='header-link'> Зареєструватись</Link>
                    </div>
                </div>}
        </div>
    )

}

export default Header;