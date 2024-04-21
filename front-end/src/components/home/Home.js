import React from "react";
import {useAuth} from "../../contexts/authContext";

function Home() {
    const {currentUser} = useAuth();


    return(
        <>
            <div>Home {currentUser?.email}</div>
        </>
    )
}

export default Home;