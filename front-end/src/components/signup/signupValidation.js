function signupValidation(values) {
    let error = {};

    if(values.name === ''){
        error.name = 'Email is required';
    }else{
        error.name = '';
    }
    if(values.surname === ''){
        error.surname = 'Email is required';
    }else{
        error.surname = '';
    }

    if(values.email === ''){
        error.email = 'Email is required';
    }else{
        error.email = '';
    }

    if (values.password === ''){
        error.password = 'Password is required';
    }/*else if(values.password !== values.password){
        error.password = 'Не правильний пароль';}*/
    else{
        error.password = '';
    }


    return error;
}

export default signupValidation;