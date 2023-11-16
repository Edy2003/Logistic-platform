function Validation(values){
    let error={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.name === "") {
        error.name = "Введіть ім'я!!!"
    }else {error.name = ''}

    if(values.type === "") {
        error.type = "Оберіть тип!!!"
    }else {error.type = ''}

    if(values.activity === "") {
        error.activity = "Оберіть діяльність!!!"
    }else {error.activity = ''}

    if(values.lastName === "") {
        error.lastName = "Введіть прізвище!!!"
    }else {error.lastName = ''}

    if(values.surname === "") {
        error.surname = "Введіть по-батькові!!!"
    }else {error.surname = ''}

    if(values.location === "") {
        error.location = "Введіть локацію!!!"
    }else {error.location = ''}

    if(values.phone === "") {
        error.phone = "Введіть номер телефону!!!"
    }else {error.phone = ''}

    if(values.companyCode === "") {
        error.companyCode = "Введіть номер компанії!!!"
    }else {error.companyCode = ''}

    if(values.email === "") {
        error.email = "Введіть email!!!"
    } else if(!email_pattern.test(values.email)) {
        error.email = "Email не підходить!!!"
    }else {error.email = ''}

    if(values.password === "") {
        error.password = "Введіть пароль!!!"
    } else if(!password_pattern.test(values .password)) {
        error.password = "Пароль не підходить"
    } else {
        error.password =''
    }
    return error;
}

export default Validation