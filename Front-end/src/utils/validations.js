import validator from 'validator';

const areRegisterFieldsEmpty = (username, email, password) => {

    return !username || !email || !password ? true:false;
}

const areLoginFieldsEmpty = (email, password) => {

    return !email || !password ? true:false;
}

const areAddFieldsEmpty = (title, description, date) => {

    return !title || !description || !date ? true:false;
}

const isValidEmail = (email) => {

    return validator.isEmail(email);
}

export default { areRegisterFieldsEmpty, areLoginFieldsEmpty, areAddFieldsEmpty, isValidEmail };