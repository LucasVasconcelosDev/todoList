import '../../styles/confirmation-box.css';

function ConfirmationBox({ Text, onConfirm, onCancel }) {

  return (
    <div className="modal-overlay">
        <div className="modal">
          <h1>{Text}</h1>
          <div className="confirm-modal-botoes">
            <button className="confirm-modal-botao" onClick={onConfirm}>Confirmar</button>
            <br />
            <button className="confirm-modal-botao" onClick={onCancel}>Cancelar</button>
          </div>
        </div>
    </div>
  );
}

export default ConfirmationBox;
