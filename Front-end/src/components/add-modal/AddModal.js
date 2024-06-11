import { useState } from 'react';
import { useParams }from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import tarefasServices from '../../services/tarefasServices';
import dateFormatting from '../../utils/dateFormatting';
import validations from '../../utils/validations';
import '../../styles/add-modal.css';

function AddModal({ onAddSuccess, onClose }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [cookies] = useCookies(["token"]);
  const { categoriaid } = useParams();
  
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (validations.areAddFieldsEmpty(title, description, date)) {

      toast.warn('Preencha todos os campos');
      return;
    }

    try {

      const tarefaInfo = { title, description, date };
      
      const resMessage = await tarefasServices.criarTarefa(cookies.token, categoriaid, tarefaInfo);

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
            <h1 className="modal-h1">Adicionar uma nova tarefa</h1>
            <form className="modal-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="modal-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título"
                  required
                />
                <textarea
                  className="add-modal-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrição"
                  required
                />
                <input
                  type="date"
                  value={date}
                  className="modal-input"
                  onChange={(e) => setDate(e.target.value)}
                  min={dateFormatting.getCurrentDate()}
                  placeholder="dd/mm/aaaa"
                  required
                />
                <button type="submit" className="modal-botao">Adicionar</button>
            </form>
        </div>
    </div>
  );
}

export default AddModal;
