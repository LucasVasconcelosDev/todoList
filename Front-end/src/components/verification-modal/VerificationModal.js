import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import usuariosServices from '../../services/usuariosServices';
import '../../styles/verification-modal.css';

function VerificationModal({ username, email, onVerificationSuccess, onClose }) {

  const [verificationCode, setVerificationCode] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    
    const timer = setTimeout(() => {

      setIsResendDisabled(false);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {

    let interval;

    if (isResendDisabled) {

      interval = setInterval(() => {

        setCountdown((previousCountdown) => previousCountdown - 1);
      }, 1000);
    } else {

      setCountdown(60);
    }

    return () => clearInterval(interval);
  }, [isResendDisabled]);
    
  const handleVerification = async (e) => {

    e.preventDefault();

    if (verificationCode === '') {

      return;
    }

    try {
      
        const resMessage = await usuariosServices.verificarUsuario(email, verificationCode);
  
        toast.info(resMessage);
        onVerificationSuccess();
      } catch (error) {
  
        toast.error(error.message);
      }
    };
  
  const handleResendingEmail = async () => {

    setIsResendDisabled(true);

    try {

        const resMessage = await usuariosServices.reenviarEmail(username, email);

        toast.info(resMessage);
    } catch (error) {

        toast.error(error.message);
    }

    setTimeout(() => {
      setIsResendDisabled(false);
    }, 60000);
  }
  
  return (
    <div className="modal-overlay">
        <div className="verification-modal">
          <div className="verification-modal-close">
            <button className="close-button" type='button' onClick={onClose}>X</button>
          </div>
            <h1 className="modal-h1">Digite o código de verificação enviado ao e-mail cadastrado</h1>
            <form className="modal-form">
                <input
                    type="text"
                    value={verificationCode}
                    className="modal-input"
                    onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                    placeholder="XXXXXX"
                    required
                />
                <div className="modal-actions">
                    <button className="modal-botao" onClick={handleVerification}>Enviar</button>
                    <button className="modal-botao" type='button' onClick={handleResendingEmail} disabled={isResendDisabled}>Reenviar E-mail</button>        
                </div>
            </form>
            {isResendDisabled && (
              <div>Reenviar em {countdown} segundos</div>
            )}
        </div>
    </div>
  );
}

export default VerificationModal;