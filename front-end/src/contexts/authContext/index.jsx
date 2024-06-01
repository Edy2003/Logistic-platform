import { auth } from "../../Firebase/firebase";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { get, getDatabase, ref, query, orderByChild, equalTo } from "firebase/database";

const AuthContext = React.createContext();

export function useAuth() {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [userOrders, setUserOrders] = useState([]);

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

            // Load user orders
            const ordersRef = query(ref(database, 'orders'), orderByChild('creatorUserId'), equalTo(currentUser.uid));
            get(ordersRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const orders = [];
                    snapshot.forEach((childSnapshot) => {
                        orders.push({ id: childSnapshot.key, ...childSnapshot.val() });
                    });
                    setUserOrders(orders);
                } else {
                    console.log("No orders available");
                }
            }).catch((error) => {
                console.error("Error getting user orders:", error);
            });
        }
    }, [currentUser]);

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }

        setLoading(false);
    }

    return { currentUser, userLoggedIn, loading, userData, userOrders };
}

export function AuthProvider({ children }) {
    const { currentUser, userLoggedIn, loading, userData, userOrders } = useAuth();
    const value = {
        currentUser,
        userLoggedIn,
        loading,
        userData,
        userOrders
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
