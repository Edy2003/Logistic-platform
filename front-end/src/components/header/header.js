import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {doSignOut} from "../../Firebase/auth";
import {useAuth} from "../../contexts/authContext";

function Header (){
    const navigate = useNavigate();
    const {userLoggedIn} = useAuth();

    return (
        <>
            {userLoggedIn ?
                <>
                    <button onClick={() => doSignOut().then(() => {
                        navigate('/')
                    })}>Sign out
                    </button>
                </>
            :
                <>
                    <Link to={'/'}>Увійти</Link>
                    <Link to={'signup'}> Зареєструватись</Link>
                </>}
        </>
    )

}

export default Header;