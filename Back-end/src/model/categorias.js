import mongoose from 'mongoose';

const schemaCategoriasList = new mongoose.Schema({
    name:    {type: String, required: true},
    idProprietario: {type: String, required: true},
    idColaboradores: {type: [String]}
});

const categorias = mongoose.model('categorias', schemaCategoriasList);

export default categorias;