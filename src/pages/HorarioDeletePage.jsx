import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const HorarioDeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [horario, setHorario] = useState(null);

  useEffect(() => {
    getHorario();
  }, []);

  const getHorario = async () => {
    const { data, error } = await supabase
      .from("horarios")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
    setHorario(data);
  };

  const deleteHorario = async () => {
    const { data, error } = await supabase
      .from("horarios")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return null;
    }
    return data;
  };

  const handleDelete = () => {
    if (!window.confirm(`¿Está seguro de eliminar el horario ${horario.hora_ingreso} - ${horario.hora_salida}?`)) return;
    console.log('Deleting horario with id:', id);
    deleteHorario().then(() => {
      navigate('/horarios');
    });
  };

  return (
    <div>
      <h2>Borrar Horario</h2>
      {horario ? (
        <div>
          <p>¿Está seguro que desea eliminar el horario: <strong>{horario.hora_ingreso} - {horario.hora_salida}</strong>?</p>
          <button onClick={handleDelete}>Sí, eliminar</button>
          <button onClick={() => navigate('/horarios')}>Cancelar</button>
        </div>
      ) : (
        <p>Cargando datos del horario...</p>
      )}
    </div>
  );
};

export default HorarioDeletePage;
