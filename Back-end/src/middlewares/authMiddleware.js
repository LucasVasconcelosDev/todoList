import jwt from 'jsonwebtoken';
import usuarios from '../model/usuarios.js';

const verifyAuthentication = async (req, res, next) => {

    const JWT_SECRET = process.env.JWT_SECRET;

    try {

        const token = req.headers["authorization"];

        if (!token) {

            return res.status(401).json({ message: "Não autorizado" });
        }

        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

        req.user = decoded;

        const usuario = await usuarios.findOne({ email: decoded.email });

        if (!usuario || !usuario.isVerified) {
            
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        next();
    } catch (error) {
        
        console.error(error.message);  
        return res.status(401).send({ message: "Sessão expirada. Por favor, faça login novamente." });
    }
}

export default verifyAuthentication;