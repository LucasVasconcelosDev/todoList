const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://lucasvasconcelos:wuwg5ypL3W1uEL6G@cluster0.ay6siya.mongodb.net/");

const schemaTodoList = new mongoose.Schema({
    title:    {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    date:  {type: Date, required: true},
    idUsuario: {type: String, required: true}
});

const schemaUsuarios = new mongoose.Schema({
    username:  {type: String, required: true, unique: true},
    email:     {type: String, required: true, unique: true},
    password:     {type: String, required: true},
    foto:      {type: String, required: true}
});

const todoList = mongoose.model('todoList', schemaTodoList);
const usuarios = mongoose.model('usuarios', schemaUsuarios);


module.exports = {todoList, usuarios};
