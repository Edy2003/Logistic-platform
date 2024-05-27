import '../../styles/main.css'
import React from "react";

function Orders(){


    return(
        <div className='main-area history'>
            <div className='orders'>
                <p className='orders-title'>Історія Замовленнь</p>
                <div className='order'>
                    <p># 1</p>
                    <div className='city'>
                        <p>Місто від: Тернопіль</p>
                        <p>Місто до: Житомир</p>
                    </div>

                    <p>Вантаж: зерно</p>
                    <p>Вартість: 3000грн</p>
                    <p>Вага: 1,5т.</p>
                    <p className='date'>07.03.2024</p>
                </div>
                <div className='order'>
                    <p># 2</p>
                    <div className='city'>
                        <p>Місто від: Вінниця</p>
                        <p>Місто до: Чернівці</p>
                    </div>

                    <p>Вантаж: щебінь</p>
                    <p>Вартість: 35000грн</p>
                    <p>Вага: 30т.</p>
                    <p className='date'>20.04.2024</p>
                </div>
                <div className='order'>
                    <p># 3</p>
                    <div className='city'>
                        <p>Місто від: Бережани</p>
                        <p>Місто до: Хмельницьк</p>
                    </div>

                    <p>Вантаж: пісок</p>
                    <p>Вартість: 20000грн</p>
                    <p>Вага: 20т.</p>
                    <p className='date'>07.05.2024</p>
                </div>
                <div className='order'>
                    <p># 4</p>
                    <div className='city'>
                        <p>Місто від: Чортків</p>
                        <p>Місто до: Зарваниця</p>
                    </div>

                    <p>Вантаж: дрова</p>
                    <p>Вартість: 5000грн</p>
                    <p>Вага: 12т.</p>
                    <p className='date'>15.05.2024</p>
                </div>
                <div className='order'>
                    <p># 5</p>
                    <div className='city'>
                        <p>Місто від: Івано-Франківськ</p>
                        <p>Місто до: Рівне</p>
                    </div>

                    <p>Вантаж: щебінь</p>
                    <p>Вартість: 35000грн</p>
                    <p>Вага: 28т.</p>
                    <p className='date'>24.05.2024</p>
                </div>
            </div>
        </div>
    )
}

export default Orders