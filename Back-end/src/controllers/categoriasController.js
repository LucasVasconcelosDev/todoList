import sendInvitationEmail from '../config/inviteMailer.js';
import generateRandomCode from '../utils/codeGenerator.js';
import validations from '../utils/validations.js';
import usuarios from '../model/usuarios.js';
import categorias from '../model/categorias.js';
import convites from '../model/convites.js';
import todoList from '../model/tarefas.js';

const pegarCategorias = async (req, res) => {

    try {

        const usuario = await usuarios.findOne({ email: req.user.email });

        const categoriasUsuario = await categorias.find({
            $or: [{ idProprietario: usuario._id }, { idColaboradores: usuario._id }]
        });
        
        res.json({ categoriasUsuario });
    } catch (error) {
      
        if (error.response && error.response.status === 401) {
  
          return res.send({ message: "Sessão expirada. Por favor, faça login novamente." });
        }
    
        console.error(error.message);
        return res.status(500).send({ message: "Erro no servidor" });
      }
}

const criarCategoria = async (req, res) => {

    try {

        const name = req.body.name;
    
        if (name === '') {
    
          return res.status(400).send({ message: "Escreva um nome antes de criar"});
        }

        const usuario = await usuarios.findOne({ email: req.user.email });

        const categoriaPadronizada = validations.capitalizeCategory(name);
    
        const novaCategoria = new categorias({
          name: categoriaPadronizada,
          idProprietario: usuario._id,
        });
    
        await novaCategoria.save();
    
        res.json({ message: "Criado com sucesso" });
    } catch (error) {
      
        if (error.response && error.response.status === 401) {
  
          return res.send({ message: "Sessão expirada. Por favor, faça login novamente." });
        }
    
        console.error(error.message);
        return res.status(500).send({ message: "Erro no servidor" });
      }
}

const compartilharCategoria = async (req, res) => {

    try {

        const email = req.body.email;
        const idCategoria = req.params.categoriaid;
        const token = generateRandomCode();

        if (!email) return res.status(400).send({ message: "Digite um e-mail antes de fazer o convite" });

        const novoConvite = new convites({
            email,
            idCategoria,
            token,
            expires: Date.now() + 3600000,
        })

        await novoConvite.save();

        const mailMessage = await sendInvitationEmail(email, token);

        res.status(200).send({ message: mailMessage });
    } catch (error) {
      
        if (error.response && error.response.status === 401) {
  
          return res.send({ message: "Sessão expirada. Por favor, faça login novamente." });
        }
    
        console.error(error.message);
        return res.status(500).send({ message: "Erro no servidor" });
      }
}

const aceitarCategoriaCompartilhada = async (req, res) => {

    try {

        const token = req.params.token;

        const convite = await convites.findOne({ token, expires: { $gt: Date.now() } })

        if (!convite) return res.status(400).json({ message: 'Convite não encontrado ou expirado' });

        const categoria = await categorias.findById(convite.idCategoria);
        const usuario = await usuarios.findOne({ email: convite.email });

        categoria.idColaboradores.push(usuario._id);

        await categoria.save();

        await convite.deleteOne({ token });

        res.status(200).json({ message: 'Convite aceito', idCategoria: categoria._id });
    } catch (error) {
      
        if (error.response && error.response.status === 401) {
  
          return res.send({ message: "Sessão expirada. Por favor, faça login novamente." });
        }
    
        console.error(error.message);
        return res.status(500).send({ message: "Erro no servidor" });
      }
}

const removerCategoria = async (req, res) => {

    try {

        const id = req.params.categoriaid;

        await todoList.deleteMany({ idCategoria: id });
    
        await categorias.findByIdAndDelete(id);
    
        res.json({ message: "Deletado com sucesso" });
    } catch (error) {
      
        if (error.response && error.response.status === 401) {
  
          return res.send({ message: "Sessão expirada. Por favor, faça login novamente." });
        }
    
        console.error(error.message);
        return res.status(500).send({ message: "Erro no servidor" });
      }
}

export default { pegarCategorias, criarCategoria, compartilharCategoria, aceitarCategoriaCompartilhada, removerCategoria };