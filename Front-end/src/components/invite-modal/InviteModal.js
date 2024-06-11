import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import categoriasServices from '../../services/categoriasServices';
import '../../styles/invite-modal.css';

function InviteModal({ categoriaID, onInviteSuccess, onClose }) {

  const [email, setEmail] = useState('');
  const [cookies] = useCookies(["token"]);
  
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      
      const resMessage = await categoriasServices.compartilharCategoria(cookies.token, email, categoriaID);

      toast.info(resMessage);
      onInviteSuccess();
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
            <h1 className="modal-h1">Compartilhar esta categoria</h1>
            <form className="modal-form" onSubmit={handleSubmit}>
              <input
                  type="email"
                  value={email}
                  className="invite-modal-input"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e-mail@email.com"
                  required
              />
              <div className="modal-actions">
                  <button className="modal-botao" type="submit">Compartilhar</button>
              </div>
            </form>
        </div>
    </div>
  );
}

export default InviteModal;
