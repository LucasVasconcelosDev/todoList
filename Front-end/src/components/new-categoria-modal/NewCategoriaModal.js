import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import categoriasServices from '../../services/categoriasServices';
import '../../styles/new-categoria-modal.css';

function NewCategoriaModal({ onAddSuccess, onClose }) {

  const [name, setName] = useState('');
  const [cookies] = useCookies(["token"]);
  
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (name === '') {

      toast.warn('Escreva um nome antes de criar');
      return;
    }

    try {
      
      const resMessage = await categoriasServices.criarCategoria(cookies.token, name);

      toast.success(resMessage);
      onAddSuccess();
    } catch (error) {

      toast.error(error.message);
    }
  };


  return (
    <div className="modal-overlay">
        <div className="modal">
          <div className="modal-close">
              <button className="close-button" type='button' onClick={onClose}>X</button>
          </div>
            <h1 className="modal-h1">Adicionar uma nova categoria</h1>
            <form className="modal-form" onSubmit={handleSubmit}>
              <input
                  type="text"
                  value={name}
                  className="modal-input"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome"
                  required
              />
              <div className="modal-actions">
                  <button className="modal-botao" type="submit">Criar</button>
              </div>
            </form>
        </div>
    </div>
  );
}

export default NewCategoriaModal;
