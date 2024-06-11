import mongoose from 'mongoose';

const schemaConvites = new mongoose.Schema({
    email:    {type: String, required: true},
    idCategoria: {type: String, required: true},
    token: {type: String, required: true},
    expires: {type: Date, required: true}
});

const convites = mongoose.model('convites', schemaConvites);

export default convites;