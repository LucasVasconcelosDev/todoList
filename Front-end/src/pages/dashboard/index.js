import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import authServices from '../../services/authServices';
import categoriasServices from '../../services/categoriasServices';
import usuariosServices from '../../services/usuariosServices.js';

import Loading from '../../components/loading/Loading.js';
import NewCategoriaModal from '../../components/new-categoria-modal/NewCategoriaModal';

import homeSign from '../../assets/home-sign.png';
import plusSign from '../../assets/plus-sign.png';
import logout from '../../assets/logout.png';
import leftArrow from '../../assets/left-arrow.png';
import rightArrow from '../../assets/right-arrow.png';
import upArrow from '../../assets/up-arrow.png';
import downArrow from '../../assets/down-arrow.png';

import '../../styles/dashboard.css';

function Dashboard() {
  const [categorias, setCategorias] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [isNewCategoriaModalOpen, setIsNewCategoriaModalOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();


  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    } else {
      const fetchCategorias = async () => {

        setLoading(true);

        try {

          const categoriasUsuario = await categoriasServices.pegarCategorias(cookies.token);
          setCategorias(categoriasUsuario.reverse());
          
          const usuario = await usuariosServices.pegarUsuarioFotoNome(cookies.token);
          setUsuario(usuario);

          setLoading(false);
        } catch (error) {

          setLoading(false);
          toast.error(error.message);
        }
      };

      fetchCategorias();
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cookies.token, navigate]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleNewCategoriaModal = () => {
    setIsNewCategoriaModalOpen(!isNewCategoriaModalOpen);
  };

  const handleAddSuccess = async () => {

    setLoading(true);

    try {
      const categoriasUsuario = await categoriasServices.pegarCategorias(cookies.token);
      setCategorias(categoriasUsuario.reverse());

      setLoading(false);
      setIsNewCategoriaModalOpen(false);
    } catch (error) {

      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {

    setLoading(true);

    try {
      await authServices.logout();
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

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
            <button className="sidebar-button" onClick={toggleNewCategoriaModal}>
              <img src={plusSign} alt="Novo" />
              Novo
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
        {isNewCategoriaModalOpen && (
          <NewCategoriaModal
            onAddSuccess={handleAddSuccess}
            onClose={() => setIsNewCategoriaModalOpen(false)}
          />
        )}
        <h2>Categorias</h2>
        <div className="categorias-grid">
          {categorias && categorias.map((categoria, indice) => (
            <Link key={indice} to={`/dashboard/${categoria._id}`}>
              <button className="categoria-button">{categoria.name}</button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
