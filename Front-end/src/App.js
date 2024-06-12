import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/toastCustomStyle.css';
import Rotas from './routes/index';

function App() {
  return (
    <div>
      <Rotas />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastClassName="custom-toast-container"
      />
    </div>
  );
}

export default App;
