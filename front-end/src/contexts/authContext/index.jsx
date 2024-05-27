import {auth} from "../../Firebase/firebase"
import React, {useContext, useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth"
import {get, getDatabase, ref} from "firebase/database";

const AuthContext = React.createContext();

export function useAuth(){
    const [currentUser, setcurrentUser] = React.useState(null);
    const [userLoggedIn, setUserLoggedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    useEffect(() => {
        if (currentUser) {
            const database = getDatabase();
            const userRef = ref(database, `users/${currentUser.uid}`);

            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    setUserData(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error("Error getting user data:", error);
            });
        }
    }, [currentUser]);


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
    return {currentUser, userLoggedIn, loading,userData}
    // return useContext(AuthContext);
    // return {userLoggedIn:true, currentUser: {}};
}

export function AuthProvider({ children }) {
    const {currentUser, userLoggedIn, loading} = useAuth();
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