import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { useAuth } from "../../contexts/authContext";

function GetOrder() {
    const { currentUser, userData } = useAuth();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        weight: '',
        cityFrom: '',
        cityTo: '',
        cost: '',
        deadline: ''
    });
    const db = getDatabase();

    useEffect(() => {
        const ordersRef = ref(db, 'orders');
        onValue(ordersRef, (snapshot) => {
            const ordersList = [];
            snapshot.forEach((childSnapshot) => {
                ordersList.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            setOrders(ordersList);
            setFilteredOrders(ordersList);
        });
    }, [db]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        const filtered = orders.filter((order) => {
            return Object.keys(filters).every(key => {
                if (!filters[key]) return true;
                return order[key] && order[key].toLowerCase().includes(filters[key].toLowerCase());
            });
        });
        setFilteredOrders(filtered);
    };

    const handleSelectOrder = async (orderId) => {
        if (!currentUser) {
            console.error("Користувач не автентифікований");
            return;
        }
        const orderRef = ref(db, `orders/${orderId}`);
        const updateData = userData.type === 'Перевізник' ? { driverId: currentUser.uid } : { producerId: currentUser.uid, producers_city: userData.producers_city };
        await update(orderRef, updateData);
    };

    return (
        <div className='main-area center-align'>
            <div className='order create get'>
                <form className='order-form' onSubmit={handleFilterSubmit}>
                    <form className='order-form' onSubmit={handleFilterSubmit}>
                        <div className='form-input'>
                            <span><p>Назва вантажу</p></span>
                            <input type='text' name='name' placeholder='Введіть назву' value={filters.name} onChange={handleFilterChange} />
                        </div>
                        <div className='form-input'>
                            <span><p>Вага</p></span>
                            <input type='text' name='weight' placeholder='Введіть вагу' value={filters.weight} onChange={handleFilterChange} />
                        </div>
                        <div className='form-input'>
                            <span><p>Місто з</p></span>
                            <input type='text' name='cityFrom' placeholder='Введіть місто' value={filters.cityFrom} onChange={handleFilterChange} />
                        </div>
                        <div className='form-input'>
                            <span><p>Вартість за тонну</p></span>
                            <input type='text' name='cost' placeholder='Введіть вартість' value={filters.cost} onChange={handleFilterChange} />
                        </div>
                        <div className='form-input'>
                            <span><p>Термін</p></span>
                            <input type='date' name='deadline' placeholder='Введіть термін' value={filters.deadline} onChange={handleFilterChange} />
                        </div>
                        <button type='submit'>Знайти</button>
                    </form>
                </form>
            </div>
            <div className='orders filter-orders'>
                <p className='orders-title'>Доступні замовлення</p>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        // Додамо умову для перевірки заповнення полів driverId та producerId
                        (!order.driverId && !order.producerId) && (
                            <div key={order.id} className='order'>
                                <p>Назва вантажу: {order.name}</p>
                                <p>Вага: {order.weight}</p>
                                <p>Місто з: {order.cityFrom}</p>
                                <p>Місто до: {order.cityTo}</p>
                                <p>Вартість за тонну: {order.cost}</p>
                                <p>Термін: {order.deadline}</p>
                                {/* Кнопка обрати замовлення */}
                                <button onClick={() => handleSelectOrder(order.id)}>Обрати</button>
                            </div>
                        )
                    ))
                ) : (
                    <div className='order'>Немає доступних замовлень</div>
                )}
            </div>
        </div>
    );
}

export default GetOrder;
