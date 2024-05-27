import React from "react";
import { useAuth } from "../../contexts/authContext";
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'
import '../../styles/main.css'
import 'leaflet/dist/leaflet.css'


function Home() {
    const {userData} = useAuth();

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
                        <div className='order'>
                            <p># 1</p>
                            <div className='city'>
                                <p>Місто від: Тернопіль</p>
                                <p>Місто до: Житомир</p>
                            </div>

                            <p>Вантаж: зерно</p>
                            <p>Вартість: 3000грн</p>
                            <p>Вага: 1,5т.</p>
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
                        </div>
                    </div>
                </div>

            )}

        </>
    );
}

export default Home;
