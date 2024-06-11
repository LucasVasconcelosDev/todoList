import mongoose from 'mongoose';

const schemaUsuarios = new mongoose.Schema({
  username:  {type: String, required: true, unique: true},
  email:     {type: String, required: true, unique: true},
  password:     {type: String, required: true},
  photo:      {type: String, required: true},
  verificationCode: {type: String},
  isVerified: {type: Boolean, default: false}
});

const usuarios = mongoose.model('usuarios', schemaUsuarios);

export default usuarios;