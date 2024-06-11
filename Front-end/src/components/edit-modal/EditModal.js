import { useState, useEffect } from 'react';
import { useParams }from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import tarefasServices from '../../services/tarefasServices';
import dateFormatting from '../../utils/dateFormatting';
import validations from '../../utils/validations';
import '../../styles/edit-modal.css';

function EditModal({ tarefa, onEditSuccess, onClose }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [situation, setSituation] = useState('');
    const [cookies] = useCookies(["token"]);
    const { categoriaid } = useParams();

    useEffect(() => {

        setTitle(tarefa.title);
        setDescription(tarefa.description);
        setDate(dateFormatting.formatFetchedDate(tarefa.date));
        setSituation(tarefa.situation);
    }, [tarefa]);

    const handleSubmit = async (e) => {

        e.preventDefault();
    
        if (validations.areAddFieldsEmpty(title, description, date)) {
    
          toast.warn('Não deixe campos vazios');
          return;
        }
    
        try {
    
          const tarefaInfo = { title, description, date };
          
          const resMessage = await tarefasServices.atualizarTarefa(cookies.token, categoriaid, tarefa._id, tarefaInfo);
    
          toast.success(resMessage);
          onEditSuccess();
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
                <form className="modal-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="modal-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        className="add-modal-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        className="modal-input"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={dateFormatting.getCurrentDate()}
                        required
                    />
                    <p className="visualization-modal-text">{situation}</p>
                    <button className="modal-botao" type="submit">Editar</button>
                </form>
            </div>
        </div>
    );
}

export default EditModal;
