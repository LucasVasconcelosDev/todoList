import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import authServices from '../../services/authServices';
import validations from '../../utils/validations';

import Loading from '../../components/loading/Loading';

import '../../styles/login.css';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (validations.areLoginFieldsEmpty(email, password)) {
      toast.warn('Preencha todos os campos');
      return;
    }

    if (!validations.isValidEmail(email)) {
      toast.warn('Endereço de email inválido');
      return;
    }

    setLoading(true);

    try {

      const token = await authServices.login(email, password);

      setLoading(false);
      setCookie("token", token, { path: '/' });
      navigate("/dashboard");
    } catch (error) {

      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className='login-container'>
      {loading && <Loading />}
      <div className="imagem-lateral"></div>
      <div className="container">
        <div className="welcome">
          <h2>Bem-vindo!</h2>
        </div>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e-mail@email.com"
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className='form-group'>
            <button type="submit" className="login-button">Login</button>
          </div>
        </form>
        <div className='register-link'>
          Não tem uma conta? <a href="/register">Registrar</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
