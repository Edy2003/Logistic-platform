import '../../styles/main.css'
import { useAuth } from "../../contexts/authContext";
import React from "react";
import avatar from '../../avatar-design.png'

function Info() {
    const { currentUser } = useAuth();
    const { userData } = useAuth();

    return (
        <>
            {userData && (
                <div className='main-area'>
                    <div className='order create info'>
                        <p>Email: {currentUser.email}</p>
                        <p>Name: {userData.name}</p>
                        <p>Surname: {userData.surname}</p>
                        <p>Status: {userData.status}</p>
                        <p>Type: {userData.type}</p>
                        {userData.type === 'Виробник' && (
                            <p>Місце реєстрації: {userData.producers_city}</p>
                        )}
                    </div>
                    <div className='logo'><img src={avatar} width='50%' /></div>
                </div>
            )}
        </>
    )
}

export default Info;
