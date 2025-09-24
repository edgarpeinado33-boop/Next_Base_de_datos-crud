import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const TickeoDeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tickeo, setTickeo] = useState(null);

  useEffect(() => {
    getTickeo();
  }, []);

  const getTickeo = async () => {
    const { data, error } = await supabase
      .from("tickeos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
    setTickeo(data);
  };

  const deleteTickeo = async () => {
    const { data, error } = await supabase
      .from("tickeos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  };

  const handleDelete = () => {
    if (window.confirm("¿Desea eliminar este tickeo?")) {
      deleteTickeo().then(() => navigate('/tickeos'));
    }
  };

  return (
    <div>
      <h2>Borrar Tickeo</h2>
      {tickeo ? (
        <div>
          <p>¿Está seguro que desea eliminar el tickeo del usuario <strong>{tickeo.id_usuario}</strong> del día <strong>{tickeo.fecha}</strong> a las <strong>{tickeo.hora}</strong> ({tickeo.tipo})?</p>
          <button onClick={handleDelete} className="btn btn-danger">Sí, Eliminar</button>
        </div>
      ) : (
        <p>Loading tickeo data...</p>
      )}
    </div>
  );
};

export default TickeoDeletePage;
