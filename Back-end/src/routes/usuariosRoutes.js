import express from "express";
import multer from "multer";
import usuariosController from "../controllers/usuariosController.js";
import verifyAuthentication from "../middlewares/authMiddleware.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/register', upload.single("imagem"), usuariosController.criarUsuario); // ✓
router.get('/usuario', verifyAuthentication, usuariosController.pegarUsuarioFotoNome); // ✓
router.put('/resend', usuariosController.reenviarEmail); // ✓
router.put('/verify', usuariosController.verificarUsuario); // ✓

export default router;