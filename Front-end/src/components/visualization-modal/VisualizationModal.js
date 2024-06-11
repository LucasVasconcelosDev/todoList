import { useState, useEffect } from 'react';
import dateFormatting from '../../utils/dateFormatting';
import '../../styles/visualization-modal.css';

function VisualizationModal({ tarefa, onClose }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [situation, setSituation] = useState('');

    useEffect(() => {

        setTitle(tarefa.title);
        setDescription(tarefa.description);
        setDate(dateFormatting.formatFetchedDate(tarefa.date));
        setSituation(tarefa.situation);
    }, [tarefa]);

    return (
        <div className="modal-overlay">
            <div className="visualization-modal">
                <div className="modal-close">
                    <button className="close-button" type='button' onClick={onClose}>X</button>
                </div>
                <div className="visualization-modal-info">
                    <p className="visualization-modal-title">{title}</p>
                    <textarea
                        value={description}
                        className="visualization-modal-text"
                        disabled
                    />
                    <p className="visualization-modal-text">{date}</p>
                    <p className="visualization-modal-text">{situation}</p>
                </div>
            </div>
        </div>
    );
}

export default VisualizationModal;
