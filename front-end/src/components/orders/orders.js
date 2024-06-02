import '../../styles/main.css';
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { getDatabase, onValue, ref } from "firebase/database";

function Orders() {
    const { userData, currentUser } = useAuth();
    const [userOrders, setUserOrders] = useState([]);
    const [users, setUsers] = useState({});
    const db = getDatabase();

    useEffect(() => {
        if (currentUser) {
            const ordersRef = ref(db, 'orders');
            onValue(ordersRef, (snapshot) => {
                const orders = [];
                snapshot.forEach((childSnapshot) => {
                    const order = { id: childSnapshot.key, ...childSnapshot.val() };
                    if (order.status) { // Фільтрація замовлень зі статусом true
                        orders.push(order);
                    }
                });
                setUserOrders(orders);
            });
        }
    }, [currentUser, db]);

    useEffect(() => {
        const usersRef = ref(db, 'users');
        onValue(usersRef, (snapshot) => {
            const usersData = {};
            snapshot.forEach((childSnapshot) => {
                usersData[childSnapshot.key] = childSnapshot.val();
            });
            setUsers(usersData);
        });
    }, [db]);

    const getUserName = (userId) => {
        if (!userId || !users[userId]) {
            return 'Не призначено';
        }
        return users[userId].name || 'Не призначено';
    };

    const userRelatedOrders = userOrders.filter(order =>
        order.creatorUserId === currentUser.uid ||
        order.driverId === currentUser.uid ||
        order.producerId === currentUser.uid
    );

    return (
        <div className='main-area history'>
            <div className='orders'>
                <p className='orders-title'>Історія Замовлень</p>
                {userRelatedOrders.length > 0 ? (
                    userRelatedOrders.map((order) => (
                        <div key={order.id} className='order'>
                            <p>Назва вантажу: {order.name}</p>
                            <p>Вага: {order.weight}</p>
                            <p>Вартість за тонну: {order.cost}</p>
                            <p>Місто: {order.city}</p>
                            <p>Термін: {order.deadline}</p>
                            <p>Перевізник: {getUserName(order.driverId)}</p>
                            <p>Виробник: {getUserName(order.producerId)}</p>
                            <p>Статус: Виконано</p>
                            <p>Вартість: {order.cost * order.weight} грн.</p>
                        </div>
                    ))
                ) : (
                    <div className='order'>У вас поки немає замовлень</div>
                )}
            </div>
        </div>
    );
}

export default Orders;
