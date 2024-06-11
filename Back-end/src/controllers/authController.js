import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validations from '../utils/validations.js';
import usuarios from '../model/usuarios.js';

const logar = async (req, res) => {

  const JWT_SECRET = process.env.JWT_SECRET;

  const expirarCookie = 3600 * 1000;

  try {
  
      const { email, password } = req.body;
  
      if (validations.areLoginFieldsEmpty(email, password)) {
  
        return res.status(400).send({ message: "Preencha todos os campos"});  
      }
  
      if (!validations.isValidEmail(email)) {
  
        return res.status(400).send({ message: "Endereço de e-mail inválido"});
      }
  
      const usuario = await usuarios.findOne({ email });
  
      if (!usuario || !usuario.isVerified) {
  
        return res.status(400).send({ message: "Usuário não encontrado" });
      }
  
      const passwordMatch = await bcrypt.compare(password, usuario.password);
  
      if (!passwordMatch) {
  
        return res.status(401).send({ message: "Credenciais inválidas" });
      }
  
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  
      res.cookie("token", token, { httpOnly: true, maxAge: expirarCookie });
  
      res.json({ token });
    } catch (error) {
  
      console.error(error.message);
      return res.status(500).send({ message: "Erro no servidor" });
  }
}

const deslogar = (req, res) => {

    res.clearCookie("token");
    res.json({ message: "Deslogado com sucesso" });
}

export default { logar, deslogar };