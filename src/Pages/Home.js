import React, {useState} from "react";
import '../Styles/home.css';
import Company from "./Company";
import Consignor from "./Consignor";
import Delivery from "./Delivery";

function Home (){
    const [menuValue, setMenuValue] = useState('Перевізник')
    const [active,setActive] = useState(false)

    const header = <header>
                        <div className='logo'>Logistic platform</div>
                        <div className='links'>
                            <a onClick={()=>setMenuValue('Перевізник')}>Перевізник</a>
                            <a onClick={()=>setMenuValue('Вантажовідправник')}>Вантажовідправник</a>
                            <a onClick={()=>setMenuValue('Компанія')}>Компанія</a>
                        </div>
                        <div className={'first-screen-top-bar-burger'}onClick={()=>setActive(!active)}></div>
                        <div className={active? 'activated-burger':'first-screen-top-bar-burger-animation' }onClick={()=>setActive(!active)}>
                            <div className={active? 'activated-burger-lines':'lines'}></div>
                            <div className={active? 'activated-burger-lines':'lines'}></div>
                            <div className={active? 'activated-burger-lines':'lines'}></div>
                        </div>
                        <div className={active? 'contactInfo':'hidden'}>
                            <h1>Контактна інформація</h1>
                        </div>
                    </header>


    switch (menuValue) {
        case 'Перевізник': return  <> {header} <Delivery status={true}/> </>;
        case 'Вантажовідправник': return  <> {header} <Consignor status={true}/> </>
        case 'Компанія': return  <> {header} <Company status={true}/> </>
    }

}

export default Home