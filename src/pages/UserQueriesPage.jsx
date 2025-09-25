import { useEffect, useState } from "react";
import supabase from "../supabase/supabaseClient";
import UserQueriesList from "../components/UserQueriesList";

const UserQueriesPage = () => {
  const [gerentes, setGerentes] = useState([]);
  const [mayor5000, setMayor5000] = useState([]);
  const [entre3000y6000, setEntre3000y6000] = useState([]);
  const [llegaronTarde, setLlegaronTarde] = useState([]);
  const [seFueronTemprano, setSeFueronTemprano] = useState([]);

  useEffect(() => {
    getUsuariosGerentes();
    getUsuariosMayor5000();
    getUsuariosEntre3000y6000();
    getUsuariosLlegaronTarde();
    getUsuariosSeFueronTemprano();
  }, []);

  // ---------------------------
  // Funciones para consultar usuarios
  // ---------------------------
  const getUsuariosGerentes = async () => {
    try {
      const { data: cargos } = await supabase.from("cargos").select("id").eq("cargo", "Gerente");
      const cargoIds = cargos?.map(c => c.id) || [];
      if (!cargoIds.length) return setGerentes([]);

      const { data: cargosUsuarios } = await supabase.from("cargos_usuarios").select("id_usuario").in("id_cargo", cargoIds);
      const usuarioIds = cargosUsuarios?.map(cu => cu.id_usuario) || [];
      if (!usuarioIds.length) return setGerentes([]);

      const { data: usuariosData } = await supabase
        .from("usuarios")
        .select("id,nombre,email,username,password,edad")
        .in("id", usuarioIds);
      setGerentes(usuariosData || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getUsuariosMayor5000 = async () => {
    try {
      const { data: cargos } = await supabase.from("cargos").select("id").gt("sueldo", 5000);
      const cargoIds = cargos?.map(c => c.id) || [];
      if (!cargoIds.length) return setMayor5000([]);

      const { data: cargosUsuarios } = await supabase.from("cargos_usuarios").select("id_usuario").in("id_cargo", cargoIds);
      const usuarioIds = cargosUsuarios?.map(cu => cu.id_usuario) || [];
      if (!usuarioIds.length) return setMayor5000([]);

      const { data: usuariosData } = await supabase
        .from("usuarios")
        .select("id,nombre,email,username,password,edad")
        .in("id", usuarioIds);
      setMayor5000(usuariosData || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getUsuariosEntre3000y6000 = async () => {
    try {
      const { data: cargos } = await supabase.from("cargos").select("id").gte("sueldo", 3000).lte("sueldo", 6000);
      const cargoIds = cargos?.map(c => c.id) || [];
      if (!cargoIds.length) return setEntre3000y6000([]);

      const { data: cargosUsuarios } = await supabase.from("cargos_usuarios").select("id_usuario").in("id_cargo", cargoIds);
      const usuarioIds = cargosUsuarios?.map(cu => cu.id_usuario) || [];
      if (!usuarioIds.length) return setEntre3000y6000([]);

      const { data: usuariosData } = await supabase
        .from("usuarios")
        .select("id,nombre,email,username,password,edad")
        .in("id", usuarioIds);
      setEntre3000y6000(usuariosData || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getUsuariosLlegaronTarde = async () => {
    try {
      const { data: tickeos } = await supabase.from("tickeos").select("id_usuario").eq("tipo", "entrada").gt("hora", "08:00:00");
      const usuarioIds = tickeos?.map(t => t.id_usuario) || [];
      if (!usuarioIds.length) return setLlegaronTarde([]);

      const { data: usuariosData } = await supabase
        .from("usuarios")
        .select("id,nombre,email,username,password,edad")
        .in("id", usuarioIds);
      setLlegaronTarde(usuariosData || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getUsuariosSeFueronTemprano = async () => {
    try {
      const { data: tickeos } = await supabase.from("tickeos").select("id_usuario").eq("tipo", "salida").lt("hora", "17:30:00");
      const usuarioIds = tickeos?.map(t => t.id_usuario) || [];
      if (!usuarioIds.length) return setSeFueronTemprano([]);

      const { data: usuariosData } = await supabase
        .from("usuarios")
        .select("id,nombre,email,username,password,edad")
        .in("id", usuarioIds);
      setSeFueronTemprano(usuariosData || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <h1>Consultas de Usuarios</h1>

      <h2>Gerentes</h2>
      <UserQueriesList usuarios={gerentes} />

      <h2>Usuarios que ganan más de 5000</h2>
      <UserQueriesList usuarios={mayor5000} />

      <h2>Usuarios que ganan entre 3000 y 6000</h2>
      <UserQueriesList usuarios={entre3000y6000} />

      <h2>Usuarios que llegaron tarde</h2>
      <UserQueriesList usuarios={llegaronTarde} />

      <h2>Usuarios que se fueron temprano</h2>
      <UserQueriesList usuarios={seFueronTemprano} />
    </div>
  );
};

export default UserQueriesPage;
