import validations from '../utils/validations.js';
import todoList from '../model/tarefas.js';
import categorias from '../model/categorias.js';

const pegarTodosNaoConcluidos = async (req, res) => {

    try {

        const categoriaID = req.params.categoriaid;

        const tarefasUsuario = await todoList.find({ situation: { $in: ["Pendente", "Atrasado"] }, idCategoria: categoriaID });

        res.json({ tarefasUsuario });
    } catch (error) {
      
        if (error.response && error.response.status === 401) {
  
          return res.send({ message: "Sessão expirada. Por favor, faça login novamente." });
        }
    
        console.error(error.message);
        return res.status(500).send({ message: "Erro no servidor" });
      }
}

const pegarTodosConcluidos = async (req, res) => {

    try {

        const categoriaID = req.params.categoriaid;

        const tarefasConcluidas = await todoList.find({ situation: "Concluído", idCategoria: categoriaID });

        res.json({ tarefasConcluidas });
    } catch (error) {
      
        if (error.response && error.response.status === 401) {
  
          return res.send({ message: "Sessão expirada. Por favor, faça login novamente." });
        }
    
        console.error(error.message);
        return res.status(500).send({ message: "Erro no servidor" });
      }
}

const tornarConcluido = async (req, res) => {

    try {

        const tarefaID = req.params.tarefaid;
        const categoriaID = req.params.categoriaid;

        const tarefaConcluida = await todoList.findById(tarefaID);
        const categoria = await categorias.findById(categoriaID);

        if (!tarefaConcluida) {

            return res.status(404).json({ message: "Falha ao atualizar a tarefa" });
        }

        if (tarefaConcluida.idCategoria.toString() !== categoria._id.toString()) {
    
            return res.status(403).json({ message: "Falha ao atualizar a tarefa" });
        }

        tarefaConcluida.situation = "Concluído";

        await tarefaConcluida.save();

        res.json({ message: "Concluído com sucesso" });
    } catch (error) {
      
        if (error.response && error.response.status === 401) {
  
          return res.send({ message: "Sessão expirada. Por favor, faça login novamente." });
        }
    
        console.error(error.message);
        return res.status(500).send({ message: "Erro no servidor" });
      }
}

const criarTarefa = async (req, res) => {

    try {

        const categoriaID = req.params.categoriaid;

        const { title, description, date } = req.body;
    
        if (validations.areAddFieldsEmpty(title, description, date)) {
    
          return res.status(400).send({ message: "Preencha todos os campos"});
        }
    
        const novaTarefa = new todoList({
          title,
          description,
          date,
          idCategoria: categoriaID
        });
    
        await novaTarefa.save();
    
        res.json({ message: "Adicionado com sucesso" });
    } catch (error) {
      
        if (error.response && error.response.status === 401) {
  
          return res.send({ message: "Sessão expirada. Por favor, faça login novamente." });
        }
    
        console.error(error.message);
        return res.status(500).send({ message: "Erro no servidor" });
      }
}

const editarTarefa = async (req, res) => {

    try {

        const tarefaID = req.params.tarefaid;
        const categoriaID = req.params.categoriaid;

        const tarefaExistente = await todoList.findById(tarefaID);
        const categoria = await categorias.findById(categoriaID);

        if (!tarefaExistente) {

            return res.status(404).json({ message: "Falha ao atualizar a tarefa" });
        }

        if (tarefaExistente.idCategoria.toString() !== categoria._id.toString()) {
    
            return res.status(403).json({ message: "Falha ao atualizar a tarefa" });
        }

        const { title, description, date } = req.body;

        if (!title && !description && !date) {

            return res.status(400).json({ message: "Atualize pelo menos um campo" });
        }

        if (title) tarefaExistente.title = title;
        if (description) tarefaExistente.description = description;
        if (date) tarefaExistente.date = date;

        await tarefaExistente.save();

        res.json({ message: "Atualizado com sucesso" });
    } catch (error) {
      
        if (error.response && error.response.status === 401) {
  
          return res.send({ message: "Sessão expirada. Por favor, faça login novamente." });
        }
    
        console.error(error.message);
        return res.status(500).send({ message: "Erro no servidor" });
      }
}

const removerTarefa = async (req, res) => {

    try {

        const tarefaID = req.params.tarefaid;
        const categoriaID = req.params.categoriaid;

        const tarefaVitima = await todoList.findById(tarefaID);
        const categoria = await categorias.findById(categoriaID);

        if (!tarefaVitima) {

            return res.status(404).json({ message: "Falha ao deletar a tarefa" });
        }

        if (tarefaVitima.idCategoria.toString() !== categoria._id.toString()) {
    
            return res.status(403).json({ message: "Falha ao deletar a tarefa" });
        }
    
        await todoList.findByIdAndDelete(tarefaID);
    
        res.json({ message: "Deletado com sucesso" });
    } catch (error) {
      
        if (error.response && error.response.status === 401) {
  
          return res.send({ message: "Sessão expirada. Por favor, faça login novamente." });
        }
    
        console.error(error.message);
        return res.status(500).send({ message: "Erro no servidor" });
      }
}

export default { pegarTodosNaoConcluidos, pegarTodosConcluidos, tornarConcluido, criarTarefa, editarTarefa, removerTarefa };