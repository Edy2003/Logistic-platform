function loginValidation (values){

    let error = {};

    if(values.email === ''){
        error.email = 'Email is required';
    }else{
        error.email = '';
    }

    if (values.password === ''){
        error.password = 'Password is required';
    }else if(values.password !== values.password){
        error.password = 'Не правильний пароль';
    }else{
        error.password = '';
    }


    return error;
}

export default loginValidation;