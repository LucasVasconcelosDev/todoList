import { useEffect, useState } from 'react';
import ConfirmationBox from '../../components/confirmation-box/ConfirmationBox';
import dateFormatting from '../../utils/dateFormatting';

import checkmarkSymbol from '../../assets/checkmark.png';
import editSymbol from '../../assets/edit.png';
import deleteSymbol from '../../assets/delete.png';

import '../../styles/tarefa-card.css';

function TarefaCard({ tarefa, isFinalizado, onConclusion, onEdit, onDelete, onVisualize }) {

  const [isConclusionConfirmationBoxOpen, setIsConclusionConfirmationBoxOpen] = useState(false);
  const [isTaskDeletionConfirmationBoxOpen, setIsTaskDeletionConfirmationBoxOpen] = useState(false);
  const [cardFooterClass, setCardFooterClass] = useState('');

  useEffect(() => {

    if (tarefa.situation === "Pendente") {

        setCardFooterClass("footer-pendente");
    } else if (tarefa.situation === "Atrasado") {

        setCardFooterClass("footer-atrasado");
    } else if (tarefa.situation === "Concluído") {

        setCardFooterClass("footer-concluido");
    }
  }, [tarefa]);

  const toggleConclusionConfirmationBox = () => {
      setIsConclusionConfirmationBoxOpen(!isConclusionConfirmationBoxOpen);
  }
    
  const toggleDeletionConfirmationBox = () => {
      setIsTaskDeletionConfirmationBoxOpen(!isTaskDeletionConfirmationBoxOpen);
  }

  const convertDate = (data) => {
    const dataFormatada = dateFormatting.formatDate(data);
    return dataFormatada;
  };

  const cardBorder = cardFooterClass === "footer-concluido" ? "card-finalizado" : "card";
  
  return (
    <div className={cardBorder}>
        <div className="card-header">
            <h2 className="card-title">{tarefa.title}</h2>
            {isFinalizado && (
                <div className="button-group">
                    <button onClick={toggleConclusionConfirmationBox} className="conclude-button">
                        <img src={checkmarkSymbol} />
                    </button>
                    {isConclusionConfirmationBoxOpen && (
                        <ConfirmationBox
                            Text="Deseja concluir a tarefa?"
                            onConfirm={() => { onConclusion(tarefa._id); setIsConclusionConfirmationBoxOpen(false); }}
                            onCancel={() => setIsConclusionConfirmationBoxOpen(false)}
                        />
                    )}
                    <button onClick={onEdit} className="edit-button">
                        <img src={editSymbol} />
                    </button>
                    <button onClick={toggleDeletionConfirmationBox} className="delete-button">
                        <img src={deleteSymbol} />
                    </button>
                    {isTaskDeletionConfirmationBoxOpen && (
                        <ConfirmationBox
                            Text="Deseja excluir a tarefa?"
                            onConfirm={() => { onDelete(tarefa._id); setIsTaskDeletionConfirmationBoxOpen(false); }}
                            onCancel={() => setIsTaskDeletionConfirmationBoxOpen(false)}
                        />
                    )}
                </div>
            )}
        </div>
        <button className="card-body" onClick={onVisualize}>
            <p>{tarefa.description}</p>
            <h3>{convertDate(tarefa.date)}</h3>
        </button>
        <div className={`${cardFooterClass}`}>
            <p>{tarefa.situation}</p>
        </div>
    </div>
  );
}

export default TarefaCard;
