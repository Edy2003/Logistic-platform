import '../../styles/main.css'
import React from "react";

function CreateOrder() {

    return(
        <div className='main-area history'>
            <div className='order create'>
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
                        <span><p>Вартість за тонну</p></span>
                        <input type='text' placeholder='Введіть вартість'/>
                    </div>
                    <div className='form-input'>
                        <span><p>Місто</p></span>
                        <input type='text' placeholder='Введіть місто'/>
                    </div>
                    <div className='form-input'>
                        <span><p>Термін</p></span>
                        <input type='date' placeholder='Введіть термін'/>
                    </div>
                </form>
                <button type='button'>Створити</button>
            </div>
        </div>
    )
}

export default CreateOrder