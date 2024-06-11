import express from "express";
import verifyAuthentication from '../middlewares/authMiddleware.js';
import tarefasController from "../controllers/tarefasController.js";

const router = express.Router();

router.use(verifyAuthentication);

router.get('/:categoriaid', tarefasController.pegarTodosNaoConcluidos); // ✓

router.get('/:categoriaid/concluidos', tarefasController.pegarTodosConcluidos); // ✓

router.put('/:categoriaid/concluir/:tarefaid', tarefasController.tornarConcluido); // ✓

router.post('/:categoriaid/criar', tarefasController.criarTarefa); // ✓

router.put('/:categoriaid/editar/:tarefaid', tarefasController.editarTarefa); // ✓

router.delete('/:categoriaid/deletar/:tarefaid', tarefasController.removerTarefa); // ✓

export default router;