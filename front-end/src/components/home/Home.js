import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import '../../styles/main.css';
import 'leaflet/dist/leaflet.css';

function Home() {
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
                    if (!order.status) { // Фільтрація замовлень зі статусом false
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

    const userRelatedOrders = userOrders.filter(order =>
        order.creatorUserId === currentUser.uid ||
        order.driverId === currentUser.uid ||
        order.producerId === currentUser.uid
    );

    const getStatus = (order) => {
        if (!order.driverId && !order.producerId) {
            return 'В обробці';
        } else if (order.driverId && !order.producerId) {
            return 'В пошуку виробника';
        } else if (!order.driverId && order.producerId) {
            return 'В пошуку водія';
        } else {
            return 'Замовлення прийнято';
        }
    };

    const getUserName = (userId) => {
        if (!userId || !users[userId]) {
            return 'Не призначено';
        }
        return users[userId].name || 'Не призначено';
    };

    const handleOrderClick = async (orderId) => {
        if (!currentUser) {
            console.error("Користувач не автентифікований");
            return;
        }

        const orderRef = ref(db, `orders/${orderId}`);
        const updateData = { status: true }; // Оновлення статусу на "виконано"

        try {
            await update(orderRef, updateData);
            console.log("Статус замовлення оновлено на 'виконано'.");
        } catch (error) {
            console.error("Помилка оновлення статусу замовлення:", error.message);
        }
    };

    return (
        <>
            {userData && (
                <div className='main-area'>
                    <div className='map'>
                        <MapContainer center={[49.34, 25.36]} zoom={10} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=ARHbwD2WGESwbnMdlmyQ"
                            />
                            <Marker position={[51.505, -0.09]}>
                                <Popup>
                                    This is a popup
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    <div className='orders'>
                        <p className='orders-title'>Замовлення</p>
                        {userRelatedOrders.length > 0 ? (
                            userRelatedOrders.map((order) => (
                                <div key={order.id} className='order'
                                     onClick={() => userData.type === 'Одержувач' && handleOrderClick(order.id)}>
                                    <p>Назва вантажу: {order.name}</p>
                                    <p>Вага: {order.weight}</p>
                                    <p>Вартість за тонну: {order.cost}</p>
                                    <p>Місто: {order.city}</p>
                                    <p>Термін: {order.deadline}</p>
                                    <p>Перевізник: {getUserName(order.driverId)}</p>
                                    <p>Виробник: {getUserName(order.producerId)}</p>
                                    <p>Статус: {getStatus(order)}</p>
                                    <p>Вартість: {order.cost * order.weight} грн.</p>
                                </div>

                            ))
                        ) : (
                            <div className='order'>У вас поки немає замовлень</div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
