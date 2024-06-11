import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "../pages/register/index";
import Login from "../pages/login/index";
import Dashboard from "../pages/dashboard";
import DashboardTarefas from "../pages/dashboard-tarefas";
import AcceptInvitation from "../pages/invitation-acception";
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";

function Rotas() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/dashboard/:categoriaid" Component={DashboardTarefas} />
        <Route path="/convite/:token" Component={AcceptInvitation} />
        <Route path="/about" Component={About} />
        <Route path="/contact" Component={Contact} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;