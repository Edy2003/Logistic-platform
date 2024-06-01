import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, set } from "firebase/database";
import { useAuth } from "../../contexts/authContext";
import { app } from "../../Firebase/firebase";

function CreateOrder() {
    const { currentUser } = useAuth();
    const [order, setOrder] = useState({
        name: '',
        weight: '',
        cost: '',
        city: '',
        deadline: ''
    });
    const [userOrders, setUserOrders] = useState([]);
    const db = getDatabase(app);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            console.error("Користувач не автентифікований");
            return;
        }
        try {
            const newOrderRef = push(ref(db, 'orders'));
            await set(newOrderRef, {
                ...order,
                orderId: newOrderRef.key,
                creatorUserId: currentUser.uid,
                receiverUserId: ''
            });
            setOrder({ name: '', weight: '', cost: '', city: '', deadline: '' });
        } catch (e) {
            console.error('Помилка додавання документа: ', e);
        }
    };

    useEffect(() => {
        const ordersRef = ref(db, 'orders');
        // Підписка на події додавання нових замовлень
        onValue(ordersRef, (snapshot) => {
            const orders = [];
            snapshot.forEach((childSnapshot) => {
                orders.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });
            setUserOrders(orders);
        });

        // Повернення функції відписки для очищення підписки при розмонтовці компонента
        return () => {
            // Відписка від подій
            // off(ordersRef);
        };
    }, [db]);

    return (
        <div className='main-area history'>
            <div className='order create'>
                <form className='order-form' onSubmit={handleSubmit}>
                    <div className='form-input'>
                        <span><p>Назва вантажу</p></span>
                        <input type='text' id='name' name='name' placeholder='Введіть назву' value={order.name}
                               onChange={handleChange} required/>
                    </div>
                    <div className='form-input'>
                        <span><p>Вага</p></span>
                        <input type='text' id='weight' name='weight' placeholder='Введіть вагу' value={order.weight}
                               onChange={handleChange} required/>
                    </div>
                    <div className='form-input'>
                        <span><p>Вартість за тонну</p></span>
                        <input type='text' id='cost' name='cost' placeholder='Введіть вартість' value={order.cost}
                               onChange={handleChange} required/>
                    </div>
                    <div className='form-input'>
                        <span><p>Місто</p></span>
                        <input type='text' id='city' name='city' placeholder='Введіть місто' value={order.city}
                               onChange={handleChange} required/>
                    </div>
                    <div className='form-input'>
                        <span><p>Термін</p></span>
                        <input type='date' id='deadline' name='deadline' placeholder='Введіть термін' value={order.deadline}
                               onChange={handleChange} required/>
                    </div>
                    <button type='submit'>Створити</button>
                </form>
            </div>
            <div className='orders'>
                <p className='orders-title'>Замовлення</p>
                {userOrders.map((order) => (
                    <div key={order.id} className='order'>
                        <p>Назва вантажу: {order.name}</p>
                        <p>Вага: {order.weight}</p>
                        <p>Вартість за тонну: {order.cost}</p>
                        <p>Місто: {order.city}</p>
                        <p>Термін: {order.deadline}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreateOrder;
