import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/authContext";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios";
import '../../styles/main.css';
import L from 'leaflet';
import 'leaflet-routing-machine';


function Home() {
    const { userData, currentUser } = useAuth();
    const [userOrders, setUserOrders] = useState([]);
    const [users, setUsers] = useState({});
    const [city1Coords, setCity1Coords] = useState({ lat: 0, lon: 0 });
    const [city2Coords, setCity2Coords] = useState({ lat: 0, lon: 0 });
    const [selectedCities, setSelectedCities] = useState([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null); // Додали стейт для збереження обраного замовлення
    const db = getDatabase();

    const mapRef = useRef(null);

    const customIcon = new L.Icon({
        iconUrl: require('../../map-icon.png'), // шлях до вашого файлу зображення
        iconSize: [20, 20], // розміри вашої іконки
    });

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
        setSelectedOrder(orderId);
    };
    const handleOrderClickDriver = async (orderId, order) => {
        setSelectedOrder(orderId);

        const cityName1 = order.city;
        const cityName2 = order.producers_city;

        try {
            const response1 = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${cityName1}`);
            const response2 = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${cityName2}`);

            if (response1.data.length > 0 && response2.data.length > 0) {
                const city1Lat = response1.data[0].lat;
                const city1Lon = response1.data[0].lon;
                const city2Lat = response2.data[0].lat;
                const city2Lon = response2.data[0].lon;

                console.log(`Координати міста ${cityName1}: lat ${city1Lat}, lon ${city1Lon}`);
                console.log(`Координати міста ${cityName2}: lat ${city2Lat}, lon ${city2Lon}`);

                setCity1Coords({ lat: city1Lat, lon: city1Lon });
                setCity2Coords({ lat: city2Lat, lon: city2Lon });

                setSelectedCities([
                    { lat: city1Lat, lon: city1Lon },
                    { lat: city2Lat, lon: city2Lon }
                ]);

            } else {
                console.error(`Місто ${cityName1} або ${cityName2} не знайдено`);
            }
        } catch (error) {
            console.error("Помилка отримання координат:", error);
        }
    };

    return (
        <>
            {userData && (
                <div className='main-area'>
                    <div className='map'>
                        <MapContainer center={[49.34, 25.36]} zoom={10} scrollWheelZoom={false} ref={mapRef}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=ARHbwD2WGESwbnMdlmyQ"
                            />
                            {selectedCities.map((city, index) => (
                                <Marker key={index} position={[city.lat, city.lon]} icon={customIcon}>
                                    <Popup>{`Місто ${index + 1}`}</Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                    <div className='orders'>
                        <p className='orders-title'>Замовлення</p>
                        {userRelatedOrders.length > 0 ? (
                            userRelatedOrders.map((order) => (
                                <div key={order.id} className='order'
                                     onClick={() => (userData.type === 'Одержувач' && handleOrderClick(order.id)) ||
                                         (userData.type === 'Перевізник' && handleOrderClickDriver(order.id,order))}>
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

