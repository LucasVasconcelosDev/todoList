import validator from 'validator';
import usuarios from '../model/usuarios.js';

const areRegisterFieldsEmpty = (username, email, password) => {

    return !username || !email || !password ? true:false;
}

const areLoginFieldsEmpty = (email, password) => {

    return !email || !password ? true:false;
}

const areAddFieldsEmpty = (title, description, date) => {

    return !title || !description || !date ? true:false;
}

const doesUsernameExists = async (username) => {

    const existingUsername = await usuarios.findOne({ username: username });

    return existingUsername ? true:false;
}

const doesEmailExists = async (email) => {

    const existingEmail = await usuarios.findOne({ email: email });

    return existingEmail ? true:false;
}

const isValidEmail = (email) => {

    return validator.isEmail(email);
}

const capitalizeCategory = (category) => {

    const categoriaMinusculo = category.toLowerCase();

    const categoriaPadronizada = categoriaMinusculo[0].toUpperCase() + categoriaMinusculo.slice(1);

    return categoriaPadronizada;
}

export default { areRegisterFieldsEmpty, areLoginFieldsEmpty, areAddFieldsEmpty, doesUsernameExists, doesEmailExists, isValidEmail, capitalizeCategory };