import '../../styles/main.css'
import {useAuth} from "../../contexts/authContext";
import React from "react";

function Info(){
    const { currentUser } = useAuth();
    const {userData} = useAuth();


    return(
        <>
            {userData && (
                <div className='main-area'>
                    <div>Home</div>
                    <p>Email: {currentUser.email}</p>
                    <p>Name: {userData.name}</p>
                    <p>Surname: {userData.surname}</p>
                    <p>Status: {userData.status}</p>
                    <p>Type: {userData.type}</p>
                </div>)}
        </>
    )
}

export default Info