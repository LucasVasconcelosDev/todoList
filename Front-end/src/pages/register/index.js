import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import usuariosServices from '../../services/usuariosServices';
import validations from '../../utils/validations';
import '../../styles/register.css';
import user from '../../assets/user.svg'

import Loading from '../../components/loading/Loading';
import VerificationModal from '../../components/verification-modal/VerificationModal';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleArquivo = (event) => {
    if (event.target.files[0]) {
      setArquivo(event.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validations.areRegisterFieldsEmpty(username, email, password)) {

      return;
    }
  
    if (!validations.isValidEmail(email)) {

      return;
    }

    setLoading(true);

    try {

      const registerData = new FormData();
      registerData.append("username", username);
      registerData.append("email", email);
      registerData.append("password", password);

      if (arquivo) {

        registerData.append("imagem", arquivo);
      }

      const resMessage = await usuariosServices.cadastrarUsuario(registerData);

      if (resMessage === "E-mail enviado!" || resMessage === "Falha ao enviar o e-mail") {

        setLoading(false);
        toast.success(resMessage);
        setIsVerificationModalOpen(true);
      } else {

        setLoading(false);
        toast.error(resMessage);
      }
    } catch (error) {

      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleVerificationSuccess = () => {

    setIsVerificationModalOpen(false);
    setLoading(false);
    navigate('/login');
  }

  return (
      <div className="register-container">
        {loading && <Loading />}
        <main className="container">
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-content">
              <div className="container-img">
                <input
                  type="file"
                  id="arquivo"
                  accept="image/*"
                  onChange={handleArquivo}
                />
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                <label htmlFor="arquivo" className="input-img">Inserir imagem</label>
              </div>
              <div className="form-fields">
                <div className="form-grupo">
                  <label htmlFor="username">Nome</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    maxLength="21"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nome"
                    required
                  />
                </div>
                <div className="form-grupo">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-grupo">
                  <label htmlFor="password">Senha</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    required
                  />
                </div>
                <button type="submit" className='register-button'>Começar</button>
                {isVerificationModalOpen && (
                  <VerificationModal
                  username={username}
                  email={email}
                  onVerificationSuccess={handleVerificationSuccess}
                  onClose={() => setIsVerificationModalOpen(false)}
                  />
                )}
              </div>
              {/* <div className="container-img">
                <input
                  type="file"
                  id="arquivo"
                  accept="image/*"
                  onChange={handleArquivo}
                />
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
                <label htmlFor="arquivo" className="input-img">Inserir imagem</label>
              </div> */}
            </div>
          </form>
        </main>
        <div className="login-link">
          Já tem uma conta? <a href="/login">Login</a>
        </div>
      </div>
  );
}

export default Register;
