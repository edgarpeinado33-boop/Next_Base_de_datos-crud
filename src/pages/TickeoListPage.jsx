import { useEffect, useState } from "react";
import supabase from '../supabase/supabaseClient';
import TickeoList from "../components/TickeoList";

const TickeoListPage = () => {
  const [tickeos, setTickeos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTickeos();
  }, []);

  const getTickeos = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('tickeos')
      .select(`
        id,
        fecha,
        hora,
        tipo,
        usuario:usuarios(nombre)
      `);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    // Mapeamos para que cada tickeo tenga usuario_nombre
    const tickeosConNombre = data.map(t => ({
      ...t,
      usuario_nombre: t.usuario?.nombre || 'Desconocido'
    }));

    setTickeos(tickeosConNombre);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Desea eliminar este tickeo?")) return;

    const { error } = await supabase.from("tickeos").delete().eq("id", id);
    if (error) {
      console.error(error);
      return;
    }

    setTickeos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="page-container">
      <h1>Lista de Tickeos</h1>
      <TickeoList tickeos={tickeos} onDelete={handleDelete} loading={loading} />
    </div>
  );
};

export default TickeoListPage;
