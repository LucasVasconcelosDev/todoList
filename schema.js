const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://lucasvasconcelos:wuwg5ypL3W1uEL6G@cluster0.ay6siya.mongodb.net/");

const schemaTodoList = new mongoose.Schema({
    titulo:    {type: String, required: true},
    descricao: {type: String, required: true},
    categoria: {type: String, required: true},
    datahora:  {type: Date, required: true},
    idUsuario: {type: String, required: true}
});

const schemaUsuarios = new mongoose.Schema({
    username:  {type: String, required: true, unique: true},
    email:     {type: String, required: true, unique: true},
    senha:     {type: String, required: true},
    foto:      {type: String, required: true}
});

const todoList = mongoose.model('todoList', schemaTodoList);
const usuarios = mongoose.model('usuarios', schemaUsuarios);


module.exports = {todoList, usuarios};