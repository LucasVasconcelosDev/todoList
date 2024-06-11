import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import categoriasServices from '../../services/categoriasServices';

const AcceptInvitation = () => {

  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {

    const acceptInvitation = async () => {

      try {

        const conviteAceito = await categoriasServices.aceitarCategoriaCompartilhada(token);

        if (conviteAceito.message === 'Convite aceito') {

          setMessage('Convite aceito! Redirecionando a categoria...');
          setTimeout(() => {
            navigate(`/dashboard/${conviteAceito.idCategoria}`);
          }, 2000);
        } else {

          setMessage('Convite inválido ou expirado.');
        }
      } catch (error) {

        setMessage(error.message);
      }
    };

    acceptInvitation();
  }, [token, navigate]);

  return <div>{message}</div>;
};

export default AcceptInvitation;