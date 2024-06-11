import express from "express";
import verifyAuthentication from '../middlewares/authMiddleware.js';
import categoriasController from "../controllers//categoriasController.js";

const router = express.Router();

router.get('/categorias/convite/:token', categoriasController.aceitarCategoriaCompartilhada); // ✓

router.use(verifyAuthentication);

router.get('/categorias', categoriasController.pegarCategorias); // ✓

router.post('/categorias/criar', categoriasController.criarCategoria); // ✓

router.post('/categorias/convite/:categoriaid', categoriasController.compartilharCategoria); // ✓

router.delete('/categorias/deletar/:categoriaid', categoriasController.removerCategoria); // ✓

export default router;