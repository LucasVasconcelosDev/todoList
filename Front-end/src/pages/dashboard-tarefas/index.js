import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import authServices from '../../services/authServices';
import categoriasServices from '../../services/categoriasServices';
import tarefasServices from '../../services/tarefasServices';
import usuariosServices from '../../services/usuariosServices.js';

import Loading from '../../components/loading/Loading.js';
import ConfirmationBox from '../../components/confirmation-box/ConfirmationBox';
import AddModal from '../../components/add-modal/AddModal';
import TarefaCard from '../../components/tarefas-card/TarefasCard.js';
import EditModal from '../../components/edit-modal/EditModal';
import VisualizationModal from '../../components/visualization-modal/VisualizationModal.js';
import InviteModal from '../../components/invite-modal/InviteModal';

import homeSign from '../../assets/home-sign.png';
import plusSign from '../../assets/plus-sign.png';
import finishedSign from '../../assets/finished-sign.png';
import deleteSign from '../../assets/delete-sign.png';
import shareSign from '../../assets/share-sign.png';
import logout from '../../assets/logout.png';
import leftArrow from '../../assets/left-arrow.png';
import rightArrow from '../../assets/right-arrow.png';
import upArrow from '../../assets/up-arrow.png';
import downArrow from '../../assets/down-arrow.png';

import '../../styles/dashboard-tarefas.css';

function DashboardTarefas() {

  const [tarefas, setTarefas] = useState([]);
  const [usuario, setUsuario] =useState(null);
  const [isCategoryDeletionConfirmationBoxOpen, setIsCategoryDeletionConfirmationBoxOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVisualizationModalOpen, setIsVisualizationModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedTarefa, setSelectedTarefa] = useState(null);
  const [isVisualizarButtonVisible, setIsVisualizarButtonVisible] = useState(true);
  const [isTarefasConcluidasVisible, setIsTarefasConcluidasVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["token"]);
  const { categoriaid } = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {

    if (!cookies.token) {

      navigate("/login");
    } else {

      const fetchTarefas = async () => {

        setLoading(true);

        try {

          const tarefasUsuario = await tarefasServices.pegarTarefas(cookies.token, categoriaid);
          setTarefas(tarefasUsuario.reverse());

          const usuario = await usuariosServices.pegarUsuarioFotoNome(cookies.token);
          setUsuario(usuario);

          setLoading(false);
        } catch (error) {
            
          toast.error(error.message);
        }
      };
      
      fetchTarefas();
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleConfirmationBox = () => {
    
    setIsCategoryDeletionConfirmationBoxOpen(!isCategoryDeletionConfirmationBoxOpen);
  }
  
  const toggleAddModal = () => {
    
    setIsAddModalOpen(!isAddModalOpen);
  }
 
  const toggleEditModal = (tarefa) => {
    
    setSelectedTarefa(tarefa);
    setIsEditModalOpen(!isEditModalOpen);
  }

  const toggleVisualizationModal = (tarefa) => {
    
    setSelectedTarefa(tarefa);
    setIsVisualizationModalOpen(!isVisualizationModalOpen);
  }

  const toggleInviteModal = () => {
    
    setIsInviteModalOpen(!isInviteModalOpen);
  }

  const handleAddSuccess = async () => {

    setLoading(true);

    try {

      const tarefasUsuario = await tarefasServices.pegarTarefas(cookies.token, categoriaid);

      setTarefas(tarefasUsuario.reverse());

      setLoading(false);
      setIsTarefasConcluidasVisible(false);
      setIsAddModalOpen(false);
    } catch (error) {

      setLoading(false);
      setIsTarefasConcluidasVisible(false);
      setIsAddModalOpen(false);
      toast.error(error.message);
    }
  };

  const handleEditSuccess = async () => {

    setLoading(true);

    try {

        const tarefasUsuario = await tarefasServices.pegarTarefas(cookies.token, categoriaid);

        setTarefas(tarefasUsuario.reverse());

        setLoading(false);
        setIsTarefasConcluidasVisible(false);
        setIsEditModalOpen(false);
    } catch (error) {

        toast.error(error.message);
        setLoading(false);
        setIsTarefasConcluidasVisible(false);
        setIsEditModalOpen(false);
    }
  };
  
  const handleConclusion = async (tarefaID) => {

    setLoading(true);

    try {

        const resMessage = await tarefasServices.concluirTarefa(cookies.token, categoriaid, tarefaID);

        setTarefas(tarefas.filter(tarefa => tarefa._id !== tarefaID));

        toast.success(resMessage);
        setLoading(false);
        setIsTarefasConcluidasVisible(false);
        setIsCategoryDeletionConfirmationBoxOpen(false);
        setIsEditModalOpen(false);
        setIsVisualizationModalOpen(false);
    } catch (error) {

        toast.error(error.message);
        setLoading(false);
        setIsTarefasConcluidasVisible(false);
        setIsCategoryDeletionConfirmationBoxOpen(false);
        setIsEditModalOpen(false);
        setIsVisualizationModalOpen(false);
    }
  }

  const handleDeletion = async (tarefaID) => {

    setLoading(true);

    try {

        const resMessage = await tarefasServices.deletarTarefa(cookies.token, categoriaid, tarefaID);

        setTarefas(tarefas.filter(tarefa => tarefa._id !== tarefaID));

        setLoading(false);
        toast.success(resMessage);
        setIsTarefasConcluidasVisible(false);
        setIsCategoryDeletionConfirmationBoxOpen(false);
        setIsEditModalOpen(false);
        setIsVisualizationModalOpen(false);
    } catch (error) {

        toast.error(error.message);
        setLoading(false);
        setIsTarefasConcluidasVisible(false);
        setIsCategoryDeletionConfirmationBoxOpen(false);
        setIsEditModalOpen(false);
        setIsVisualizationModalOpen(false);
    }
  }

  const handleConcluidoClick = async () => {

    setIsTarefasConcluidasVisible(previousValue => {

      const newValue = !previousValue;

      const fetchData = async () => {

        setLoading(true);

        try {

          if (newValue) {
  
            const tarefasConcluidas = await tarefasServices.pegarTarefasConcluidas(cookies.token, categoriaid);
  
            setLoading(false);
            setIsVisualizarButtonVisible(false);
            setTarefas(tarefasConcluidas);
          } else {
  
            const tarefasUsuario = await tarefasServices.pegarTarefas(cookies.token, categoriaid);
  
            setTarefas(tarefasUsuario.reverse());

            setLoading(false);
            setIsVisualizarButtonVisible(true);
          }
        } catch (error) {
            
          if (newValue) {

            toast.error(error.message);
            setLoading(false);
            setIsVisualizarButtonVisible(false);
          } else {

            toast.error(error.message);
            setLoading(false);
            setIsVisualizarButtonVisible(true);
          }
        }
      };

      fetchData();
      return newValue;
    });
  };
  
  const handleCategoriaDeletion = async () => {

    setLoading(true);

    try {

      const resMessage = await categoriasServices.deletarTarefa(cookies.token, categoriaid);

      setIsVisualizarButtonVisible(true);
      setLoading(false);
      setIsTarefasConcluidasVisible(false);
      setIsCategoryDeletionConfirmationBoxOpen(false);
      toast.success(resMessage);
      navigate("/dashboard")
    } catch (error) {
        
      toast.error(error.message);
      setIsVisualizarButtonVisible(true);
      setLoading(false);
      setIsTarefasConcluidasVisible(false);
      setIsCategoryDeletionConfirmationBoxOpen(false);
    }
  };

  const handleLogout = async () => {

    try {

      await authServices.logout();
      
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      setIsVisualizarButtonVisible(true);
      setIsTarefasConcluidasVisible(false);
      navigate("/login");
    } catch (error) {

      toast.error(error.message);
      setIsVisualizarButtonVisible(true);
      setIsTarefasConcluidasVisible(false);
    }
  };

  const textoConcluidos = isTarefasConcluidasVisible ? "Pendentes" : "Finalizados";

  return (
    <div className="dashboard-container">
      {loading && <Loading />}
      <div className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
        <div className="toggle-sidebar" onClick={toggleSidebar}>
        <img 
            src={isSidebarVisible ? (isMobile ? downArrow : leftArrow) : (isMobile ? upArrow : rightArrow)} 
            className="arrow-icon" 
            alt="Toggle Sidebar" 
          />
        </div>
        {isSidebarVisible && usuario && (
          <>
            <div className='user-info'>
              {usuario.photo && <img src={usuario.photo} className="profile-icon" alt="Profile" />}
              <p>Bem-vindo,<br />{usuario.username}!</p>
            </div>
            <Link to='/dashboard' style={{ textDecoration: 'none' }}>
              <button className="sidebar-button">
                <img src={homeSign} alt="Home" />
                Home
              </button>
            </Link>
            <button className="sidebar-button" onClick={() => toggleAddModal()}>
            <img src={plusSign} alt="Adicionar" />
              Adicionar
            </button>
            <button className="sidebar-button" onClick={() => handleConcluidoClick()}>
              <img src={finishedSign} alt="Finalizados" />
              {textoConcluidos}
            </button>
            <button className="sidebar-button" onClick={() => toggleConfirmationBox()}>
              <img src={deleteSign} alt="Excluir categoria" />
              Excluir
            </button>
            <button className="sidebar-button" onClick={() => toggleInviteModal()}>
            <img src={shareSign} alt="Compartilhar" />
              Compartilhar
            </button>
            <div className="logout-container">
              <button className="logout-button" onClick={handleLogout}>
                <img src={logout} alt="Logout" />
                Logout
              </button>
            </div>
          </>
        )}
      </div>
      <div className={`main-content ${isSidebarVisible ? '' : 'expanded'}`}>
        <h1>Dashboard</h1>
        {isAddModalOpen && (
          <AddModal
            onAddSuccess={handleAddSuccess}
            onClose={() => setIsAddModalOpen(false)}
          />
        )}
        {isCategoryDeletionConfirmationBoxOpen && (
          <ConfirmationBox
            Text="Deseja excluir a categoria?"
            onConfirm={handleCategoriaDeletion}
            onCancel={() => setIsCategoryDeletionConfirmationBoxOpen(false)}
          />
        )}
        {isInviteModalOpen && (
          <InviteModal
            categoriaID={categoriaid}
            onInviteSuccess={() => setIsInviteModalOpen(false)}
            onClose={() => setIsInviteModalOpen(false)}
          />
        )}
        <h2>Tarefas</h2>
        <ul className='tarefas-grid'>
          {tarefas && tarefas.map((tarefa, indice) => (
            <li key={indice}>
              <TarefaCard
                tarefa={tarefa}
                isFinalizado={isVisualizarButtonVisible}
                onConclusion={() => handleConclusion(tarefa._id)}
                onEdit={() => toggleEditModal(tarefa)}
                onDelete={() => handleDeletion(tarefa._id)}
                onVisualize={() => toggleVisualizationModal(tarefa)}
              />
              {isEditModalOpen && selectedTarefa && selectedTarefa._id === tarefa._id && (
                <EditModal
                  tarefa={tarefa}
                  onEditSuccess={handleEditSuccess}
                  onClose={() => setIsEditModalOpen(false)}
                />
              )}
              {isVisualizationModalOpen && selectedTarefa && selectedTarefa._id === tarefa._id && (
                <VisualizationModal
                  tarefa={tarefa}
                  onClose={() => setIsVisualizationModalOpen(false)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardTarefas;
