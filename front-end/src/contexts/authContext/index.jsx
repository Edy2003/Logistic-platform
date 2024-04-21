import {auth} from "../../Firebase/firebase"
import React, {useContext, useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth"

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setcurrentUser] = React.useState(null);
    const [userLoggedIn, setUserLoggedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    async function initializeUser(user) {
        if (user){
            setcurrentUser({...user})
            setUserLoggedIn(true);
        }else{
            setcurrentUser(null);
            setUserLoggedIn(false);
        }

        setLoading(false);
    }

    const value ={
        currentUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}