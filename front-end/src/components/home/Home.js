import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { getDatabase, ref, get } from "firebase/database";


function Home() {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);

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

    return (
        <>
            <div>Home</div>
            {userData && (
                <div>
                    <p>Email: {currentUser.email}</p>
                    <p>Name: {userData.name}</p>
                    <p>Surname: {userData.surname}</p>
                    {/* Додаткові дані користувача */}
                </div>
            )}
        </>
    );
}

export default Home;
