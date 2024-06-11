import storageBlob from '@azure/storage-blob';
import bcrypt from 'bcryptjs';
import generateRandomCode from '../utils/codeGenerator.js';
import sendVerificationEmail from '../config/verificationMailer.js';
import validations from '../utils/validations.js';
import usuarios from '../model/usuarios.js';

const criarUsuario = async (req, res) => {

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

  const connectionString = process.env.BLOB_CONNECTION;
  const containerName = process.env.CONTAINER_NAME;
  const blobServiceClient = storageBlob.BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  try {

    const { username, email, password } = req.body;

    const usuarioNaoVerificado = await usuarios.findOne({
      $or: [{ username }, { email }]
    });

    if (usuarioNaoVerificado && !usuarioNaoVerificado.isVerified) {

      await usuarios.findByIdAndDelete(usuarioNaoVerificado._id);
    }

    if (validations.areRegisterFieldsEmpty(username, email, password)) {

      return res.status(400).send({ message: "Preencha todos os campos"});
    }

    const usernameExists = await validations.doesUsernameExists(username);
    if (usernameExists) {

      return res.status(400).send({ message: "Este nome de usuário já existe"});
    }

    const emailExists = await validations.doesEmailExists(email);
    if (emailExists) {

      return res.status(400).send({ message: "Este e-mail já está cadastrado"});
    }

    if (!validations.isValidEmail(email)) {

      return res.status(400).send({ message: "Endereço de e-mail inválido"});
    }

    let imageUrl = process.env.DEFAULT_PHOTO;

    if (req.file) {

      const blobName = `${Date.now()} + ${req.file.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const data = req.file.buffer;
      await blockBlobClient.upload(data, data.length);
      imageUrl = blockBlobClient.url;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const verificationCode = generateRandomCode();

    const usuario = new usuarios({
      username,
      email,
      password: hashedPassword,
      photo: imageUrl,
      verificationCode,
    });
    await usuario.save();

    const mailMessage = await sendVerificationEmail(username, email, verificationCode);

    res.status(200).send({ message: mailMessage });
  } catch (error) {

    console.error(error.message);
    return res.status(500).send({ message: "Erro no servidor" });
  }
}

const pegarUsuarioFotoNome = async (req, res) => {

  try {

      const usuario = await usuarios.findOne({ email: req.user.email });
  
      res.json({ usuario: usuario });
    } catch (error) {
      
      if (error.response && error.response.status === 401) {

        return res.send({ message: "Sessão expirada. Por favor, faça login novamente." });
      }
  
      console.error(error.message);
      return res.status(500).send({ message: "Erro no servidor" });
    }
}

const reenviarEmail = async (req, res) => {

  try {

    const { email, username } = req.body;

    const usuario = await usuarios.findOne({
      $or: [{ username }, { email }]
    });

    if (!usuario) {

      return res.status(404).json({ message: "Falha ao encontrar o usuário" });
    }

    const verificationCode = generateRandomCode();

    usuario.verificationCode = verificationCode;

    await usuario.save();

    const mailMessage = await sendVerificationEmail(username, email, verificationCode);

    res.json({ message: mailMessage })
  } catch (error) {

    console.error(error.message);
    return res.status(500).send({ message: "Erro no servidor" });
  }
}

const verificarUsuario = async (req, res) => {

  try {

    const { email, verificationCode } = req.body;

    const usuario = await usuarios.findOne({ email: email });

    if (!usuario) {

      return res.status(400).send({ message: 'Usuário não encontrado' });
    }

    if (usuario.verificationCode === verificationCode) {

      usuario.isVerified = true;
      usuario.verificationCode = "";
      
      await usuario.save();

      return res.status(200).send({ message: 'Usuário criado com sucesso' });
    } else if (usuario.verificationCode === "") {
    
      return res.status(401).send({ message: 'Código expirado. Reenvie o e-mail para receber um novo código' })
    } else {

      return res.status(400).send({ message: 'Código de verificação inválido' });
    }
  } catch (error) {

    console.error(error.message);
    return res.status(500).send({ message: "Erro no servidor" });
  }
}

export default { criarUsuario, pegarUsuarioFotoNome, reenviarEmail, verificarUsuario};