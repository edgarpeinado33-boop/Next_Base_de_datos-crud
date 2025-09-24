import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import UserListPage from "./pages/UserListPage";
import CreateUserPage from "./pages/CreateUserPage";
import EditUserPage from "./pages/EditUserPage";
import UserDeletePage from "./pages/UserDeletePage";
import CargoListPage from "./pages/CargoListPage";
import CreateCargoPage from "./pages/CreateCargoPage";
import EditCargoPage from "./pages/EditCargoPage";
import CargoDeletePage from "./pages/CargoDeletePage";
import CargoUsuarioListPage from "./pages/CargoUsuarioListPage";
import CreateCargoUsuarioPage from "./pages/CreateCargoUsuarioPage";
import EditCargoUsuarioPage from "./pages/EditCargoUsuarioPage";
import CargoUsuarioDeletePage from "./pages/CargoUsuarioDeletePage";
import HorarioListPage from "./pages/HorarioListPage";
import CreateHorarioPage from "./pages/CreateHorarioPage";
import EditHorarioPage from "./pages/EditHorarioPage";
import HorarioDeletePage from "./pages/HorarioDeletePage";
import TickeoListPage from "./pages/TickeoListPage";
import CreateTickeoPage from "./pages/CreateTickeoPage";
import EditTickeoPage from "./pages/EditTickeoPage";
import TickeoDeletePage from "./pages/TickeoDeletePage";

import './App.css'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="users" element={<UserListPage/>}/>
        <Route path="users/create" element={<CreateUserPage/>}/>
        <Route path="users/edit/:id" element={<EditUserPage/>}/>
        <Route path="users/delete/:id" element={<UserDeletePage/>}/>
        <Route path="cargos" element={<CargoListPage/>}/>
        <Route path="cargos/create" element={<CreateCargoPage/>}/>
        <Route path="cargos/edit/:id" element={<EditCargoPage/>}/>
        <Route path="cargos/delete/:id" element={<CargoDeletePage/>}/>
        <Route path="cargos_usuarios" element={<CargoUsuarioListPage/>}/>
        <Route path="cargos_usuarios/create" element={<CreateCargoUsuarioPage/>}/>
        <Route path="cargos_usuarios/edit/:id" element={<EditCargoUsuarioPage/>}/>
        <Route path="cargos_usuarios/delete/:id" element={<CargoUsuarioDeletePage/>}/>
        <Route path="horarios" element={<HorarioListPage/>}/>
        <Route path="horarios/create" element={<CreateHorarioPage/>}/>
        <Route path="horarios/edit/:id" element={<EditHorarioPage/>}/>
        <Route path="horarios/delete/:id" element={<HorarioDeletePage/>}/>
        <Route path="tickeos" element={<TickeoListPage/>}/>
        <Route path="tickeos/create" element={<CreateTickeoPage/>}/>
        <Route path="tickeos/edit/:id" element={<EditTickeoPage/>}/>
        <Route path="tickeos/delete/:id" element={<TickeoDeletePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App