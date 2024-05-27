import React from "react";

function GetOrder() {

    return(
        <div className='main-area center-align'>
            <div className='order create get'>
                <form className='order-form'>
                    <div className='form-input'>
                        <span><p>Назва вантажу</p></span>
                        <input type='text' placeholder='Введіть назву'/>
                    </div>
                    <div className='form-input'>
                        <span><p>Вага</p></span>
                        <input type='text' placeholder='Введіть вагу'/>
                    </div>
                    <div className='form-input'>
                        <span><p>Місто з</p></span>
                        <input type='text' placeholder='Введіть місто'/>
                    </div>
                    <div className='form-input'>
                        <span><p>Місто до</p></span>
                        <input type='text' placeholder='Введіть місто'/>
                    </div>
                    <div className='form-input'>
                        <span><p>Вартість за тонну</p></span>
                        <input type='text' placeholder='Введіть вартість'/>
                    </div>
                    <div className='form-input'>
                        <span><p>Термін</p></span>
                        <input type='date' placeholder='Введіть термін'/>
                    </div>
                </form>
                <button type='button'>Знайти</button>
            </div>
            <div className='orders filter-orders'>
                <p className='orders-title'>Доступні замовленнь</p>
                <div className='order'>
                    <p># 1</p>
                    <div className='city'>
                        <p>Місто від: Тернопіль</p>
                        <p>Місто до: Житомир</p>
                    </div>

                    <p>Вантаж: зерно</p>
                    <p>Вартість: 3000грн</p>
                    <p>Вага: 1,5т.</p>
                    <p className='date'>16.05.2024</p>
                </div>
                <div className='order'>
                    <p># 2</p>
                    <div className='city'>
                        <p>Місто від: Тернопіль</p>
                        <p>Місто до: Житомир</p>
                    </div>

                    <p>Вантаж: зерно</p>
                    <p>Вартість: 35000грн</p>
                    <p>Вага: 30т.</p>
                    <p className='date'>16.05.2024</p>
                </div>
                <div className='order'>
                    <p># 3</p>
                    <div className='city'>
                        <p>Місто від: Тернопіль</p>
                        <p>Місто до: Житомир</p>
                    </div>

                    <p>Вантаж: зерно</p>
                    <p>Вартість: 20000грн</p>
                    <p>Вага: 20т.</p>
                    <p className='date'>16.05.2024</p>
                </div>
            </div>
        </div>
    )
}

export default GetOrder