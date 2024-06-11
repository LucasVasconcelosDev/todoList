import mongoose from 'mongoose';

const schemaTodoList = new mongoose.Schema({
    title:    {type: String, required: true},
    description: {type: String, required: true},
    date:  {type: Date, required: true},
    situation: { type: String, enum: ['Pendente', 'Atrasado', 'Concluído'], default: 'Pendente', required: true },
    idCategoria: {type: String, required: true}
});

const todoList = mongoose.model('todoList', schemaTodoList);

export default todoList;